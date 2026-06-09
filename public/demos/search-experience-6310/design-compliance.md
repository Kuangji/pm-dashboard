# 搜索体验 6310 Demo · 设计规范对齐说明

## 规范来源

本 Demo 按工作区最新设计规范使用方式重建视觉层，参考顺序：

1. `../kol2.0-design-specification/README.md`
2. `../kol2.0-design-specification/playbook/design-principles.md`
3. `../kol2.0-design-specification/playbook/tokens.md`
4. `../kol2.0-design-specification/playbook/semantic-tokens.md`
5. `../kol2.0-design-specification/playbook/design-to-code-mapping.md`
6. `../kol2.0-design-specification/playbook/element-ui-alignment.md`
7. `../kol2.0-design-specification/playbook/accessibility.md`

## 已对齐项

- 使用语义 CSS 变量表达视觉标准：`--action-primary`、`--text-primary`、`--bg-page`、`--bg-surface`、`--border-default` 等。
- 桌面框架使用规范尺寸：左侧导航 224px、顶部栏 88px、内容区 `32px 40px 64px`。
- 控件尺寸使用规范层级：32px / 40px / 48px；主要按钮为 48px、14px 圆角、品牌橙色。
- 抽屉使用 640px 右侧面板、50% 遮罩、白色面板和标准内边距。
- 列表结果按表格行体验处理：复杂身份行高度约 80px 以上，hover 使用浅灰状态。
- 保留键盘可见焦点、可读对比度、明确 loading/toast/状态标签语义。

## 剩余风险

- 当前是静态交互 Demo，未接入真实 Element UI 组件；行为只模拟对齐，不代表生产代码组件状态已完全覆盖。
- 当前素材均为文本与 token 化占位，不包含真实频道头像和截图。
