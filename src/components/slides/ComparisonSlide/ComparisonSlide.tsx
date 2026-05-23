/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * dev-protocol/04 §3.7。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { ComparisonSlideData } from "@/schema";
import styles from "./ComparisonSlide.module.css";

export function ComparisonSlide(props: ComparisonSlideData) {
  return (
    <section className={styles.slide}>
      <h2 className={styles.title}>{props.title}</h2>
      <div
        className={styles.columns}
        data-column-count={props.columns.length}
        style={{ gridTemplateColumns: `repeat(${props.columns.length}, 1fr)` }}
      >
        {props.columns.map((col, ci) => (
          <div key={ci} className={styles.column}>
            <div className={styles.header}>{col.header}</div>
            <ul className={styles.bullets}>
              {col.bullets.map((b, bi) => (
                <li key={bi} className={styles.bullet}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
