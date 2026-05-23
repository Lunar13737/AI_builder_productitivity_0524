/* ========== [COMMENT / 注释区] BEGIN ==========
 * 单页容器：统一画幅、缩放、单页主题覆盖、speaker notes 槽。
 * dev-protocol/05 §1.2、dev-protocol/06 §6。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 缩放与画幅逻辑为保守。修改 MUST 走 dev-protocol/06 修订。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DeckConfig, SlideData } from "@/schema";
import styles from "./SlideFrame.module.css";

interface SlideFrameProps {
  deckConfig: DeckConfig;
  slide: SlideData;
  slideIndex: number;
  slideId: string;
  total: number;
  children: ReactNode;
}

const ASPECT_TO_RATIO: Record<DeckConfig["aspectRatio"], { w: number; h: number }> = {
  "16:9": { w: 1920, h: 1080 },
  "4:3": { w: 1440, h: 1080 },
};

export function SlideFrame({
  deckConfig,
  slide,
  slideIndex,
  slideId,
  total,
  children,
}: SlideFrameProps) {
  const ratio = ASPECT_TO_RATIO[deckConfig.aspectRatio];
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const compute = () => {
      if (!wrapperRef.current) return;
      const { clientWidth, clientHeight } = wrapperRef.current;
      const next = Math.min(clientWidth / ratio.w, clientHeight / ratio.h);
      setScale(next > 0 ? next : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [ratio.h, ratio.w]);

  const themeOverrideClass =
    "theme" in slide && slide.theme === "dark"
      ? "theme-dark"
      : "theme" in slide && slide.theme === "light"
        ? "theme-light"
        : "";

  const bgStyle = (() => {
    const bg = "background" in slide ? slide.background : undefined;
    if (!bg) return undefined;
    if (bg.colorToken) {
      return { background: `var(${bg.colorToken})` } as const;
    }
    if (bg.imageSrc) {
      return {
        backgroundImage: `url(${bg.imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } as const;
    }
    return undefined;
  })();

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div
        className={`${styles.frame} ${themeOverrideClass}`}
        style={{
          width: `${ratio.w}px`,
          height: `${ratio.h}px`,
          transform: `scale(${scale})`,
          ...bgStyle,
        }}
        data-slide-id={slideId}
        data-slide-type={slide.type}
      >
        {children}
      </div>

      {deckConfig.showSpeakerNotesOverlay && "speakerNotes" in slide && slide.speakerNotes ? (
        <div className={styles.notes} aria-label="speaker notes">
          <div className={styles.notesHeader}>
            #{slideIndex + 1} / {total} · {slide.type}
          </div>
          <div className={styles.notesBody}>{slide.speakerNotes}</div>
        </div>
      ) : null}
    </div>
  );
}
