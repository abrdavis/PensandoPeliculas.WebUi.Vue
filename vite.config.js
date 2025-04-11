import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'dev.local',
    port: 8080,
    https: {
      key: fs.readFileSync('C:/certs/localhost/dev.local+4-key.pem'),
      cert: fs.readFileSync('C:/certs/localhost/dev.local+4.pem'),
    }
  },
  plugins: [
    vue(),
  ],
  // base: '/peliculas/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
