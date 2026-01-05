import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  clearScreen: false,
  server: {
    proxy: {
      '/api/mock': {
        target: 'https://postman-echo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mock/, '')
      }
    }
  }
})
