/* ========== [COMMENT / 注释区] BEGIN ==========
 * type → 组件分发器。
 * dev-protocol/05 §1.3。
 * 新增 slide 类型 MUST 同时：1) 在 schema 中加；2) 在此加 case；3) 添加组件。
 * assertNever 兜底保证编译期穷尽性。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 整文件保守。修改 MUST 走 dev-protocol/04 + 05 联动修订。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { JSX } from "react";
import type { SlideData } from "@/schema";
import { TitleSlide } from "@/components/slides/TitleSlide/TitleSlide";
import { SectionSlide } from "@/components/slides/SectionSlide/SectionSlide";
import { ContentSlide } from "@/components/slides/ContentSlide/ContentSlide";
import { ImageSlide } from "@/components/slides/ImageSlide/ImageSlide";
import { QuoteSlide } from "@/components/slides/QuoteSlide/QuoteSlide";
import { CodeSlide } from "@/components/slides/CodeSlide/CodeSlide";
import { ComparisonSlide } from "@/components/slides/ComparisonSlide/ComparisonSlide";
import { TimelineSlide } from "@/components/slides/TimelineSlide/TimelineSlide";
import { ClosingSlide } from "@/components/slides/ClosingSlide/ClosingSlide";
import { CustomSlideHost } from "@/components/slides/_custom/CustomSlideHost";

function assertNever(x: never): never {
  throw new Error(`[renderSlide] unhandled slide variant: ${JSON.stringify(x)}`);
}

export function renderSlide(slide: SlideData): JSX.Element {
  switch (slide.type) {
    case "title":
      return <TitleSlide {...slide} />;
    case "section":
      return <SectionSlide {...slide} />;
    case "content":
      return <ContentSlide {...slide} />;
    case "image":
      return <ImageSlide {...slide} />;
    case "quote":
      return <QuoteSlide {...slide} />;
    case "code":
      return <CodeSlide {...slide} />;
    case "comparison":
      return <ComparisonSlide {...slide} />;
    case "timeline":
      return <TimelineSlide {...slide} />;
    case "closing":
      return <ClosingSlide {...slide} />;
    case "custom":
      return <CustomSlideHost {...slide} />;
  }
  return assertNever(slide);
}
