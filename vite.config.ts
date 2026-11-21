import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// GitHub Pages can be hosted on a subpath (e.g. /eden-birthday/) or root custom domain.
// Setting base to './' ensures asset relative resolution works seamlessly on any subpath or domain.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || './',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
