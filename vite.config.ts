import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
      exclude: [],
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0', // אפשרות זו מאפשרת גישה מחוץ לקונטיינר
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
  }
});
