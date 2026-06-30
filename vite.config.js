import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Frontend source lives in /client. Build output goes to /dist, which the
// Express server (server/index.js) serves in production.
export default defineConfig({
  root: 'client',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    // In dev, proxy API calls to the Express server so the SPA and API share an origin.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
