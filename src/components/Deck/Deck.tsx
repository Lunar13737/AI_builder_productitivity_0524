/* ========== [COMMENT / 注释区] BEGIN ==========
 * 全局壳：键盘 / 显式翻页按钮 / hash 路由 / 进度条 / 主题挂载点。
 * dev-protocol/05 §1.1。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 整文件保守。修改 MUST 走 dev-protocol/05 修订。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DeckConfig, SlideData } from "@/schema";
import { SlideFrame } from "@/components/SlideFrame/SlideFrame";
import { renderSlide } from "@/components/renderSlide";
import { resolveAllSlideIds } from "@/utils/slideId";
import styles from "./Deck.module.css";

interface DeckProps {
  deckConfig: DeckConfig;
  slides: SlideData[];
}

const HASH_PREFIX = "#/slide/";

function readHashIndex(slideIds: ReadonlyArray<string>): number {
  if (typeof window === "undefined") return 0;
  const hash = window.location.hash;
  if (!hash.startsWith(HASH_PREFIX)) return 0;
  const key = decodeURIComponent(hash.slice(HASH_PREFIX.length));
  const byId = slideIds.indexOf(key);
  if (byId !== -1) return byId;
  const asNumber = Number(key);
  if (Number.isFinite(asNumber) && asNumber >= 1 && asNumber <= slideIds.length) {
    return asNumber - 1;
  }
  return 0;
}

function writeHash(slideId: string): void {
  if (typeof window === "undefined") return;
  const next = `${HASH_PREFIX}${encodeURIComponent(slideId)}`;
  if (window.location.hash !== next) {
    window.history.replaceState(null, "", next);
  }
}

export function Deck({ deckConfig, slides }: DeckProps) {
  const slideIds = useMemo(() => resolveAllSlideIds(slides), [slides]);
  const [index, setIndex] = useState<number>(() => readHashIndex(slideIds));

  const total = slides.length;
  const currentSlide = slides[index];
  if (!currentSlide) {
    throw new Error(`[Deck] current index ${index} out of range (0..${total - 1})`);
  }
  const currentId = slideIds[index] ?? `slide-${index + 1}`;

  const goTo = useCallback(
    (next: number) => {
      setIndex(() => {
        const clamped = Math.min(Math.max(0, next), total - 1);
        const id = slideIds[clamped] ?? `slide-${clamped + 1}`;
        writeHash(id);
        return clamped;
      });
    },
    [slideIds, total],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          goNext();
          return;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goPrev();
          return;
        case "Home":
          e.preventDefault();
          goTo(0);
          return;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          return;
        default:
          return;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, goTo, total]);

  useEffect(() => {
    const onHashChange = () => setIndex(readHashIndex(slideIds));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [slideIds]);

  useEffect(() => {
    writeHash(currentId);
  }, [currentId]);

  const themeClass = deckConfig.theme === "dark" ? "theme-dark" : "theme-light";

  return (
    <div
      className={`${styles.deck} ${themeClass}`}
      data-slide-index={index}
      data-slide-id={currentId}
      data-slide-type={currentSlide.type}
      data-total={total}
    >
      <SlideFrame
        deckConfig={deckConfig}
        slide={currentSlide}
        slideIndex={index}
        slideId={currentId}
        total={total}
      >
        {renderSlide(currentSlide)}
      </SlideFrame>

      <div className={styles.progressBar} aria-hidden="true">
        <div
          className={styles.progressFill}
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <nav className={styles.navControls} aria-label="Slide controls">
        <button type="button" onClick={goPrev} disabled={index === 0} aria-label="上一页">
          Prev
        </button>
        <div className={styles.navDots} role="group" aria-label="Slide list">
          {slideIds.map((id, dotIndex) => (
            <button
              key={id}
              type="button"
              className={dotIndex === index ? styles.activeDot : ""}
              onClick={() => goTo(dotIndex)}
              aria-current={dotIndex === index ? "page" : undefined}
              aria-label={`跳到第 ${dotIndex + 1} 页`}
            />
          ))}
        </div>
        {deckConfig.showPageNumber ? (
          <span aria-hidden="true">
            {index + 1} / {total}
          </span>
        ) : null}
        <button
          type="button"
          onClick={goNext}
          disabled={index === total - 1}
          aria-label="下一页"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
