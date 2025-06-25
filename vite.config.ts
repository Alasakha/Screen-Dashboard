import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://192.168.1.197:10999', // 后端地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 去掉 '/api' 前缀
      }
    }
  },
})