import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/image": path.resolve(__dirname, "./src/shims/next-image.tsx"),
      "next/link": path.resolve(__dirname, "./src/shims/next-link.tsx"),
      "next/script": path.resolve(__dirname, "./src/shims/next-script.tsx"),
      "next/form": path.resolve(__dirname, "./src/shims/next-form.tsx"),
      "next/navigation": path.resolve(__dirname, "./src/shims/next-navigation.ts"),
      "next/dynamic": path.resolve(__dirname, "./src/shims/next-dynamic.ts"),
      "next/font/google": path.resolve(__dirname, "./src/shims/next-font-google.ts"),
    },
  },
  server: {
    proxy: {
      "/api/copilotkit": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
      "/realtime/session": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
