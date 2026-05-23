/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * dev-protocol/04 §3.4。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { ImageSlideData } from "@/schema";
import styles from "./ImageSlide.module.css";

export function ImageSlide(props: ImageSlideData) {
  const aspectClass =
    props.aspect === "4:3"
      ? styles.aspect43
      : props.aspect === "1:1"
        ? styles.aspect11
        : props.aspect === "auto"
          ? styles.aspectAuto
          : styles.aspect169;

  return (
    <section className={styles.slide}>
      <h2 className={styles.title}>{props.title}</h2>
      <figure className={styles.figure}>
        <div className={`${styles.imageBox} ${aspectClass}`}>
          <img className={styles.image} src={props.imageSrc} alt={props.alt} loading="lazy" />
        </div>
        {props.caption ? <figcaption className={styles.caption}>{props.caption}</figcaption> : null}
      </figure>
    </section>
  );
}
