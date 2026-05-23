/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * dev-protocol/04 §3.9。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { ClosingSlideData } from "@/schema";
import styles from "./ClosingSlide.module.css";

export function ClosingSlide(props: ClosingSlideData) {
  return (
    <section className={styles.slide}>
      <h1 className={styles.headline}>{props.headline}</h1>
      {props.cta ? <div className={styles.cta}>{props.cta}</div> : null}
      {props.contacts && props.contacts.length > 0 ? (
        <dl className={styles.contacts}>
          {props.contacts.map((c, i) => (
            <div key={i} className={styles.contactRow}>
              <dt className={styles.contactLabel}>{c.label}</dt>
              <dd className={styles.contactValue}>{c.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
