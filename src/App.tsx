/* ========== [COMMENT / 注释区] BEGIN ==========
 * 根组件：仅负责把 deckConfig + slides 注入 Deck 壳。
 * dev-protocol/05 §1.1。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 整文件保守。新增运行时副作用 MUST 走 dev-protocol 修订。
 * ========== [CONSERVATIVE / 保守区] END ========== */

import type { DeckConfig, SlideData } from "@/schema";
import { Deck } from "@/components/Deck/Deck";

interface AppProps {
  deckConfig: DeckConfig;
  slides: SlideData[];
}

export default function App({ deckConfig, slides }: AppProps) {
  return <Deck deckConfig={deckConfig} slides={slides} />;
}
