/* ========== [COMMENT / 注释区] BEGIN ==========
 * 本 deck 自有断言。可变区，按项目实际需求扩展。
 * dev-protocol/08 §2.2。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §10 验收标准, §11 类型分布] ========== */

import { describe, expect, it } from "vitest";
import { assertDeck } from "@/utils/assertDeck";
import { deckConfig as rawDeckConfig } from "@/deck/deck.config";
import { slides as rawSlides } from "@/deck/slides";

describe("deck integrity (BuildArena commercial share)", () => {
  const { deckConfig, slides } = assertDeck({
    deckConfig: rawDeckConfig,
    slides: rawSlides,
  });

  it("passes assertDeck", () => {
    expect(deckConfig.title.length).toBeGreaterThan(0);
    expect(slides.length).toBeGreaterThan(0);
  });

  it("contains the confirmed 12-page outline", () => {
    expect(slides).toHaveLength(12);
  });

  it("uses the registered BuildArena custom renderer", () => {
    expect(slides.every((slide) => slide.type === "custom")).toBe(true);
    expect(
      slides.every(
        (slide) => slide.type === "custom" && slide.componentKey === "buildarena-showcase",
      ),
    ).toBe(true);
  });

  it("keeps cover and closing stable", () => {
    expect(slides[0]?.id).toBe("cover");
    expect(slides[slides.length - 1]?.id).toBe("closing");
  });

  it("all slide ids (if provided) are unique", () => {
    const ids = slides
      .map((s) => ("id" in s ? s.id : undefined))
      .filter((x): x is string => typeof x === "string");
    expect(new Set(ids).size).toBe(ids.length);
  });
});

/* ========== [VARIABLE / 可变区] END ========== */
