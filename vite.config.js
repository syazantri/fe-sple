import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    root: "src",
    base: "/",
    plugins: [react(), svgr()],
    publicDir: path.resolve(__dirname, "public"),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: env.VITE_PORT ?? 3000,
      proxy: {
        "/api/": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\//, ""),
        },
        "/static/": {
          target: env.VITE_STATIC_SERVER_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/static\//, ""),
        },
      },
    },
    envDir: process.cwd(),
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
    preview: {
      port: env.VITE_PORT ?? 3000,
    },
  };
});
