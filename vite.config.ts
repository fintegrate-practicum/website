import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
      exclude: [],
      emitWarning: true,
      emitError: false,
    }),
  ],
  server: {
    watch: {
      usePolling: true,
      useFsEvents: false,
    },
    host: '0.0.0.0',
    port: 5173,
    hmr: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
  }
});
