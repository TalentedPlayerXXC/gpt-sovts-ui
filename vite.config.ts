import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: '0.0.0.0', // 允许外部访问
    port: 3000,      // 自定义端口
    proxy: {
      // '/api': {      // 代理路径前缀
      //   target: 'http://127.0.0.1:9880', // 后端接口地址
      //   changeOrigin: true,              // 修改请求源为后端地址
      //   rewrite: (path) => path.replace(/^\/api/, '') // 路径重写（可选）
      // },
      '/api': {      // 代理路径前缀
        target: 'http://192.168.50.251:9880', // 后端接口地址
        changeOrigin: true,              // 修改请求源为后端地址
        rewrite: (path) => path.replace(/^\/api/, '') // 路径重写（可选）
      },
      // '/v2': {      // 代理路径前缀
      //   target: 'http://192.168.50.251:8081', // 后端接口地址
      //   changeOrigin: true,              // 修改请求源为后端地址
      //   rewrite: (path) => path.replace(/^\/v2/, '') // 路径重写（可选）
      // },
      '/file': {      // 代理路径前缀
        target: 'http://192.168.50.251:3001', // 后端接口地址
        changeOrigin: true,              // 修改请求源为后端地址
        rewrite: (path) => path.replace(/^\/file/, '') // 路径重写（可选）
      },
      // '/file': {      // 代理路径前缀
      //   target: 'http://127.0.0.1:3001', // 后端接口地址
      //   changeOrigin: true,              // 修改请求源为后端地址
      //   rewrite: (path) => path.replace(/^\/file/, '') // 路径重写（可选）
      // },
    }
  }
})
