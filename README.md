# BuildArena Commercial Share

> BuildArena 商业分享 slides。项目已迁移到根 README 指定的新宪法栈：React + TypeScript + Vite + Zod + Vitest + Playwright。

## 模板基线

- `template-baseline`: `docs/templates/slides-template` from 2026-05 new constitution
- 项目 Brief: [PROJECT-BRIEF.md](./PROJECT-BRIEF.md)
- 通用宪法: [../../docs/dev-protocol/README.md](../../docs/dev-protocol/README.md)

## 快速运行

前置环境：

- Node.js `>=20`
- pnpm `9.12.3`

```bash
pnpm install
pnpm dev
```

默认地址：`http://localhost:5173/`

导航：

- `←` / `→` / `Space` 翻页
- `Home` / `End` 跳到首尾页
- URL hash 使用 `#/slide/<id>`

## 标准命令

| 命令 | 作用 |
|------|------|
| `pnpm install` | 安装依赖 |
| `pnpm dev` | Vite 开发服务器 |
| `pnpm typecheck` | TypeScript 严格类型检查 |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier 格式化 |
| `pnpm test` | Vitest 单测 |
| `pnpm test:visual` | Playwright 视觉回归 |
| `pnpm test:visual:update` | 更新视觉基准 |
| `pnpm build` | 类型检查 + Vite 构建 |
| `pnpm preview` | 预览 `dist/` |
| `pnpm check` | 总闸：typecheck + lint + test + build |

## 可变区入口

| 文件 | 用途 | Brief 锚点 |
|------|------|------------|
| `src/deck/deck.config.ts` | deck 级配置 | §0 / §3 / §6 |
| `src/deck/slides.ts` | 12 页 slide 数据 | §0.slide-decisions / §2 |
| `src/components/slides/_custom/BuildArenaShowcase/` | 沉浸式 custom slide | §13.exemption-1 |
| `src/theme/tokens.css` | theme token 值 | §4 / §5 / §6 |
| `public/assets/` | BuildArena 素材 | §8 |

## 项目结构

```text
projects/BuildArena_commercial_share/
├── PROJECT-BRIEF.md
├── package.json
├── pnpm-lock.yaml
├── index.html
├── public/
│   └── assets/
├── src/
│   ├── deck/
│   ├── schema/
│   ├── components/
│   │   └── slides/_custom/BuildArenaShowcase/
│   ├── theme/
│   └── utils/
├── tests/
└── e2e/
```

## 视觉回归

首次建立基准：

```bash
pnpm test:visual:update
```

日常检查：

```bash
pnpm test:visual
```

按宪法约定，视觉基准应来自固定平台；本地 macOS 截图可能和 CI Linux 有像素差，不应随手提交本地基准。
