import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@nodes': path.resolve(__dirname, './src/components/nodes'),
      '@rd6': path.resolve(__dirname, './src/components/nodes/BehringerRd6'),
      '@rd6/core': path.resolve(__dirname, './src/components/nodes/BehringerRd6/core'),
      '@rd6/components': path.resolve(__dirname, './src/components/nodes/BehringerRd6/components'),
      '@rd6/styles': path.resolve(__dirname, './src/components/nodes/BehringerRd6/styles'),
      '@rd6/patterns': path.resolve(__dirname, './src/components/nodes/BehringerRd6/core/patterns'),
      '@rd6/common': path.resolve(__dirname, './src/components/nodes/BehringerRd6/components/common'),
      '@rd6/frames': path.resolve(__dirname, './src/components/nodes/BehringerRd6/components/frames'),
      '@rd6/sequencer': path.resolve(__dirname, './src/components/nodes/BehringerRd6/components/sequencer')
    }
  }
})
