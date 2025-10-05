import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './web/src'),
    },
  },
  root: './web',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        '../../../src/index',
        '../../../src/index.js',
      ],
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['../../../src/index'],
  },
})
