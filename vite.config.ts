import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    host:'localhost',
    port: 5000,
    open: true
  },
  resolve: {
    alias: [
      {find:'@assets', replacement: '/src/assets/'},
      {find:'@app', replacement: '/src/app/'},
      {find:'@styles', replacement: '/src/styles/'},
      {find:'@components', replacement:'/src/components/'},
      {find:'@hooks', replacement:'/src/hooks/'},
      {find:'@utils', replacement:'/src/utils/'},
      {find:'@pages', replacement:'/src/pages/'}
    ]
  },
  define: {
    'process.env.API_URL': JSON.stringify(`http://localhost:8090/api`)
  },
})
