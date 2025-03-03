import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@src": path.resolve(__dirname, "src"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@store": path.resolve(__dirname, "src/store"),
      "@components": path.resolve(__dirname, "src/components"),
      "@icons": path.resolve(__dirname, "src/components/icons"),
    },
  },
});
