/* ========== [COMMENT / 注释区] BEGIN ==========
 * Custom slide 渲染宿主：根据 componentKey 查表渲染。
 * props 已在 assertDeck 阶段校验过；此处再次确认存在以满足类型并防御性抛错。
 * dev-protocol/05 §3。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 整文件保守。修改 MUST 走 dev-protocol/05 修订。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { CustomSlideData } from "@/schema";
import { customSlideRegistry } from "./registry";

export function CustomSlideHost(slide: CustomSlideData) {
  const entry = customSlideRegistry[slide.componentKey];
  if (!entry) {
    throw new Error(
      `[CustomSlideHost] componentKey="${slide.componentKey}" not registered. ` +
        `Register it in src/components/slides/_custom/registry.ts.`,
    );
  }
  const Component = entry.component;
  return <Component props={slide.props} />;
}
