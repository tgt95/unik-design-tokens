# Changes

## 19 June, 2026

1. Experiment with Radix color but it didn't work
2. Neutral color shade, mixing between Neutral and Slate

    ``` json
    {
        "neutral": {
            "50": {
                "$type": "color",
                "$value": "#f8fafc"
            },
            "100": {
                "$type": "color",
                "$value": "#f1f5f9"
            },
            "200": {
                "$type": "color",
                "$value": "#e3e7ee"
            },
            "300": {
                "$type": "color",
                "$value": "#ced5dd"
            },
            "400": {
                "$type": "color",
                "$value": "#9aa3b0"
            },
            "500": {
                "$type": "color",
                "$value": "#6c747f"
            },
            "600": {
                "$type": "color",
                "$value": "#4e535b"
            },
            "700": {
                "$type": "color",
                "$value": "#3c4046"
            },
            "800": {
                "$type": "color",
                "$value": "#25272a"
            },
            "900": {
                "$type": "color",
                "$value": "#161719"
            },
            "950": {
                "$type": "color",
                "$value": "#0a0a0a"
            }
        }
    }
    ```

3. Update the `shade 950` of all accent colors, excludes these colors `slate, gray, zinc, neutral, stone, taupe, mauve, mist, olive`
4. Update token `bg.selected`
