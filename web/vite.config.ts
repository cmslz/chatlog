import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: '微信聊天记录管理',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/wechatlog': {
        target: 'http://127.0.0.1:5030',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wechatlog/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          semi: ['@douyinfe/semi-ui'],
          router: ['react-router-dom'],
          utils: ['axios', 'dayjs', 'qs'],
        },
      },
    },
  },
})