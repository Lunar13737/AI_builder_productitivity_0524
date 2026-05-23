/* ========== [COMMENT / 注释区] BEGIN ==========
 * 本文件由 dev-protocol/04 §3 (标准 slide 类型与字段约束) 规定。
 * Zod schemas + 用 z.infer 推断 TypeScript 类型，禁止手写双份类型。
 * 三层校验链中的「启动期 Zod」层，由 utils/assertDeck.ts 调用。
 * 字段上限调整 MUST 在项目级以 schema extension 实现，禁止直接改本文件。
 * ========== [COMMENT / 注释区] END ========== */

import { z } from "zod";

/* ========== [CONSERVATIVE / 保守区] BEGIN ==========
 * 标准 slide 类型清单、通用元字段、所有标准类型 schema 字段定义。
 * 修改 MUST 走 dev-protocol/04 修订流程。
 * 字段上限调整 MUST 通过 project-level extension 实现，禁止直接改本文件。
 * ========== [CONSERVATIVE / 保守区] END ========== */

const NonEmptyString = (max: number) => z.string().min(1).max(max);

// 通用元字段（所有 slide 类型可选附带）
const SlideMetaSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9][a-z0-9-]*$/, "id MUST be kebab-case alphanumeric")
    .optional(),
  speakerNotes: z.string().max(1200).optional(),
  theme: z.enum(["light", "dark"]).optional(),
  background: z
    .object({
      colorToken: z.string().regex(/^--color-[a-z0-9-]+$/).optional(),
      imageSrc: z.string().min(1).optional(),
    })
    .partial()
    .optional(),
});

// 3.1 title
export const TitleSlideSchema = SlideMetaSchema.extend({
  type: z.literal("title"),
  title: NonEmptyString(60).describe("封面主标题，1-60 字"),
  subtitle: NonEmptyString(100).optional(),
  eyebrow: NonEmptyString(40).optional(),
});

// 3.2 section
export const SectionSlideSchema = SlideMetaSchema.extend({
  type: z.literal("section"),
  eyebrow: NonEmptyString(40).optional(),
  title: NonEmptyString(60),
  description: NonEmptyString(160).optional(),
});

// 3.3 content
export const ContentSlideSchema = SlideMetaSchema.extend({
  type: z.literal("content"),
  title: NonEmptyString(60),
  subtitle: NonEmptyString(100).optional(),
  bullets: z.array(NonEmptyString(60)).min(1).max(6).describe("1-6 条要点，每条 1-60 字"),
});

// 3.4 image
export const ImageSlideSchema = SlideMetaSchema.extend({
  type: z.literal("image"),
  title: NonEmptyString(60),
  imageSrc: NonEmptyString(500),
  alt: NonEmptyString(160),
  caption: NonEmptyString(120).optional(),
  aspect: z.enum(["16:9", "4:3", "1:1", "auto"]).optional(),
});

// 3.5 quote
export const QuoteSlideSchema = SlideMetaSchema.extend({
  type: z.literal("quote"),
  quote: NonEmptyString(280),
  attribution: NonEmptyString(80).optional(),
});

// 3.6 code
// 注意：refinements 写在 code 字段本身（保持 schema 为 ZodObject 以兼容 discriminatedUnion）。
// 跨字段约束（highlightLines 行号范围）由 assertDeck 在解析后单独校验。
const CodeStringSchema = z
  .string()
  .min(1)
  .max(14 * 90)
  .refine((c) => c.split("\n").length <= 14, {
    message: "code MUST be <= 14 lines",
  })
  .refine((c) => c.split("\n").every((line) => line.length <= 80), {
    message: "each code line MUST be <= 80 chars",
  });

export const CodeSlideSchema = SlideMetaSchema.extend({
  type: z.literal("code"),
  title: NonEmptyString(60).optional(),
  language: NonEmptyString(20),
  code: CodeStringSchema,
  highlightLines: z.array(z.number().int().positive()).optional(),
});

// 3.7 comparison
export const ComparisonSlideSchema = SlideMetaSchema.extend({
  type: z.literal("comparison"),
  title: NonEmptyString(60),
  columns: z
    .array(
      z.object({
        header: NonEmptyString(30),
        bullets: z.array(NonEmptyString(60)).min(1).max(5),
      }),
    )
    .min(2)
    .max(3),
});

// 3.8 timeline
export const TimelineSlideSchema = SlideMetaSchema.extend({
  type: z.literal("timeline"),
  title: NonEmptyString(60),
  steps: z
    .array(
      z.object({
        label: NonEmptyString(30),
        detail: NonEmptyString(80).optional(),
      }),
    )
    .min(2)
    .max(6),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
});

// 3.9 closing
export const ClosingSlideSchema = SlideMetaSchema.extend({
  type: z.literal("closing"),
  headline: NonEmptyString(80),
  cta: NonEmptyString(60).optional(),
  contacts: z
    .array(
      z.object({
        label: NonEmptyString(30),
        value: NonEmptyString(120),
      }),
    )
    .max(4)
    .optional(),
});

// 3.10 custom（逃生口）
export const CustomSlideSchema = SlideMetaSchema.extend({
  type: z.literal("custom"),
  id: z.string().min(1).max(64),
  componentKey: NonEmptyString(64).describe("对应 slides/_custom/<componentKey>/ 目录"),
  props: z.unknown(),
  reqRef: NonEmptyString(120).describe("MUST 指回 PROJECT-BRIEF §13 三区豁免登记表条目"),
});

// Slide 联合
export const SlideDataSchema = z.discriminatedUnion("type", [
  TitleSlideSchema,
  SectionSlideSchema,
  ContentSlideSchema,
  ImageSlideSchema,
  QuoteSlideSchema,
  CodeSlideSchema,
  ComparisonSlideSchema,
  TimelineSlideSchema,
  ClosingSlideSchema,
  CustomSlideSchema,
]);

// Deck 配置
export const DeckConfigSchema = z.object({
  title: NonEmptyString(80),
  theme: z.enum(["light", "dark"]),
  showPageNumber: z.boolean(),
  showSpeakerNotesOverlay: z.boolean(),
  aspectRatio: z.enum(["16:9", "4:3"]),
});

// 推断 TS 类型
export type TitleSlideData = z.infer<typeof TitleSlideSchema>;
export type SectionSlideData = z.infer<typeof SectionSlideSchema>;
export type ContentSlideData = z.infer<typeof ContentSlideSchema>;
export type ImageSlideData = z.infer<typeof ImageSlideSchema>;
export type QuoteSlideData = z.infer<typeof QuoteSlideSchema>;
export type CodeSlideData = z.infer<typeof CodeSlideSchema>;
export type ComparisonSlideData = z.infer<typeof ComparisonSlideSchema>;
export type TimelineSlideData = z.infer<typeof TimelineSlideSchema>;
export type ClosingSlideData = z.infer<typeof ClosingSlideSchema>;
export type CustomSlideData = z.infer<typeof CustomSlideSchema>;

export type SlideData = z.infer<typeof SlideDataSchema>;
export type DeckConfig = z.infer<typeof DeckConfigSchema>;

export type SlideType = SlideData["type"];
