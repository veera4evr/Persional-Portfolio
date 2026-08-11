import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller output
    target: 'es2020',
    // Warn if a chunk exceeds 800kb
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
            return 'vendor-gsap';
          }
          if (id.includes('node_modules/@studio-freight/lenis')) {
            return 'vendor-lenis';
          }
        },
        // Organize output files cleanly
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
    // Enable source maps for production debugging (optional, remove for max perf)
    sourcemap: false,
    // Minify with oxc (default for vite 8)
    minify: 'oxc',
  },
  // Optimize deps for faster dev starts
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', '@studio-freight/lenis'],
  },
})
