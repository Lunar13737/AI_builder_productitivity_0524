/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * dev-protocol/04 §3.8。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { TimelineSlideData } from "@/schema";
import styles from "./TimelineSlide.module.css";

export function TimelineSlide(props: TimelineSlideData) {
  const isVertical = props.orientation === "vertical";
  return (
    <section className={styles.slide}>
      <h2 className={styles.title}>{props.title}</h2>
      <ol
        className={`${styles.steps} ${isVertical ? styles.vertical : styles.horizontal}`}
        data-orientation={props.orientation ?? "horizontal"}
      >
        {props.steps.map((step, i) => (
          <li key={i} className={styles.step}>
            <div className={styles.stepIndex}>{i + 1}</div>
            <div className={styles.stepBody}>
              <div className={styles.stepLabel}>{step.label}</div>
              {step.detail ? <div className={styles.stepDetail}>{step.detail}</div> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
