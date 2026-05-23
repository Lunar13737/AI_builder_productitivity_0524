/* ========== [COMMENT / 注释区] BEGIN ==========
 * 本文件由 dev-protocol/08 §2 (Vitest 配置) 规定。
 * Vitest 复用 Vite 配置；只补充测试相关字段。
 * ========== [COMMENT / 注释区] END ========== */

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 测试环境与匹配规则为保守。修改 MUST 走 dev-protocol/08 修订。
 * ========== [CONSERVATIVE / 保守区] END ========== */

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: false,
      include: ["tests/**/*.{test,spec}.{ts,tsx}", "src/**/*.{test,spec}.{ts,tsx}"],
      exclude: ["e2e/**", "node_modules/**", "dist/**"],
      coverage: {
        provider: "v8",
        reportsDirectory: "coverage",
        reporter: ["text", "html"],
      },
    },
  }),
);
