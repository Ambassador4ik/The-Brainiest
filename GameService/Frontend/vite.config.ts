import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/game/',
  server: {
    port: 5003,
  },
  preview: {
    port: 5003,
  },
})
