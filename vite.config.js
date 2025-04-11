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
      // eslint-disable-next-line no-undef
      key:  process.env.NODE_ENV === 'development' ? fs.readFileSync('C:/certs/localhost/dev.local+4-key.pem') : '',
      // eslint-disable-next-line no-undef
      cert:  process.env.NODE_ENV === 'development'  ? fs.readFileSync('C:/certs/localhost/dev.local+4.pem') : '',
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
