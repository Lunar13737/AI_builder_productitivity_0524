# PROJECT-BRIEF · BuildArena Commercial Share

> **说明**：本文档由需求采集清单访谈后填写，是本项目的**唯一需求事实来源（SSOT）**。  
> 与 [dev-protocol](../../docs/dev-protocol/README.md) 共同构成**本项目宪法**。

---

## 元信息

| 字段 | 值 |
|------|-----|
| 项目名称 | BuildArena Commercial Share |
| 项目 slug（目录名） | BuildArena_commercial_share |
| 文档版本 | v2.3 |
| 状态 | 已确认 |
| 内容大纲引用 | 本文件 §2 + arXiv:2510.16559 + build-arena.github.io |
| 最后更新 | 2026-05-23 |
| 负责人 | Tian Xia |

---

## 0. 可变区决策表 {#0-slide-decisions}

本节为新宪法下的项目可变区授权入口。落码时可变区 `[REQ-REF]` 应指向本表、§2 或 §13。

| ID | 可变区 | 决策 | 状态 |
|----|--------|------|------|
| §0.deck-config | `src/deck/deck.config.ts` | 16:9、light 默认主题、显示页码、关闭 speaker notes overlay | 已确认 |
| §0.slide-decisions | `src/deck/slides.ts` | 采用 §2 中 10 页商业分享大纲作为 slide 数据 SSOT | 已确认 |
| §0.custom-component | `src/components/slides/_custom/BuildArenaShowcase/` | 为沉浸式封面、交互式 finding 页和 infra/industry 场景页实现项目级 custom slide | 已确认 |
| §0.assets | `public/assets/` | 已入库 BuildArena 图片、GIF、视频和 UniForce Logo；运行时通过 Vite public 路径引用 | 已确认 |

---

## 1. 受众与目标

- **主受众**：AI 劳动力/生产力主题开放分享会上的创业者群体
- **使用场景**：会议现场大屏演示（16:9）
- **核心信息与 CTA**：理解 BuildArena 的价值和团队能力；理解 AI4E infra 的重要性与潜力
- **语气与品牌人格**：轻松科技感——像一次技术茶话会分享，有活力但不随意
- **参考站点（喜欢）**：Stripe/Linear 风格的渐变现代感；参考图中的蓝白卡片结构但更轻盈

---

## 2. 内容与信息架构

- **内容权威来源**：arXiv:2510.16559 论文 + build-arena.github.io 网站 + /Users/tianxia/Documents/GitHub/build-arena.github.io/ 本地源码
- **叙事结构**：线性幻灯片（一屏一主题，顺序固定）；第 4–8 页每页应有独特的交互或呈现机制
- **屏/节数量（约）**：10 页
- **语言策略**：中文为主，关键术语保留英文（BuildArena、LLM、Benchmark、AI4E、Infra）
- **信息密度**：极简演讲型（大字少字，大屏优先）
- **法律/Logo/赞助标识要求**：UniForce Logo 作为演讲主体公司标识
- **更新策略**：一次性交付，不需后续更新

### 叙事主线

BuildArena 的商业分享不以模型 leaderboard 为中心，而以一个更强的判断为中心：

> LLM 有工程创造力，但不能被直接扔进工程世界；真正释放能力的是适合 LLM 的工程基础设施。

叙事节奏：

1. 先展示 BuildArena 已经能让 LLM 从自然语言走向机械建造。
2. 再解释过程中暴露出的关键瓶颈：最终文件生成、约束反馈、状态表示。
3. 最后展示正向惊喜：当接口和表示对齐后，LLM 确实有工程理解与创造性。
4. 由此转向 AI4E Infra：状态转译、约束校验、操作执行、反馈闭环、仿真验证、安全边界。

### 10 页大纲、素材与交互

