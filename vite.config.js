import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global `expect` and other utilities
    environment: 'jsdom', // Ensures a browser-like environment for tests
    setupFiles: './src/setupTests.js', // Points to your test setup file
    include: ['./src/tests/**/*.test.{js,jsx,ts,tsx}'], // Test file patterns
  },
});
