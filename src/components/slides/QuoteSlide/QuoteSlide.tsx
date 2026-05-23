/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * dev-protocol/04 §3.5。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { QuoteSlideData } from "@/schema";
import styles from "./QuoteSlide.module.css";

export function QuoteSlide(props: QuoteSlideData) {
  return (
    <section className={styles.slide}>
      <blockquote className={styles.quote}>
        <span className={styles.openMark} aria-hidden="true">
          “
        </span>
        {props.quote}
        <span className={styles.closeMark} aria-hidden="true">
          ”
        </span>
      </blockquote>
      {props.attribution ? <div className={styles.attribution}>— {props.attribution}</div> : null}
    </section>
  );
}
