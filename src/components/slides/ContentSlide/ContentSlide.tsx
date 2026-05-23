/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * dev-protocol/04 §3.3。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { ContentSlideData } from "@/schema";
import styles from "./ContentSlide.module.css";

export function ContentSlide(props: ContentSlideData) {
  return (
    <section className={styles.slide}>
      <header className={styles.header}>
        <h2 className={styles.title}>{props.title}</h2>
        {props.subtitle ? <p className={styles.subtitle}>{props.subtitle}</p> : null}
      </header>
      <ul className={styles.bullets}>
        {props.bullets.map((bullet, i) => (
          <li key={i} className={styles.bullet}>
            <span className={styles.bulletDot} aria-hidden="true" />
            <span className={styles.bulletText}>{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