| 页码 | slide id | eyebrow | 核心信息 | 建议素材 | 呈现/交互方式 |
|------|----------|---------|----------|----------|---------------|
| 1 | cover | — | AI Builder 如何创造生产力；北京，2026-05-24，夏天 · 西湖原力 工程总监，title "赛博园丁" | 3 个 header video 混剪；UniForce Logo | 全屏沉浸背景，主标题叠加，chips 承载讲者/地点/身份 |
| 2 | motivation | 为什么要聊生产力 | LLM 要走向现实世界，必须能设计物理实体 | lucide-react 图标：天平、代码符号、齿轮 | 三段式横向推进：自然语言 → 代码世界 → 物理实体 |
| 3 | result-first | 先看结果 | LLM 已经能从自然语言生成机械结构 | 桥/车/火箭建造 GIF | 三个大 GIF 案例区，点击切换；中文案例标签 |
| 4 | failure-lab | 发现 1 | 工程结果不是一段可以直接生成的文本；格式合法 ≠ 空间合法 ≠ 工程可建造 | XML 示例代码；Three.js 两个 box 重叠场景 | 左侧代码窗口 + 右侧可拖拽 3D 空间合法性示意；底部"空间非法"状态条 |
| 5 | representation | 发现 3 | Representation 决定 LLM 是否理解工程状态 | Besiege GUI.png、3D 向量/四元数/欧拉角文本、方向罗盘+俯仰角 | 三 tab 切换：GUI 界面 / 数学表示 / 方向文本 |
| 6 | framework | 它怎么工作 | BuildArena 是从语言到物理验证的闭环 | benchmark_framework.png | Framework 图分层高亮：目标指令 → 智能体流程 → 3D 操作接口 → 物理仿真验证；.lens0–.lens3 CSS 手动调参 |
| 7 | creativity | 发现 5 | 接口对了，LLM 会给出意料之外的工程方案 | 桥梁结构 GIF、火箭推进载具 GIF、construction grid 代表案例 | Surprise Gallery：三张案例卡，点击展开说明 |
| 8 | infra | 发现 6 | 释放 LLM 工程能力，需要 AI4E Infra | — | 中心公式逐项点亮：Model + Representation + Constraints + Feedback + Simulation |
| 9 | uniforce-industry | From Research to Industry | 从 BuildArena 到真实工业场景；制造/能源/电子 | UniForce Logo | 工业场景地图：三类行业节点向 AI4E Infra 汇聚 |
| 10 | closing | Thank You | 团队、联系方式、Paper / GitHub / Website | Paper/GitHub/Website 链接 | 简洁结尾页，链接卡片 |

### 核心发现页内容要求

#### 第 4 页：LLM 不适合直接生成最终工程文件

- 关键句：**格式合法 ≠ 空间合法 ≠ 工程可建造**。
- 需要表达：工程结果文件格式冷门、语法严格、空间约束强，对 LLM 接近 OOD。
- 早期尝试：让 LLM 直接输出游戏机械结构 XML，语法合法概率很低。
- 即使使用 structured output，仍会因为坐标、朝向、连接关系导致空间重叠/冲突。
- 若引用 BesiegeField 的 spatial validity 定量分析，需要在 slide 中注明来源。

#### 第 5 页：Representation 决定理解

- 关键句：**LLM 需要的不是人类看到的 GUI，而是适合它推理的世界表示。**
- GUI agent 包含完整信息，但 Besiege 操作需要 3D 视觉、视角拖拽、精确点击，操作准确率低；素材使用已入库的 GUI.png。
- 同一 3D 状态转成文本后，表示形式依然显著影响效果：
  - 3D vector / 四元数 / 欧拉角：数学精确，但 LLM 难以稳定推理。
  - 东南西北 + 俯仰角（方向文本）：更直观，效果显著提升。
- 信息等价不代表模型可用；表示必须服务于 LLM 的推理方式。
- tab 切换标签：GUI 界面 / 数学表示 / 方向文本；方向文本罗盘指向北偏东 30°，俯仰角 0°。

#### 第 7 页：LLM 的工程创造力

