/* ========== [COMMENT / 注释区] BEGIN ==========
 * 三层校验链中「启动期 Zod」层；由 src/main.tsx 调用一次。
 * 校验失败 MUST 直接抛错；MUST NOT 静默过滤、剪裁或返回空。
 * 详见 dev-protocol/07 §3。
 * ========== [COMMENT / 注释区] END ========== */

import {
  DeckConfigSchema,
  SlideDataSchema,
  type DeckConfig,
  type SlideData,
} from "@/schema";
import {
  customSlideRegistry,
  type CustomSlidePropsSchema,
} from "@/components/slides/_custom/registry";

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 函数签名与抛错行为为保守。
 * MUST NOT 在此添加 try/catch 隐式回退。
 * ========== [CONSERVATIVE / 保守区] END ========== */

export interface AssertDeckInput {
  deckConfig: unknown;
  slides: ReadonlyArray<unknown>;
}

export interface AssertDeckOutput {
  deckConfig: DeckConfig;
  slides: SlideData[];
}

export function assertDeck(input: AssertDeckInput): AssertDeckOutput {
  const deckConfigResult = DeckConfigSchema.safeParse(input.deckConfig);
  if (!deckConfigResult.success) {
    throw new Error(
      `[assertDeck] deckConfig invalid: ${formatZodIssues(deckConfigResult.error.issues)}`,
    );
  }

  if (input.slides.length === 0) {
    throw new Error("[assertDeck] slides MUST contain at least 1 entry");
  }

  const slides: SlideData[] = input.slides.map((raw, index) => {
    const result = SlideDataSchema.safeParse(raw);
    if (!result.success) {
      const rawObj = raw as { id?: unknown; type?: unknown };
      const idLabel = typeof rawObj?.id === "string" ? rawObj.id : "<no id>";
      const typeLabel = typeof rawObj?.type === "string" ? rawObj.type : "<unknown type>";
      throw new Error(
        `[assertDeck] slide #${index} (id=${idLabel}, type=${typeLabel}) failed schema: ${formatZodIssues(
          result.error.issues,
        )}`,
      );
    }
    const slide = result.data;

    // 跨字段约束：code slide 的 highlightLines MUST 在 code 行数范围内（dev-protocol/07 §3.4）
    if (slide.type === "code" && slide.highlightLines) {
      const lineCount = slide.code.split("\n").length;
      const bad = slide.highlightLines.filter((n) => n < 1 || n > lineCount);
      if (bad.length > 0) {
        throw new Error(
          `[assertDeck] slide #${index} (id=${slide.id ?? "?"}) highlightLines ${JSON.stringify(
            bad,
          )} out of range (code has ${lineCount} lines).`,
        );
      }
    }

    // custom slide：再次校验 props
    if (slide.type === "custom") {
      const entry = customSlideRegistry[slide.componentKey];
      if (!entry) {
        throw new Error(
          `[assertDeck] custom slide #${index} (id=${slide.id}) references unknown componentKey="${slide.componentKey}". ` +
            `Register the component in src/components/slides/_custom/registry.ts.`,
        );
      }
      const propsResult = (entry.propsSchema as CustomSlidePropsSchema).safeParse(slide.props);
      if (!propsResult.success) {
        throw new Error(
          `[assertDeck] custom slide #${index} (id=${slide.id}, componentKey=${slide.componentKey}) props invalid: ${formatZodIssues(
            propsResult.error.issues,
          )}`,
        );
      }
    }

    return slide;
  });

  // 唯一性约束：所有显式 id MUST 唯一
  const seenIds = new Map<string, number>();
  slides.forEach((slide, index) => {
    if (!("id" in slide) || slide.id === undefined) return;
    const prev = seenIds.get(slide.id);
    if (prev !== undefined) {
      throw new Error(
        `[assertDeck] duplicate slide id="${slide.id}" at #${prev} and #${index}. ids MUST be unique.`,
      );
    }
    seenIds.set(slide.id, index);
  });

  return { deckConfig: deckConfigResult.data, slides };
}

function formatZodIssues(issues: ReadonlyArray<{ path: (string | number)[]; message: string }>): string {
  return issues
    .map((issue) => `${issue.path.length ? issue.path.join(".") : "<root>"} -> ${issue.message}`)
    .join("; ");
}
