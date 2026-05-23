/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * dev-protocol/04 §3.1 + 05 §1.4。
 * 整文件保守。修改 MUST 走 dev-protocol 修订。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { TitleSlideData } from "@/schema";
import styles from "./TitleSlide.module.css";

export function TitleSlide(props: TitleSlideData) {
  return (
    <section className={styles.slide}>
      {props.eyebrow ? <div className={styles.eyebrow}>{props.eyebrow}</div> : null}
      <h1 className={styles.title}>{props.title}</h1>
      {props.subtitle ? <p className={styles.subtitle}>{props.subtitle}</p> : null}
    </section>
  );
}
