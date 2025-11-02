import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath, URL } from 'url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE_URL || '/',
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      ],
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  cleanupIDs: false,
                  removeDimensions: false,
                  removeViewBox: false,
                },
              },
            },
          ],
          titleProp: true,
        },
      }),
    ],
    css: {
      devSourcemap: true,
    },
  }
});
