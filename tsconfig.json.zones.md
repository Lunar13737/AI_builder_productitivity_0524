# tsconfig.json 三区映射

## 保守区（CONSERVATIVE）

`compilerOptions` 中的以下字段 **MUST NOT** 修改（修改需走 dev-protocol/07 §2.1 修订）：

- `strict: true`
- `noImplicitOverride: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedIndexedAccess: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `useUnknownInCatchVariables: true`
- `isolatedModules: true`
- `forceConsistentCasingInFileNames: true`
- `module: "ESNext"`
- `moduleResolution: "Bundler"`
- `jsx: "react-jsx"`

`include` / `exclude` 列表 = 保守。新增源码目录 **MUST** 走 dev-protocol/03-steps/03 修订。

## 可变区（VARIABLE）

- `target` / `lib`：可在 Brief §9 确认浏览器矩阵后调整（如需兼容 ES2020）。`[REQ-REF: §9.1]`
- `paths` 别名：可按项目需要扩展。
- `exactOptionalPropertyTypes`：默认 `false`；项目 **MAY** 启用并升级所有可选字段写法。

## 注释区

- 无（JSON 本体；本伴生文件即注释区）。
