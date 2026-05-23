/* ========== [COMMENT / 注释区] BEGIN ==========
 * 可选导出工具：抽取 speaker notes 到单个 Markdown 字符串。
 * 由 dev-protocol/09 §5.2 规定。本工具仅在编译期 / 测试期使用，
 * MUST NOT 在浏览器 bundle 中调用。
 * ========== [COMMENT / 注释区] END ========== */

import type { SlideData } from "@/schema";
import { resolveSlideId } from "./slideId";

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 输出格式为保守。修改 MUST 走 dev-protocol/09 修订。
 * ========== [CONSERVATIVE / 保守区] END ========== */

export function exportSpeakerNotes(slides: ReadonlyArray<SlideData>, deckTitle: string): string {
  const lines: string[] = [`# ${deckTitle} — Speaker Notes`, ""];
  slides.forEach((slide, index) => {
    const id = resolveSlideId(slide, index);
    lines.push(`## #${index + 1} · ${id} · ${slide.type}`, "");
    const notes =
      "speakerNotes" in slide && typeof slide.speakerNotes === "string" ? slide.speakerNotes : "";
    lines.push(notes.length > 0 ? notes : "_(no notes)_", "");
  });
  return lines.join("\n");
}
