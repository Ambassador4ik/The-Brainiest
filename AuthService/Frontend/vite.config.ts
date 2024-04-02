import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/auth/',
  server: {
    port: Number(process.env.DEV_PORT ?? 5000),
  },
  preview: {
    port: Number(process.env.PROD_PORT ?? 8000),
  },
})