- 关键句：**接口对了，LLM 不只是复述 token，而是在搜索 design space。**
- 桥梁任务中，prompt 未显式要求钢筋桁架、斜拉索等现实工程结构，但模型产物出现相似结构。
- 货物移动载具任务中，prompt 未限定载具形式，模型产物出现火箭推进方案。
- 这一页要从"困难很多"转为"机会很大"：LLM 不是没有工程能力，而是需要正确接口、表示和约束系统释放能力。

#### 第 8 页：AI4E Infra 转折

- 核心公式：`Engineering AI = Model + Representation + Constraints + Feedback + Simulation`。
- Infra 模块至少包括：State Translation、Constraint Engine、Operation API、Feedback Loop、Simulation Verification、Safety Boundary。
- 商业判断：未来 LLM 走向现实世界，瓶颈不只是模型，而是模型与真实工程系统之间的基础设施。

---

## 3. 视觉与美术风格

- **整体方向**：渐变现代（Stripe/Linear 风）+ 蓝白色系
- **明暗模式**：仅浅色（白/浅灰底 + 蓝色渐变点缀）
- **背景与层次**：渐变背景 + 现代卡片，轻量通透
- **插图与素材策略**：优先使用已入库的 BuildArena GIF、视频、框架图、pipeline 图；新增案例截图、日志片段、数据图按核心发现页需要补充
- **形状语言**：中等圆角、轻阴影、卡片悬浮
- **动效气质**：过渡克制（页切换简洁）；展示页允许丰富交互（展示技术实力）

---

## 4. 色彩与主题（落实为 CSS 变量）

| Token | 值 | 备注 |
|-------|-----|------|
| `--color-bg` | #f8faff | 极浅蓝白底 |
| `--color-surface` | #ffffff | 卡片表面 |
| `--color-text` | #1a2332 | 深色正文 |
| `--color-text-muted` | #5a6a7a | 辅助文字 |
| `--color-accent` | #2563eb | 主蓝色（蓝白体系核心） |
| `--color-accent-light` | #60a5fa | 浅蓝辅助 |
| `--color-border` | #e2e8f0 | 边框/分割线 |
| `--color-gradient-start` | #eff6ff | 渐变起始 |
| `--color-gradient-end` | #f8faff | 渐变结束 |

- **对比度目标**：WCAG AA
- **渐变/特殊效果**：页面背景微渐变；标题可用蓝色渐变文字

---

## 5. 字体与排版

| 层级 | 字体族 | 字号（桌面） | 字重 | 行高 |
|------|--------|-------------|------|------|
| H1 | Inter / system-ui | 48–56px | 700 | 1.2 |
| H2 | Inter / system-ui | 32–40px | 600 | 1.3 |
| Body | Inter / system-ui | 20–24px | 400 | 1.6 |
| Caption | Inter / system-ui | 14–16px | 400 | 1.4 |

- **字体来源与授权**：系统字体栈 + Google Fonts Inter（免费）
- **中文回退**：-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif

---

## 6. 布局与结构

- **画幅与一屏定义**：16:9（1920×1080 设计基准），一屏 = 一页 slide
- **导航形态**：键盘左右箭头 + 底部进度指示
- **最大宽度与边距**：内容区 max-width 1400px，边距 80px+
- **断点**：仅桌面/大屏（无移动适配需求）
- **页眉/页脚/页码**：右下角小号页码；UniForce Logo 固定于某角落位置
- **必备版式组件**：全屏标题页、内容卡片页、图文混排页、数据亮点页

---

## 7. 交互与导航

- **主交互模式**：键盘翻页（← →）+ 点击翻页
- **支持的输入方式**：键盘、鼠标
- **切屏动效**：克制的淡入/滑动过渡（200–400ms）
- **微交互清单**：每页应有独特呈现方式；第 4–8 页优先实现 failure reveal（Three.js）、representation tabs、framework 分层高亮、surprise gallery、infra module highlight
- **URL/hash**：支持 #page-N 直接跳转
- **无障碍要求**：基本键盘可达
- **边界情况**：仅考虑桌面大屏

---

## 8. 媒体与素材

