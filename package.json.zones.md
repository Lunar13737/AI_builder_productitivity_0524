# package.json 三区映射

> JSON 不支持注释，本伴生文件按 [dev-protocol/12 §2.5](../../dev-protocol/12-templates-and-three-zones.md#25-json不支持注释--用伴生-zonesmd) 描述 `package.json` 的三区映射。

## 保守区（CONSERVATIVE）

- `scripts.*` 的所有**键名**与命令：命令是与 dev-protocol/02 §3 的契约。
  - **MUST NOT** 删除任何键；**MUST NOT** 改键名；**MAY** 微调命令尾部参数（如端口、并发数）。
- `engines.node` 范围。
- `packageManager` 字段（**必须** pnpm）。
- `type: "module"`。
- `private: true`。
- `dependencies` 与 `devDependencies` 的**包名集合**（新增/移除 包需 dev-protocol 评审，详见 [02 §4](../../dev-protocol/02-toolchain-and-commands.md#4-添加或移除依赖)）。

## 可变区（VARIABLE）

- `name`、`description`、`version`、`author`、`license`、`homepage`、`repository`：项目元信息。`[REQ-REF: §元信息]`
- `dependencies.*` 与 `devDependencies.*` 的**版本号**：可升级，但 **MUST** 通过 `pnpm check` 全绿。
- `scripts.*` 命令的 shell **参数尾部**（如 `vite --port 5174`）：在 Brief §9 中确认后调整。

## 注释区（COMMENT）

- 无（本文件即注释区）。
- JSON 文件本体 **MUST NOT** 包含 `_comment` / `__doc__` 等假装注释的字段。

## 升级流程

1. dev-protocol/02 修订（如新增 `pnpm verify`）→ 更新 `scripts` 保守区；
2. 升级依赖大版本：在专门 PR 中改版本号并跑 `pnpm check`；
3. 新增 / 移除依赖：先 dev-protocol/02 评审，再改 `dependencies` 集合。
