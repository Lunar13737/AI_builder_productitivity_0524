/* ========== [COMMENT / 注释区] BEGIN ==========
 * 推导 slide 稳定 id：显式 id 优先；缺省时按位置生成 `slide-<index+1>`。
 * 视觉回归基准命名与 hash 路由都依赖这里。
 * ========== [COMMENT / 注释区] END ========== */

import type { SlideData } from "@/schema";

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 修改 MUST 走 dev-protocol/04 §2 元字段 + dev-protocol/08 §3.3 基准命名联动评审。
 * ========== [CONSERVATIVE / 保守区] END ========== */

export function resolveSlideId(slide: SlideData, index: number): string {
  if ("id" in slide && typeof slide.id === "string" && slide.id.length > 0) {
    return slide.id;
  }
  return `slide-${index + 1}`;
}

export function resolveAllSlideIds(slides: ReadonlyArray<SlideData>): string[] {
  return slides.map((slide, index) => resolveSlideId(slide, index));
}
