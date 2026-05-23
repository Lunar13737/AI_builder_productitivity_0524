# `_custom/` — 逃生口模板

> dev-protocol/04 §5、05 §3、12 §1。

## 什么时候用 custom slide

当 9 种标准类型（title / section / content / image / quote / code / comparison / timeline / closing）都表达不了**且**该需求短期不会上升为新标准类型时。

**MUST** 在 `PROJECT-BRIEF.md` §13 三区豁免登记表中先登记理由，再实现。

## 如何新增一个 custom slide

1. 复制 `_custom-slide.template.tsx` 到 `<ComponentKey>/` 子目录下，重命名相关文件；
2. 实现：
   - `<ComponentKey>/<ComponentKey>.tsx`
   - `<ComponentKey>/<ComponentKey>.module.css`
   - `<ComponentKey>/<ComponentKey>.schema.ts`（Zod props schema）
   - `<ComponentKey>/<ComponentKey>.test.tsx`（至少 schema 边界）
3. 在 `registry.ts` 的可变区 `customSlideRegistry` 中 import 并注册；
4. 在 `src/deck/slides.ts` 中用 `{ type: "custom", componentKey: "...", props: {...}, reqRef: "§13.exemption-N" }`；
5. `pnpm check` 全绿；
6. `pnpm test:visual:update`。

## 当前注册项

| componentKey | 组件路径 | propsSchema | Brief §13 锚点 |
|--------------|----------|-------------|-----------------|
| _(无)_ | | | |
