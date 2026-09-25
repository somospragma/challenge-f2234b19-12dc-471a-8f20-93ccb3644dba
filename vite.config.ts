import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Configuración de Vite para el proyecto React con TypeScript
// Incluye soporte para JSX, alias de rutas y configuración de testing
// para integración con Vitest

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      babel: {
        presets: ['@babel/preset-typescript'],
        plugins: [['@babel/plugin-transform-typescript', { isTSX: true }]]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/**/*.test.tsx', 'src/setupTests.ts']
    }
  }
});