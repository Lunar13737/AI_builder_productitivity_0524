/* ========== [COMMENT / 注释区] BEGIN ==========
 * Custom slide 模板。复制此文件到 <ComponentKey>/<ComponentKey>.tsx 后修改。
 * MUST 同时创建配套 .module.css / .schema.ts / .test.tsx。
 * MUST 在 PROJECT-BRIEF §13 登记理由。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §13.exemption-?] ==========
 * 本组件为项目专属逃生口实现。
 * MUST 通过同目录 .schema.ts 中的 Zod schema 校验 props（由 assertDeck 自动调用）。
 * ========== [VARIABLE / 可变区] END ========== */

import { z } from "zod";
import type { ZodTypeAny } from "zod";

// 1) 在此定义 props schema（同时导出，注入 registry）
export const ExampleCustomPropsSchema: ZodTypeAny = z.object({
  headline: z.string().min(1).max(80),
});

type ExampleCustomProps = z.infer<typeof ExampleCustomPropsSchema>;

// 2) 组件实现（props 是 unknown，因为 assertDeck 已校验，这里仅做类型断言）
export function ExampleCustomSlide({ props }: { props: unknown }) {
  const data = props as ExampleCustomProps;
  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--slide-pad-y) var(--slide-pad-x)",
        color: "var(--color-text)",
      }}
    >
      <h1
        style={{
          fontSize: "var(--font-size-title)",
          fontWeight: "var(--font-weight-bold)",
          margin: 0,
        }}
      >
        {data.headline}
      </h1>
    </section>
  );
}