- **图像/视频/图标策略**：已入库素材优先；缺少的失败案例、GUI 截图、表示对比和团队信息由用户后续提供或从项目资料补充
- **Logo 规范**：UniForce Logo 已入库 `assets/images/UniForce Logo.png`
- **版权要求**：所有素材为团队自有

### 资产交付表

| 资产名 | 格式 | 状态 | 来源 |
|--------|------|------|------|
| UniForce Logo | PNG | 已入库 | public/assets/images/ |
| 建造 GIF（桥/车/火箭） | GIF | 已入库 | public/assets/images/ |
| Construction grid GIF + model logos | GIF/SVG | 已入库 | public/assets/images/construction_grid/ |
| Pipeline step images | PNG | 已入库 | public/assets/images/pipeline_images/ |
| Benchmark 框架图 | PNG | 已入库 | public/assets/images/ |
| 雷达图 | JPG | 已入库 | public/assets/images/ |
| Header/Demo 视频 | MP4 | 已入库 | public/assets/video/ |
| XML/结构化输出失败案例 | Text/Image | 待补充 | 用户或实验记录 |
| 空间冲突/rollback 示例 | Image/Log | 待补充 | 用户或实验记录 |
| GUI agent 操作截图/录屏 | Image/Video | 待补充 | 用户或实验记录 |
| Representation 对比文本 | Text | 待整理 | 用户或实验记录 |
| 工业场景图 | Image | 待补充 | 用户或公开可用素材 |
| 团队信息 | — | 待提供 | 用户后续提供 |

---

## 9. 技术与环境约束

- **目标浏览器**：Chrome/Edge 最新版（大屏演示用）
- **性能预算**：首屏 < 2s，GIF/视频按需加载
- **SEO / Open Graph**：不需要
- **托管与域名**：Vite dev/preview，本地开发地址由 `pnpm dev` 提供；构建产物在 `dist/`
- **统计与分析**：不需要
- **安全与第三方嵌入**：无
- **前端工程路径与包管理器**：React + TypeScript + Vite + Zod + Vitest + Playwright；包管理器 pnpm

---

## 10. 交付与维护

### 里程碑

| 阶段 | 状态 |
|------|------|
| Brief 确认 | ✅ 已确认 |
| 核心叙事大纲 | ✅ 已确认（v1.1） |
| 新宪法迁移 | 进行中（React/Vite/TS 模板已接入） |
| 风格板/样章 | 已迁移为 custom slide 初版 |
| 全量内容 | 进行中（10 页版本已数据化，page 1–8 交互完成） |
| 验收 | — |

- **验收环境与标准**：`pnpm check` 通过；Chrome/Edge 查看 `pnpm dev` 或 `pnpm preview`；关键页需 Playwright/截图人工验收
- **上线后维护与变更流程**：一次性交付，无后续维护

---

## 11. 待定项与风险

| ID | 描述 | 负责人 | 状态 |
|----|------|--------|------|
| TBD-1 | 团队介绍页内容待用户提供 | 用户 | 待定 |
| TBD-2 | XML/结构化输出失败案例、空间冲突截图、rollback 日志待补充 | 用户/开发者 | 待定 |
| TBD-3 | GUI agent 截图/录屏与 representation 对比文本待整理 | 用户/开发者 | 待定 |
| TBD-4 | 工业场景图与第 11 页行业节点素材待确定 | 用户/开发者 | 待定 |

---

## 12. 修订记录

