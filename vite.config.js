/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: "jsdom", // simulates a browser DOM in Node, since tests aren't run in a real browser
    setupFiles: "./src/setupTests.js",
  },
})
