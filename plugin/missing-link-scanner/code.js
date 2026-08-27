// Missing Link Scanner — code.js (ES5 + optimized + page selection)

/*
  Features
  - Scan a single selected page OR all pages.
  - Detect missing components (instances whose mainComponent is null).
  - Detect missing styles (fill, stroke, effect, grid, text).
  Performance
  - Iterative DFS (no recursion).
  - Cache style lookups (figma.getStyleById) per styleId.
  - For TEXT nodes, only call getStyledTextSegments when textStyleId === figma.mixed.
  Compatibility
  - No optional chaining, no spread, no arrow functions.
*/

function nodeBelongsToPage(node) {
  var p = node;
  while (p && p.type !== "PAGE") p = p.parent;
  return p;
}

// Cache: styleId -> isMissing (true/false)
var styleMissingCache = new Map();

function normalizeStyleId(id) {
  if (id === null || id === undefined) return "";
  if (id === figma.mixed) return "";
  if (typeof id !== "string") return "";
  if (!id) return "";
  return id;
}

function isStyleMissingCached(rawId) {
  var styleId = normalizeStyleId(rawId);
  if (!styleId) return false;
  if (styleMissingCache.has(styleId)) {
    return styleMissingCache.get(styleId);
  }
  var st = figma.getStyleById(styleId);
  var missing = (st == null);
  styleMissingCache.set(styleId, missing);
  return missing;
}

function addIssue(reportMap, node, issue) {
  var entry = reportMap.get(node.id);
  if (!entry) {
    var pageNode = nodeBelongsToPage(node);
    entry = {
      id: node.id,
      name: node.name || "(unnamed)",
      type: node.type,
      pageId:
        (pageNode && pageNode.id) ||
        (figma.currentPage && figma.currentPage.id) ||
        "",
      pageName:
        (pageNode && pageNode.name) ||
        (figma.currentPage && figma.currentPage.name) ||
        "",
      issues: []
    };
    reportMap.set(node.id, entry);
  }
  entry.issues.push(issue);
}

function scanPage(page) {
  var reportMap = new Map();
  var stack = [];

  // start from page children (we don't check the page itself)
  for (var i = page.children.length - 1; i >= 0; i--) {
    stack.push(page.children[i]);
  }

  while (stack.length) {
    var node = stack.pop();

    // 1. Missing components (broken instances)
    if (node.type === "INSTANCE" && node.mainComponent == null) {
      addIssue(reportMap, node, { kind: "Missing component" });
    }

    // 2. Geometry / effect / grid styles
    var fillId = normalizeStyleId(node.fillStyleId);
    if (fillId && isStyleMissingCached(fillId)) {
      addIssue(reportMap, node, {
        kind: "Missing style",
        styleType: "fill",
        styleId: fillId
      });
    }

    var strokeId = normalizeStyleId(node.strokeStyleId);
    if (strokeId && isStyleMissingCached(strokeId)) {
      addIssue(reportMap, node, {
        kind: "Missing style",
        styleType: "stroke",
        styleId: strokeId
      });
    }

    var effectId = normalizeStyleId(node.effectStyleId);
    if (effectId && isStyleMissingCached(effectId)) {
      addIssue(reportMap, node, {
        kind: "Missing style",
        styleType: "effect",
        styleId: effectId
      });
    }

    var gridId = normalizeStyleId(node.gridStyleId);
    if (gridId && isStyleMissingCached(gridId)) {
      addIssue(reportMap, node, {
        kind: "Missing style",
        styleType: "grid",
        styleId: gridId
      });
    }

    // 3. Text styles (fast path: uniform text style)
    if (node.type === "TEXT") {
      var tsid = node.textStyleId;

      if (tsid !== figma.mixed) {
        var tsidNorm = normalizeStyleId(tsid);
        if (tsidNorm && isStyleMissingCached(tsidNorm)) {
          addIssue(reportMap, node, {
            kind: "Missing style",
            styleType: "text",
            styleId: tsidNorm
          });
        }
      } else {
        // Mixed styles: only now call getStyledTextSegments
        try {
          var segments = node.getStyledTextSegments(["textStyleId"]);
          var seen = {};
          for (var s = 0; s < segments.length; s++) {
            var segId = normalizeStyleId(segments[s].textStyleId);
            if (segId && !seen[segId]) {
              seen[segId] = true;
              if (isStyleMissingCached(segId)) {
                addIssue(reportMap, node, {
                  kind: "Missing style",
                  styleType: "text",
                  styleId: segId
                });
              }
            }
          }
        } catch (e) {
          // Very defensive fallback
          var fallbackId = normalizeStyleId(node.textStyleId);
          if (fallbackId && isStyleMissingCached(fallbackId)) {
            addIssue(reportMap, node, {
              kind: "Missing style",
              styleType: "text",
              styleId: fallbackId
            });
          }
        }
      }
    }

    // 4. Traverse children
    if ("children" in node && node.children && node.children.length) {
      for (var c = node.children.length - 1; c >= 0; c--) {
        stack.push(node.children[c]);
      }
    }
  }

  // Convert map -> array
  var out = [];
  reportMap.forEach(function (value) {
    out.push(value);
  });
  return out;
}

function scan(payload) {
  styleMissingCache = new Map(); // reset cache for each scan

  var pageId = payload && payload.pageId;
  var pages = [];

  if (pageId === "ALL") {
    // all pages
    var rootChildren = figma.root.children;
    for (var i = 0; i < rootChildren.length; i++) {
      pages.push(rootChildren[i]);
    }
  } else {
    var p = figma.getNodeById(pageId);
    if (p && p.type === "PAGE") {
      pages.push(p);
    }
  }

  var all = [];
  for (var j = 0; j < pages.length; j++) {
    var list = scanPage(pages[j]);
    for (var k = 0; k < list.length; k++) {
      all.push(list[k]);
    }
  }
  return all;
}

function sendPagesList() {
  var pages = [];
  var children = figma.root.children;
  for (var i = 0; i < children.length; i++) {
    pages.push({ id: children[i].id, name: children[i].name });
  }
  figma.ui.postMessage({ type: "pages", pages: pages });
}

// --- Plugin bootstrap --- //
figma.showUI(__html__, { width: 560, height: 520 });
sendPagesList();

figma.ui.onmessage = function (msg) {
  if (!msg || !msg.type) return;

  if (msg.type === "scan") {
    var t0 = Date.now();
    var results = scan({ pageId: msg.pageId });
    var dt = Date.now() - t0;
    figma.ui.postMessage({
      type: "results",
      results: results,
      ms: dt
    });
  }

  if (msg.type === "navigate") {
    var node = figma.getNodeById(msg.nodeId);
    if (node) {
      var page = nodeBelongsToPage(node);
      if (page && page.type === "PAGE") {
        figma.currentPage = page;
      }
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
      figma.notify("Jumped to: " + (node.name || "(unnamed)"));
    } else {
      figma.notify("Could not find that node. It may have been deleted.");
    }
  }

  if (msg.type === "request-pages") {
    sendPagesList();
  }
};

// Relaunch button support (no-op; UI already shown)
if (figma.command === "scan") {}