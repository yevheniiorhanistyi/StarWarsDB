import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["types/*.ts", ".next/*", "next.config.js"],
    },
  },
  build: {
    sourcemap: true,
  },
});
