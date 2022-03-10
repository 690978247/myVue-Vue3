import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    resolve: {
    alias: {
        "@": path.resolve(__dirname, 'src')
      }
    },
    plugins: [vue()],
    server: {
      port: 8088,
      proxy: {
        '/api': {
          target: /* process.env.VITE_BASE_API */ 'http://192.168.3.97:8080/',
          changeOrigin: true,
          rewrite:(path) => path.replace(/^\/api/, '')
        },
      }
    }
  }
})