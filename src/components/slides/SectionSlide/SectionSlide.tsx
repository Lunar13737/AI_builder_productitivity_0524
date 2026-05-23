/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * dev-protocol/04 §3.2。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { SectionSlideData } from "@/schema";
import styles from "./SectionSlide.module.css";

export function SectionSlide(props: SectionSlideData) {
  return (
    <section className={styles.slide}>
      {props.eyebrow ? <div className={styles.eyebrow}>{props.eyebrow}</div> : null}
      <h1 className={styles.title}>{props.title}</h1>
      {props.description ? <p className={styles.description}>{props.description}</p> : null}
    </section>
  );
}
