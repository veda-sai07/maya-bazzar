import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The dev server proxies /api calls to the Spring Boot backend on port 8080,
// so the frontend never has to worry about CORS during development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
