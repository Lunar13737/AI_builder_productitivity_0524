/* ========== [COMMENT / 注释区] BEGIN ==========
 * 本文件由 dev-protocol/08 §3.2 规定。
 * 视觉回归基准 MUST 在固定 viewport / colorScheme / reducedMotion 下生成。
 * 跨平台像素差注意事项见 dev-protocol/08 §3.5。
 * ========== [COMMENT / 注释区] END ========== */

import { defineConfig, devices } from "@playwright/test";

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * use.viewport / use.deviceScaleFactor / use.reducedMotion / expect.maxDiffPixelRatio
 * 为保守。修改 MUST 走 dev-protocol/08 修订。
 * ========== [CONSERVATIVE / 保守区] END ========== */

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "html",

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.001,
      animations: "disabled",
      caret: "hide",
      scale: "device",
    },
  },

  use: {
    baseURL: "http://localhost:4173",
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    trace: "retain-on-failure",
    contextOptions: {
      reducedMotion: "reduce",
    },
  },

  webServer: {
    command: "pnpm preview --port 4173",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  /* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §3.2 theme, §9.7 visual baseline platform] ==========
   * 默认仅跑 light Chromium。
   * 若启用暗色主题，MUST 在此添加 dark project；
   * 若需多浏览器矩阵，按需扩展 projects 数组。
   * ========== [VARIABLE / 可变区] END ========== */
  projects: [
    {
      name: "chromium-light",
      use: { ...devices["Desktop Chrome"], colorScheme: "light" },
    },
  ],
});
