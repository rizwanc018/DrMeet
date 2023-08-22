import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      exclude: ['fs'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  // define: {
  //   "global": {}
  // },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:5000"
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})

