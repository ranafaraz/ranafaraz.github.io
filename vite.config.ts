import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (ranafaraz.github.io) is served from the domain root, so base = '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
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
