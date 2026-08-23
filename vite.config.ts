import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 👇 重要：改成你的仓库名
  base: '/ai-finance-assistant/',
  server: {
    port: 3000,
    open: true
  }
})
