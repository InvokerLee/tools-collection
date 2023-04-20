import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'lib')
    }
  },
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'Tracker',
      fileName: 'tracker',
      formats: ['es', 'es' ,'iife']
    }
  }
})
