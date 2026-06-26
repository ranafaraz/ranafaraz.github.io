import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// MPA: each sub-page gets its own HTML entry so GitHub Pages serves it with
// HTTP 200 — bots and the Google Play Console policy checker don't execute JS,
// so the sessionStorage SPA-redirect trick doesn't work for them.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main:             resolve(__dirname, 'index.html'),
        'privacy-policy': resolve(__dirname, 'privacy-policy/index.html'),
        terms:            resolve(__dirname, 'terms/index.html'),
        uses:             resolve(__dirname, 'uses/index.html'),
        now:              resolve(__dirname, 'now/index.html'),
      },
      output: {
        // Split the heavy 3D libs into their own chunk so the rest of the
        // app (and first paint) stays small and lazy-loads the WebGL scenes.
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion', 'gsap'],
        },
      },
    },
  },
});
