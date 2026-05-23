/* ========== [COMMENT / 注释区] BEGIN ==========
 * Custom slide 编译期注册表。
 * 每个 custom slide MUST 在此显式注册：componentKey → { component, propsSchema, reqRefHint }。
 * assertDeck 校验阶段查表；运行期 CustomSlideHost 渲染。
 * MUST NOT 使用 import(string) 等任意动态求值。
 * dev-protocol/04 §5 + 05 §3。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 注册表类型、结构为保守。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { ComponentType } from "react";
import type { ZodTypeAny } from "zod";
import { BuildArenaShowcase } from "./BuildArenaShowcase/BuildArenaShowcase";
import { BuildArenaShowcasePropsSchema } from "./BuildArenaShowcase/BuildArenaShowcase.schema";

export type CustomSlidePropsSchema = ZodTypeAny;

export interface CustomSlideRegistryEntry {
  component: ComponentType<{ props: unknown }>;
  propsSchema: CustomSlidePropsSchema;
  reqRefHint: string;
}

/* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §13 三区豁免登记表] ==========
 * 在此注册本项目的 custom slide 实现。每一项 MUST：
 *   1) 在 PROJECT-BRIEF §13 登记并取 reqRef 锚点；
 *   2) 在 slides/_custom/<componentKey>/ 下实现组件与 propsSchema；
 *   3) 视觉回归覆盖。
 *
 * 示例：
 *   import { ExampleCustomSlide, ExampleCustomPropsSchema } from "./ExampleCustomSlide/ExampleCustomSlide";
 *   "example-custom": {
 *     component: ExampleCustomSlide,
 *     propsSchema: ExampleCustomPropsSchema,
 *     reqRefHint: "§13.exemption-1",
 *   },
 * ========== [VARIABLE / 可变区] END ========== */

export const customSlideRegistry: Record<string, CustomSlideRegistryEntry> = {
  "buildarena-showcase": {
    component: BuildArenaShowcase,
    propsSchema: BuildArenaShowcasePropsSchema,
    reqRefHint: "§13.exemption-1",
  },
};
