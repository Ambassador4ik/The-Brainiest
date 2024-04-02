import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/user/',
  server: {
    port: 5002,
  },
  preview: {
    port: 5002,
  },
})
