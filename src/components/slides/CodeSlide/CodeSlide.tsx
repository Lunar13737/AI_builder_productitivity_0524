/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * dev-protocol/04 §3.6 + 10 §2 (XSS 防护：纯字符串渲染，禁止 dangerouslySetInnerHTML)。
 * 语法高亮如需启用，MUST 在编译期处理（Shiki 等）。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { CodeSlideData } from "@/schema";
import styles from "./CodeSlide.module.css";

export function CodeSlide(props: CodeSlideData) {
  const lines = props.code.split("\n");
  const highlighted = new Set(props.highlightLines ?? []);

  return (
    <section className={styles.slide}>
      {props.title ? <h2 className={styles.title}>{props.title}</h2> : null}
      <pre className={styles.pre} data-language={props.language}>
        <code className={styles.code}>
          {lines.map((line, i) => {
            const lineNo = i + 1;
            const isHl = highlighted.has(lineNo);
            return (
              <span key={i} className={`${styles.line} ${isHl ? styles.lineHighlight : ""}`}>
                <span className={styles.lineNo} aria-hidden="true">
                  {lineNo}
                </span>
                <span className={styles.lineText}>{line.length > 0 ? line : " "}</span>
              </span>
            );
          })}
        </code>
      </pre>
    </section>
  );
}
