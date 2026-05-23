# BuildArena Commercial Share

> BuildArena 商业分享 slides。React + TypeScript + Vite + Zod + Vitest + Playwright。
> 部署在 GitHub Pages：**https://lunar13737.github.io/AI_builder_productitivity_0524/**

本仓库由 monorepo [`AI4Science-WestlakeU/BA2026Pre`](https://github.com/AI4Science-WestlakeU/BA2026Pre) 的 `projects/BuildArena_commercial_share` 子目录拆出来独立部署。项目 brief 与开发宪法仍在原 monorepo：

- 项目 Brief：[PROJECT-BRIEF.md](./PROJECT-BRIEF.md)
- 通用宪法：原 monorepo `docs/dev-protocol/`

---

## 快速运行

前置环境：

- Node.js `>=20`（CI 用 22）
- pnpm `9.12.3`

```bash
pnpm install
pnpm dev
```

默认地址：`http://localhost:5173/AI_builder_productitivity_0524/`

> 注意：因为 `vite.config.ts` 把 `base` 设成了 `/AI_builder_productitivity_0524/`，本地开发也必须从这个子路径访问。访问 `http://localhost:5173/` 会拿不到资源。

导航：

- `←` / `→` / `Space` 翻页
- `Home` / `End` 跳到首尾页
- URL hash 使用 `#/slide/<id>`

---

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

---

## 部署到 GitHub Pages

**Live**：https://lunar13737.github.io/AI_builder_productitivity_0524/

**机制**：push 到 `main` 自动触发 `.github/workflows/deploy.yml`，跑 `build → upload → deploy`，约 50 秒上线。

### 日常提交流程

```bash
# 1. 改代码
# 2. 本地自检（可选但推荐）
pnpm build

# 3. 提交并推送
git add -A
git commit -m "[update] xxx"
git push
```

push 完之后，三种方式跟进进度：

```bash
# (a) 本地 watch
gh run watch --repo Lunar13737/AI_builder_productitivity_0524

# (b) 看最近一次状态
gh run list --repo Lunar13737/AI_builder_productitivity_0524 --limit 1

# (c) 网页
# https://github.com/Lunar13737/AI_builder_productitivity_0524/actions
```

CI 通过后 30 秒内站点更新；浏览器要 **Cmd+Shift+R** 强刷绕过缓存。

### 手动触发部署

不改代码也想重跑（例如改了仓库 Settings、Pages 配置）：

```bash
gh workflow run "Deploy to GitHub Pages" --repo Lunar13737/AI_builder_productitivity_0524
```

或网页：Actions → `Deploy to GitHub Pages` → `Run workflow`。

### Workflow 概览

`.github/workflows/deploy.yml`：

- pnpm `9.12.3` + Node `22`
- `pnpm install --frozen-lockfile` → `pnpm build` → 上传 `dist/` → 用 `actions/deploy-pages@v4` 部署
- 两个 job：`build`（~33s） + `deploy`（~16s）
- `permissions.id-token: write` 必需（Pages 走 OIDC）
- `concurrency: pages` + `cancel-in-progress`：连续 push 时只跑最新的那个

### 首次启用 Pages（只做一次）

新建仓库第一次 push 之前 / 之后，必须启用 Pages，否则 `configure-pages` 步骤会 404。两种方式：

```bash
# CLI（推荐，幂等）
gh api -X POST /repos/Lunar13737/AI_builder_productitivity_0524/pages \
  -H "Accept: application/vnd.github+json" \
  -f build_type=workflow
```

或网页：`Settings` → `Pages` → `Source: GitHub Actions`。

---

## 避坑指南

部署到 GitHub Pages **子路径**（`/AI_builder_productitivity_0524/`）有几个反直觉的雷点，按出现频率排：

### 1. 公共资源路径必须走 `asset()` helper

**❌ 错误**（部署后 404）：
```ts
{ src: "/assets/images/foo.png" }
```

**✅ 正确**：
```ts
import { asset } from "@/utils/asset";
{ src: asset("assets/images/foo.png") }
```

**为什么**：Vite 的 `base` 配置 **只会自动改写 `index.html`** 里的绝对路径。JS/TS/JSX 里手写的字符串字面量 `"/assets/..."` 不会被加前缀，部署后变成 `https://lunar13737.github.io/assets/foo.png`（缺了 `/AI_builder_productitivity_0524/`）→ 404。

`src/utils/asset.ts` 用 `import.meta.env.BASE_URL` 在编译期把前缀拼进去：

```ts
export function asset(path: string): string {
  const trimmed = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${trimmed}`;
}
```

**Code review 清单**：搜 `[\"'(]/assets/`，看看有没有漏网之鱼。

### 2. CSS 里的 `url(...)` 必须硬编码 base 前缀

CSS 拿不到 env 变量，所以：

```css
/* ❌ 部署后 404 */
background: url("/assets/images/header.png");

/* ✅ 部署后正常 */
background: url("/AI_builder_productitivity_0524/assets/images/header.png");
```

**如果以后改仓库名**（=改 `base`），CSS 里这些前缀要全局搜替手动同步。当前只有 `src/components/slides/_custom/BuildArenaShowcase/BuildArenaShowcase.module.css` 4 处。

更彻底的方案：把 CSS 引用的图片从 `public/` 挪到 `src/assets/`，在 JS 里 `import` 后用 CSS variable 注入。简单场景不值当。

### 3. `vite.config.ts` 的 `base` 必须 = 仓库子路径

```ts
// vite.config.ts
base: "/AI_builder_productitivity_0524/",  // 带前后斜杠
```

URL 规则：`https://<user>.github.io/<repo>/` → `base = "/<repo>/"`

**改仓库名时要同步改的地方**：
1. `vite.config.ts` 里的 `base`
2. `BuildArenaShowcase.module.css` 里硬编码的 4 处前缀
3. README 里所有 URL（你正在看的这个文件）

### 4. `dist/` 不进仓库

`.gitignore` 已排除。Pages 由 Actions 部署，CI 自己 build，本地 build 产物不要 commit：会污染 diff、占空间、hash 不一致。

如果不小心提交了：
```bash
git rm -r --cached dist
git commit -m "[fix] untrack dist"
```

### 5. CI 失败 → 先看 lockfile

工作流用 `pnpm install --frozen-lockfile`。如果你改了 `package.json` 但忘了 commit 同步过的 `pnpm-lock.yaml`，CI 第一时间挂在 install 阶段。

```bash
# 本地修复
pnpm install            # 让 lockfile 同步
git add pnpm-lock.yaml
git commit -m "[chore] sync lockfile"
git push
```

### 6. 浏览器缓存

CSS/JS 文件名带 hash（`index-XXX.css`），改完会自动生效。但：

- `index.html` 不带 hash → 浏览器可能用旧的
- `public/` 里的 GIF / MP4 / PNG 不带 hash → 资源换内容但同名，浏览器也用旧的

解决：让用户 **Cmd+Shift+R** 强刷；或者改资源时顺便改文件名（如 `bridge_v2.gif`）。

### 7. 仓库体积

`public/assets/` 有视频和 GIF，首次 push 上百 MB。如果资源会频繁更新：

- 体积可控（< 500 MB）：保留在 git 里，接受 push 慢
- 体积大或更新频繁：挂 CDN（七牛 / Cloudflare R2 / 阿里 OSS），改 `asset()` helper 返回 CDN URL
- **不要**用 Git LFS 配合 Pages —— Pages 不会展开 LFS 指针文件，会 serve 出乱码

### 8. 私有仓库 + 免费账号 ≠ Pages

GitHub 免费账号只允许 **public** 仓库启用 Pages。私有仓库要 Pages 需要 GitHub Pro / Team / Enterprise。本仓库是 public。

### 9. Pages 404 排查顺序

如果某个 URL 404，按这个顺序查：

1. 文件名拼写（`construction_brige` vs `construction_bridge`——本项目 GIF 实际叫 `_brige`，typo 但已固化）
2. 文件是否真的在 `public/assets/` 下：`ls public/assets/images/`
3. 路径是否带 base 前缀：`curl -sI <URL>` 看 200/404
4. Actions 最近一次跑成功了没：`gh run list --limit 1`
5. 浏览器是不是缓存：开无痕窗口验证

---

## 可变区入口

| 文件 | 用途 | Brief 锚点 |
|------|------|------------|
| `src/deck/deck.config.ts` | deck 级配置 | §0 / §3 / §6 |
| `src/deck/slides.ts` | slide 数据 SSOT | §0.slide-decisions / §2 |
| `src/components/slides/_custom/BuildArenaShowcase/` | 沉浸式 custom slide | §13.exemption-1 |
| `src/theme/tokens.css` | theme token 值 | §4 / §5 / §6 |
| `src/utils/asset.ts` | 公共资源 URL helper（**必读**） | — |
| `public/assets/` | BuildArena 素材 | §8 |
| `vite.config.ts` | `base` 必须与仓库名一致 | — |
| `.github/workflows/deploy.yml` | Pages 部署工作流 | — |

---

## 项目结构

```text
AI_builder_productitivity_0524/
├── .github/workflows/deploy.yml   # Pages 部署
├── PROJECT-BRIEF.md
├── README.md
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts                 # base = /AI_builder_productitivity_0524/
├── index.html
├── public/
│   └── assets/                    # 图片 / 视频 / GIF
├── src/
│   ├── deck/                      # slides.ts (SSOT)
│   ├── schema/
│   ├── components/
│   │   └── slides/_custom/BuildArenaShowcase/
│   ├── theme/
│   └── utils/
│       └── asset.ts               # 公共资源 URL helper
├── tests/                         # Vitest
└── e2e/                           # Playwright 视觉回归
```

---

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