| 版本 | 日期 | 作者 | 摘要 |
|------|------|------|------|
| v1.0 | 2026-05-21 | AI（需求访谈） | 完成三轮访谈，确认所有关键需求 |
| v1.1 | 2026-05-22 | AI + Tian Xia | 更新为 12 页商业分享大纲，明确第 5–10 页核心发现、素材需求与交互呈现；同步资产状态 |
| v1.2 | 2026-05-22 | AI + Tian Xia | 按新宪法迁移到 React/TypeScript/Vite/Zod/Vitest/Playwright；补 §0 可变区决策与 §13 custom slide 豁免 |
| v1.3 | 2026-05-23 | AI + Tian Xia | 重规划第 1 页为 AI Builder 生产力分享开场：加入北京 2026-05-24、讲者署名、赛博园丁 title，并调整封面语气为轻松现场分享 |
| v1.4 | 2026-05-23 | AI + Tian Xia | 调整第 2 页为中文表达，修正标题孤字换行，并引入 lucide-react 图标组合具象化自然语言、代码世界、物理实体三类场景 |
| v1.5 | 2026-05-23 | AI + Tian Xia | 收敛第 2 页 block 图标为单个大图标：天平、代码符号、齿轮 |
| v1.6 | 2026-05-23 | AI + Tian Xia | 调整第 3 页为中文 category/eyebrow，并加宽副标题区域改善“9 个前沿 LLM...”断行 |
| v1.7 | 2026-05-23 | AI + Tian Xia | 第 3 页标题手动断为两行，避免“机械结构”末字孤行 |
| v1.8 | 2026-05-23 | AI + Tian Xia | 重做第 4 页为中文 HTML/CSS 架构图，并调整四个高亮框位置匹配对应模块 |
| v1.9 | 2026-05-23 | AI + Tian Xia | 第 4 页回退为使用论文原始 framework 图片；保留中文左侧说明；高亮框改为 CSS 手动调参 |
| v2.0 | 2026-05-23 | AI + Tian Xia | 重做第 5 页：去掉代码侧英文标签，右侧改为 CSS 3D 空间重叠示意图以解释空间合法性 |
| v2.1 | 2026-05-23 | AI + Tian Xia | 第 5 页右侧升级为可拖拽 Three.js 场景：两个 box + 红色重叠体积 + 网格地面 |
| v2.2 | 2026-05-23 | AI + Tian Xia | 第 5 页移除“拖拽旋转视角”提示 label，并让左侧 XML 与右侧两个 box 的尺寸和坐标完全对应 |
| v2.3 | 2026-05-23 | AI + Tian Xia | 重构 slide 顺序为 10 页：第 5 页改用 GUI.png + 数学表示 + 方向文本三 tab；Framework 移至 representation 之后（页 6）；删除 sequence/feedback 两页；发现编号更新为 1/3/5/6；§2 大纲与核心发现页编号同步 |

---

## 13. 三区豁免登记表 {#13-exemptions}

| ID | 范围 | 豁免内容 | 理由 | 约束 |
|----|------|----------|------|------|
| §13.exemption-1 | `src/components/slides/_custom/BuildArenaShowcase/` + `src/deck/slides.ts` 中 10 页 `custom` slide | 使用项目级 custom slide 渲染沉浸式封面、failure lab（Three.js 场景）、representation tabs（GUI/数学表示/方向文本）、framework 高亮图、surprise gallery、infra equation、industry map | 本 deck 是现场商业分享，Brief §2 明确要求第 4–8 页每页具备独特交互和呈现机制；标准 9 类 slide 无法表达这些页面的交互结构 | custom props MUST 由 Zod schema 校验；组件 MUST 注册在 `_custom/registry.ts`；MUST 保持 slide 数据在 `src/deck/slides.ts` 中；MUST 添加/维护 Vitest 与视觉回归 |

---

## 附录 A：与通用协议的衔接

- 编码与工程实践遵循 [dev-protocol](../../docs/dev-protocol/README.md)。
- 若本项目 Brief 与通用协议冲突，应优先修订 Brief 以服从通用协议；确需例外时登记在 §13。

| 通用协议条款 | 本项目决定 |
|--------------|------------|
| 02 工具链与命令 | 已迁移到 pnpm / Vite / TypeScript / Vitest / Playwright 标准栈 |
| 04 custom 占比 SHOULD ≤ 20% | 本 deck 因现场演示和交互要求，登记 §13.exemption-1 使用项目级 custom slide；后续若标准组件扩展，应逐步回收 custom 占比 |
