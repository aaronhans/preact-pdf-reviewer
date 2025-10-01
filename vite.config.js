import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    preact(),
    viteSingleFile()
  ],
  // Set base path for subdirectory deployment
  // Change '/pdf-audit/' to match your subdirectory name
  base: process.env.NODE_ENV === 'production' ? '/pdf-audit/' : '/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
})