import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  
  resolve: {
    
    alias: {
      '/src/main.jsx': '/src/main.tsx', // Redirect old .jsx to new .tsx
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // Optional, agar CSS modules use kar rahe ho
    },
  },
});