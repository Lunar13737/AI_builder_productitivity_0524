/* ========== [COMMENT / 注释区] BEGIN ==========
 * 视觉回归：遍历每页 toHaveScreenshot。
 * dev-protocol/08 §3.3。
 * baseURL / viewport / reducedMotion 由 playwright.config.ts 提供。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 遍历逻辑为保守。slide id 列表自动从 slides.ts 推导，无需手维护。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import { test, expect } from "@playwright/test";
import { slides as rawSlides } from "../src/deck/slides";
import { resolveAllSlideIds } from "../src/utils/slideId";
import { SlideDataSchema } from "../src/schema";

const slideIds = resolveAllSlideIds(
  rawSlides.map((s, i) => {
    const parsed = SlideDataSchema.safeParse(s);
    if (!parsed.success) {
      throw new Error(`[e2e/visual] slide #${i} invalid: ${parsed.error.message}`);
    }
    return parsed.data;
  }),
);

for (const id of slideIds) {
  test(`slide ${id} matches visual baseline`, async ({ page }) => {
    await page.addInitScript(() => {
      const originalMatchMedia = window.matchMedia.bind(window);
      window.matchMedia = (query: string) => {
        if (query === "(prefers-reduced-motion: reduce)") {
          return {
            matches: true,
            media: query,
            onchange: null,
            addListener: () => undefined,
            removeListener: () => undefined,
            addEventListener: () => undefined,
            removeEventListener: () => undefined,
            dispatchEvent: () => true,
          } as MediaQueryList;
        }
        return originalMatchMedia(query);
      };
    });
    await page.goto(`/#/slide/${id}`);
    await page.waitForFunction(() => document.fonts.ready.then(() => true));
    await page.waitForSelector(`[data-slide-id="${id}"]`);
    await expect(page).toHaveScreenshot(`${id}.png`, { fullPage: false });
  });
}
