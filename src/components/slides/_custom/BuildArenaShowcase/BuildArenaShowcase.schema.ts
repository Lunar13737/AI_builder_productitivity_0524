/* ========== [COMMENT / 注释区] BEGIN ==========
 * BuildArena 商业分享 custom slide props schema。
 * 依据 dev-protocol/04 §5：custom slide MUST 自带 Zod props schema。
 * ========== [COMMENT / 注释区] END ========== */

import { z } from "zod";

/* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §13.exemption-1, §2 12 页大纲、素材与交互] ==========
 * 本 schema 覆盖 BuildArena 12 页沉浸式/交互式商业分享所需数据。
 * ========== [VARIABLE / 可变区] END ========== */

const AssetSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1).max(160).optional(),
  label: z.string().min(1).max(80).optional(),
  detail: z.string().min(1).max(160).optional(),
});

const ItemSchema = z.object({
  label: z.string().min(1).max(80),
  title: z.string().min(1).max(120).optional(),
  detail: z.string().min(1).max(220).optional(),
});

export const BuildArenaShowcasePropsSchema = z.object({
  variant: z.enum([
    "cover",
    "motivation",
    "results",
    "framework",
    "failure",
    "sequence",
    "feedback",
    "representation",
    "creativity",
    "infra",
    "industry",
    "closing",
  ]),
  eyebrow: z.string().min(1).max(60).optional(),
  title: z.string().min(1).max(120),
  subtitle: z.string().min(1).max(220).optional(),
  verdict: z.string().min(1).max(180).optional(),
  assets: z.array(AssetSchema).max(12).optional(),
  items: z.array(ItemSchema).max(8).optional(),
});

export type BuildArenaShowcaseProps = z.infer<typeof BuildArenaShowcasePropsSchema>;
