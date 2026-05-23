/* ========== [COMMENT / 注释区] BEGIN ==========
 * 把 public/ 下资源的相对路径解析为受 Vite `base` 约束的 URL。
 *
 * 背景：Vite 只会自动改写 index.html 中的绝对路径；
 * JS/TS/JSX 里手写的 "/assets/..." 不会自动加 base 前缀，
 * 部署到 GitHub Pages 子路径（例如 /AI_builder_productitivity_0524/）时会 404。
 *
 * 用法：
 *   asset("assets/images/foo.png")  // -> "/AI_builder_productitivity_0524/assets/images/foo.png"
 *
 * 入参以斜杠开头时会被去掉，避免拼成双斜杠。
 * ========== [COMMENT / 注释区] END ========== */

export function asset(path: string): string {
  const trimmed = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${trimmed}`;
}
