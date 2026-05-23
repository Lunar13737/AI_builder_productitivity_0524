/* ========== [COMMENT / 注释区] BEGIN ==========
 * Deck 级配置。校验 schema 在 src/schema/slideSchema.ts DeckConfigSchema。
 * dev-protocol/04 §6。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §0 元信息, §3 视觉, §6 画幅] ==========
 * 改这一对象前 MUST 在 PROJECT-BRIEF.md 对应章节确认。
 * ========== [VARIABLE / 可变区] END ========== */

export const deckConfig = {
  title: "BuildArena Commercial Share",
  theme: "light",
  showPageNumber: true,
  showSpeakerNotesOverlay: false,
  aspectRatio: "16:9",
} as const;
