/* ========== [COMMENT / 注释区] BEGIN ==========
 * Schema 边界用例：每种标准 slide 至少 1 个合法 + 1 个超限。
 * dev-protocol/07 §4 + 08 §2.2。
 * MUST NOT 删除任何用例；MAY 追加。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 标准 schema 边界用例为保守。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import { describe, expect, it } from "vitest";
import {
  ClosingSlideSchema,
  CodeSlideSchema,
  ComparisonSlideSchema,
  ContentSlideSchema,
  DeckConfigSchema,
  ImageSlideSchema,
  QuoteSlideSchema,
  SectionSlideSchema,
  SlideDataSchema,
  TimelineSlideSchema,
  TitleSlideSchema,
} from "@/schema";

describe("DeckConfigSchema", () => {
  it("accepts a valid config", () => {
    const out = DeckConfigSchema.safeParse({
      title: "Demo",
      theme: "light",
      showPageNumber: true,
      showSpeakerNotesOverlay: false,
      aspectRatio: "16:9",
    });
    expect(out.success).toBe(true);
  });

  it("rejects unknown theme", () => {
    const out = DeckConfigSchema.safeParse({
      title: "Demo",
      theme: "neon",
      showPageNumber: true,
      showSpeakerNotesOverlay: false,
      aspectRatio: "16:9",
    });
    expect(out.success).toBe(false);
  });

  it("rejects unknown aspectRatio", () => {
    const out = DeckConfigSchema.safeParse({
      title: "Demo",
      theme: "light",
      showPageNumber: true,
      showSpeakerNotesOverlay: false,
      aspectRatio: "21:9",
    });
    expect(out.success).toBe(false);
  });
});

describe("TitleSlideSchema", () => {
  it("accepts minimum valid", () => {
    expect(TitleSlideSchema.safeParse({ type: "title", title: "Hi" }).success).toBe(true);
  });

  it("rejects empty title", () => {
    expect(TitleSlideSchema.safeParse({ type: "title", title: "" }).success).toBe(false);
  });

  it("rejects title > 60 chars", () => {
    expect(TitleSlideSchema.safeParse({ type: "title", title: "A".repeat(61) }).success).toBe(false);
  });
});

describe("SectionSlideSchema", () => {
  it("accepts minimal", () => {
    expect(SectionSlideSchema.safeParse({ type: "section", title: "X" }).success).toBe(true);
  });

  it("rejects description > 160", () => {
    expect(
      SectionSlideSchema.safeParse({
        type: "section",
        title: "X",
        description: "d".repeat(161),
      }).success,
    ).toBe(false);
  });
});

describe("ContentSlideSchema", () => {
  it("accepts 1..6 bullets", () => {
    expect(
      ContentSlideSchema.safeParse({ type: "content", title: "T", bullets: ["a"] }).success,
    ).toBe(true);
    expect(
      ContentSlideSchema.safeParse({
        type: "content",
        title: "T",
        bullets: ["a", "b", "c", "d", "e", "f"],
      }).success,
    ).toBe(true);
  });

  it("rejects > 6 bullets", () => {
    expect(
      ContentSlideSchema.safeParse({
        type: "content",
        title: "T",
        bullets: ["a", "b", "c", "d", "e", "f", "g"],
      }).success,
    ).toBe(false);
  });

  it("rejects bullet > 60 chars", () => {
    expect(
      ContentSlideSchema.safeParse({
        type: "content",
        title: "T",
        bullets: ["x".repeat(61)],
      }).success,
    ).toBe(false);
  });

  it("rejects empty bullets array", () => {
    expect(
      ContentSlideSchema.safeParse({ type: "content", title: "T", bullets: [] }).success,
    ).toBe(false);
  });
});

describe("ImageSlideSchema", () => {
  it("requires alt", () => {
    expect(
      ImageSlideSchema.safeParse({
        type: "image",
        title: "T",
        imageSrc: "/x.png",
      }).success,
    ).toBe(false);
  });

  it("accepts full payload", () => {
    expect(
      ImageSlideSchema.safeParse({
        type: "image",
        title: "T",
        imageSrc: "/x.png",
        alt: "alt text",
        caption: "cap",
        aspect: "16:9",
      }).success,
    ).toBe(true);
  });
});

describe("QuoteSlideSchema", () => {
  it("rejects quote > 280", () => {
    expect(QuoteSlideSchema.safeParse({ type: "quote", quote: "q".repeat(281) }).success).toBe(false);
  });
});

describe("CodeSlideSchema", () => {
  it("accepts <= 14 lines and <= 80 width", () => {
    const code = Array.from({ length: 14 }, (_, i) => `// line ${i + 1}`).join("\n");
    expect(CodeSlideSchema.safeParse({ type: "code", language: "ts", code }).success).toBe(true);
  });

  it("rejects > 14 lines", () => {
    const code = Array.from({ length: 15 }, () => "x").join("\n");
    expect(CodeSlideSchema.safeParse({ type: "code", language: "ts", code }).success).toBe(false);
  });

  it("rejects line > 80 chars", () => {
    expect(
      CodeSlideSchema.safeParse({ type: "code", language: "ts", code: "x".repeat(81) }).success,
    ).toBe(false);
  });

  it("highlightLines out-of-range rejected by assertDeck (not by per-slide schema)", () => {
    // 跨字段约束移到 assertDeck（dev-protocol/07 §3.4）。
    // 单 schema 仍接受形式合法的 highlightLines。
    const ok = CodeSlideSchema.safeParse({
      type: "code",
      language: "ts",
      code: "a\nb\nc",
      highlightLines: [5],
    });
    expect(ok.success).toBe(true);
  });
});

import { assertDeck } from "@/utils/assertDeck";

describe("assertDeck cross-field constraints", () => {
  it("rejects code highlightLines out of range", () => {
    expect(() =>
      assertDeck({
        deckConfig: {
          title: "Demo",
          theme: "light",
          showPageNumber: true,
          showSpeakerNotesOverlay: false,
          aspectRatio: "16:9",
        },
        slides: [
          {
            type: "code",
            id: "code-bad",
            language: "ts",
            code: "a\nb\nc",
            highlightLines: [5],
          },
        ],
      }),
    ).toThrow(/out of range/);
  });

  it("rejects duplicate slide ids", () => {
    expect(() =>
      assertDeck({
        deckConfig: {
          title: "Demo",
          theme: "light",
          showPageNumber: true,
          showSpeakerNotesOverlay: false,
          aspectRatio: "16:9",
        },
        slides: [
          { type: "title", id: "x", title: "A" },
          { type: "section", id: "x", title: "B" },
        ],
      }),
    ).toThrow(/duplicate slide id/);
  });

  it("rejects empty slides array", () => {
    expect(() =>
      assertDeck({
        deckConfig: {
          title: "Demo",
          theme: "light",
          showPageNumber: true,
          showSpeakerNotesOverlay: false,
          aspectRatio: "16:9",
        },
        slides: [],
      }),
    ).toThrow(/at least 1 entry/);
  });
});

describe("ComparisonSlideSchema", () => {
  it("rejects < 2 columns", () => {
    expect(
      ComparisonSlideSchema.safeParse({
        type: "comparison",
        title: "T",
        columns: [{ header: "A", bullets: ["x"] }],
      }).success,
    ).toBe(false);
  });

  it("rejects > 3 columns", () => {
    expect(
      ComparisonSlideSchema.safeParse({
        type: "comparison",
        title: "T",
        columns: Array.from({ length: 4 }, (_, i) => ({ header: `H${i}`, bullets: ["x"] })),
      }).success,
    ).toBe(false);
  });

  it("rejects column with > 5 bullets", () => {
    expect(
      ComparisonSlideSchema.safeParse({
        type: "comparison",
        title: "T",
        columns: [
          { header: "A", bullets: ["1", "2", "3", "4", "5", "6"] },
          { header: "B", bullets: ["x"] },
        ],
      }).success,
    ).toBe(false);
  });
});

describe("TimelineSlideSchema", () => {
  it("rejects < 2 steps", () => {
    expect(
      TimelineSlideSchema.safeParse({
        type: "timeline",
        title: "T",
        steps: [{ label: "one" }],
      }).success,
    ).toBe(false);
  });

  it("rejects > 6 steps", () => {
    expect(
      TimelineSlideSchema.safeParse({
        type: "timeline",
        title: "T",
        steps: Array.from({ length: 7 }, (_, i) => ({ label: `s${i}` })),
      }).success,
    ).toBe(false);
  });
});

describe("ClosingSlideSchema", () => {
  it("rejects > 4 contacts", () => {
    expect(
      ClosingSlideSchema.safeParse({
        type: "closing",
        headline: "End",
        contacts: Array.from({ length: 5 }, (_, i) => ({ label: `L${i}`, value: `v${i}` })),
      }).success,
    ).toBe(false);
  });
});

describe("SlideDataSchema (discriminated union)", () => {
  it("rejects unknown type", () => {
    expect(SlideDataSchema.safeParse({ type: "unknown", title: "T" }).success).toBe(false);
  });

  it("rejects missing type", () => {
    expect(SlideDataSchema.safeParse({ title: "T" }).success).toBe(false);
  });

  it("rejects kebab-case violation in id", () => {
    expect(
      SlideDataSchema.safeParse({ type: "title", id: "Bad ID!", title: "X" }).success,
    ).toBe(false);
  });
});
