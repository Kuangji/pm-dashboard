# 移动端响应式支持设计文档

**日期**：2026-03-12
**状态**：已批准

---

## 背景

PM Dashboard 目前是桌面优先设计，移动端适配几乎缺失（响应式评分约 2/10）。主要问题：

- 主侧边栏（`w-64`）和文档目录侧边栏（`w-72`）在移动端占据屏幕 50%+ 空间，内容区无法正常阅读
- 文档内容区宽度锁死（`max-w-[1012px]`），移动端无法优化利用屏幕
- Markdown 表格无横向滚动，移动端溢出
- 全站内边距固定，小屏上浪费空间

**目标**：以最小改动代价，使整个应用在移动设备（320px+）上可正常使用。

---

## 技术选型

**shadcn/ui Sheet + Collapsible**，理由：
- 项目已集成 shadcn/ui（New York 风格，Zinc 主题），直接安装对应组件即可
- Sheet 组件自带无障碍支持（焦点陷阱、ESC 关闭、遮罩层）
- Collapsible 组件处理 TOC 折叠逻辑，无需手写动画

**断点**：统一使用 Tailwind `md:`（768px）作为桌面/移动分界线。

---

## 组件设计

### 1. 主导航 Drawer

**行为**：
- 移动端（`< md`）：侧边栏隐藏，顶部出现固定 Header，含 Logo 和汉堡菜单按钮（`Menu` 图标）
- 点击汉堡菜单：从左侧滑入 Sheet，内容与现有 `Sidebar` 完全一致
- Sheet 外点击遮罩或按 ESC：关闭
- 桌面端（`≥ md`）：保持现有固定侧边栏，Header 不显示

**状态管理**：
`app/layout.tsx` 是 Server Component，无法持有 `useState`。需新增一个 Client 包装组件 `MobileNav.tsx`（`'use client'`），由它持有 `isOpen` 状态，同时渲染 `MobileHeader` 和 Sheet。`layout.tsx` 只引入 `MobileNav`，自身保持 Server Component。

**路由切换自动关闭**：
`MobileNav.tsx` 内通过 `usePathname()` 监听路由变化，路由变化时调用 `setIsOpen(false)`，确保跳转后 Drawer 自动关闭。

**新增文件**：
- `app/components/MobileNav.tsx`：Client 组件，持有 `isOpen` 状态，包含 `MobileHeader` + Sheet（Drawer 内容）；通过 `usePathname` 监听路由自动关闭
- `app/components/MobileHeader.tsx`：移动端顶部 Header，含 Logo 和汉堡菜单按钮，接收 `onMenuOpen` 回调

**修改文件**：
- `app/layout.tsx`：移动端隐藏 `<Sidebar />`，新增 `<MobileNav />`；主内容区移动端 `ml-0`，桌面端 `md:ml-64`（与侧边栏 `w-64` 对齐）
- `app/components/Sidebar.tsx`：提取导航链接列表为独立子组件 `SidebarLinks`，供桌面侧边栏和 `MobileNav` 的 Sheet 复用

### 2. 文档 TOC 折叠

**行为**：
- 桌面端（`≥ md`）：保持现有左侧固定栏（`w-72`），不变
- 移动端（`< md`）：
  - 文档导航树（即 `DocsSidebarClient` 渲染的 manifest 导航内容）移至内容上方，独占全宽
  - **"条目数"计算基准**：对 manifest 导航树做扁平化遍历，统计所有**叶子文件节点**（不含目录分组节点）的总数
  - **条目 ≤ 10 条**：全部常驻显示，无折叠按钮
  - **条目 > 10 条**：前 10 条叶子节点（按树形顺序）常驻，第 11 条起默认折叠；底部出现「展开全部目录」按钮，展开后变为「收起目录」
  - 使用 shadcn/ui `Collapsible` 实现折叠动画

**修改文件**：
- `app/docs/layout.tsx`：移动端改为单列（`flex-col md:flex-row`），TOC 在内容上方
- `app/components/DocsSidebarClient.tsx`：新增移动端 TOC 渲染分支，集成 `Collapsible`

### 3. 响应式间距

全站内边距在移动端缩小：

| 文件 | 原样式 | 新样式 |
|---|---|---|
| `app/docs/layout.tsx` 内层容器（`max-w-[1012px]` 所在 `div`） | `max-w-[1012px] mx-auto px-8 py-8` | `max-w-full md:max-w-[1012px] mx-auto px-4 py-4 md:px-8 md:py-8` |
| `app/page.tsx` | `px-6` | `px-4 md:px-6` |
| `app/demos/page.tsx` | `px-6` | `px-4 md:px-6` |
| `app/settings/page.tsx` | `px-6` | `px-4 md:px-6` |

### 4. 内容渲染修复

- `app/components/MarkdownViewer.tsx`：在全局 `<style>` 块中为表格添加包裹处理——在 `.markdown-body` 的 CSS 中加入 `.markdown-body table { display: block; overflow-x: auto; }`，使表格元素自身可横向滚动，避免外层容器 overflow 被其他样式覆盖
- `app/components/CodeViewer.tsx`：代码块 padding 改为 `p-3 md:p-4`

---

## 依赖安装

```bash
npx shadcn@latest add sheet collapsible
```

---

## 不在本次范围内

- 图片/视频预览的移动端优化（`ImageViewer.tsx`、Demo 缩略图）
- Markdown 代码高亮字体大小调整
- 平板端（768px–1024px）的精细优化

---

## 验证方式

1. 安装依赖后运行 `npm run dev`
2. 用 Chrome DevTools 切换到移动端模拟器（375px、390px、428px）
3. 检查各页面：
   - [ ] 首页：侧边栏隐藏，顶部 Header 出现，汉堡菜单可打开/关闭 Drawer
   - [ ] 文档页：单列布局，TOC 在内容上方，超 10 条时折叠按钮正常工作
   - [ ] Demos 页：卡片单列，内边距正常
   - [ ] 设置页：内容正常显示，无水平溢出
   - [ ] Markdown 内容：长表格可横向滚动
4. 桌面端（≥ 768px）验证无回归
   - [ ] 桌面端侧边栏、文档 TOC 布局与改动前一致
5. Sheet 交互验证
   - [ ] Drawer 打开时背景内容不可滚动（shadcn/ui Sheet 默认处理，确认生效）
   - [ ] 在 Drawer 内点击导航链接跳转后，Drawer 自动关闭
