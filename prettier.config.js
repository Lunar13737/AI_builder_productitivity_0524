/* ========== [COMMENT / 注释区] BEGIN ==========
 * Prettier 是唯一格式化器（dev-protocol/07 §6）。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 全部字段为保守。修改 MUST 在仓库级讨论后统一。
 * ========== [CONSERVATIVE / 保守区] END ========== */

/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  endOfLine: "lf",
};
