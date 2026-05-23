/* ========== [COMMENT / 注释区] BEGIN ==========
 * 本文件由 dev-protocol/02 §3 (scripts: dev/build/preview) 与
 * dev-protocol/09 §3.1 (base 路径) 共同规定。
 * ========== [COMMENT / 注释区] END ========== */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * plugins、resolve.alias、build.outDir 与默认 root 为保守。
 * 修改 MUST 走 dev-protocol/02 修订流程。
 * ========== [CONSERVATIVE / 保守区] END ========== */

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    target: "es2022",
  },

  /* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §9.4 hosting base] ==========
   * 托管路径前缀。
   * 部署到 GitHub Pages: https://lunar13737.github.io/AI_builder_productitivity_0524/
   * ========== [VARIABLE / 可变区] END ========== */
  base: "/AI_builder_productitivity_0524/",

  /* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §9.4 dev server] ========== */
  server: {
    port: 5173,
    strictPort: false,
  },
  preview: {
    port: 4173,
    strictPort: false,
  },
  /* ========== [VARIABLE / 可变区] END ========== */
});
