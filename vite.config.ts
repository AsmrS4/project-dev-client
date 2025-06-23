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
      {find:'@api', replacement: '/src/api/'},
      {find:'@app', replacement: '/src/app/'},
      {find:'@styles', replacement: '/src/styles/'},
      {find:'@components', replacement:'/src/components/'},
      {find:'@hooks', replacement:'/src/hooks/'},
      {find:'@store', replacement:'/src/store/'},
      {find:'@utils', replacement:'/src/utils/'},
      {find:'@pages', replacement:'/src/pages/'}
    ]
  },
  define: {
    VITE_API_URL: JSON.stringify(`http://localhost:8090/api`)
  },
})
