import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      enabled: true,
      all: true,
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      exclude: ['src/index.tsx', 'src/types/*.ts'],
    },
  },
  build: {
    sourcemap: true,
  },
});
