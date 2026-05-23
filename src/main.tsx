/* ========== [COMMENT / 注释区] BEGIN ==========
 * 应用入口。
 * 启动时 MUST 调用 assertDeck 全量校验；校验失败 MUST 抛错，禁止 fallback。
 * dev-protocol/07 §3.2。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 启动顺序与挂载逻辑为保守。修改 MUST 走 dev-protocol 修订。
 * 不允许在 assertDeck 周围加 try/catch 隐式回退。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { assertDeck } from "@/utils/assertDeck";
import { deckConfig as rawDeckConfig } from "@/deck/deck.config";
import { slides as rawSlides } from "@/deck/slides";

import "@/theme/tokens.css";
import "@/theme/typography.css";
import "@/theme/layout.css";

const { deckConfig, slides } = assertDeck({
  deckConfig: rawDeckConfig,
  slides: rawSlides,
});

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("[main] #root not found in index.html");
}

createRoot(rootEl).render(
  <StrictMode>
    <App deckConfig={deckConfig} slides={slides} />
  </StrictMode>,
);
