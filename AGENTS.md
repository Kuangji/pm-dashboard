# PM Dashboard - Codex 工作约定

## 项目概述

这是一个产品管理仪表板，用于管理和展示产品文档与原型 Demo。

- 框架：Next.js 16 + React 19 + TypeScript
- 样式：Tailwind CSS v4 + shadcn/ui
- 图标：Lucide React

## 项目定位

这是一个个人内容发布平台，不是团队协作工具。

- 核心用途：沉淀和展示个人产品工作内容
- 目标受众：外部访问者，例如同事、合作伙伴、面试官
- 内容形态：产品文档、调研报告、可交互原型 Demo
- 设计原则：简洁、快速、内容优先，不引入复杂协作能力

## 常用命令

```bash
# 开发模式（启动前会自动同步内容）
npm run dev

# 构建
npm run build

# CI 构建
npm run build:ci

# 同步内容
npm run sync

# 仅同步文档内容
npm run sync-content

# 仅生成 manifest
npm run generate-manifest

# Lint
npm run lint
```

## 项目结构

```text
app/
  components/    # 应用级组件
  docs/          # 文档页面路由
  demos/         # Demo 页面路由
  lib/           # 应用工具函数
  settings/      # 设置页面
  globals.css    # 全局样式
  layout.tsx     # 根布局
  page.tsx       # 首页仪表盘

components/
  ui/            # shadcn/ui 组件

content/         # Markdown 内容源文件
  documents/     # 文档文件
  demos/         # Demo 文件

docs/            # 平台文档
public/          # 静态资源
public/demos-raw/# 同步后的 Demo 文件
scripts/         # 同步和构建辅助脚本
```

## 内容管理

内容源文件位于 `content/` 目录。

1. 文档放在 `content/documents/`
2. Demo 放在 `content/demos/`
3. 导航结构由内容清单和生成脚本维护

修改 `content/` 下内容后，必须运行 `npm run sync`，否则应用展示内容不会更新。

同步脚本会将内容复制或生成到应用消费目录，例如 `public/demos-raw/` 等位置。修改同步逻辑时，优先检查 `scripts/` 下的生成链路。

## 开发约束

### 组件

- 优先复用现有 shadcn/ui 组件和仓库内已有组件模式
- 新组件优先放在 `app/components/` 或 `components/ui/`
- 除非有明确收益，不引入新的 UI 依赖

### 样式

- 使用 Tailwind CSS v4 语法
- 维持当前项目的简洁、内容优先视觉方向
- 做样式调整时，优先保持已有页面结构和视觉语言一致

### 图标

- 使用 `lucide-react`

## Agent 工作方式

- 先理解上下文再修改代码；涉及多文件或行为变化时，先给出简短计划
- 优先做小而明确的改动，避免无关重构
- 遇到 bug 或失败构建时，先定位根因，再修复，不做表面补丁
- 修改会影响内容展示时，检查是否需要运行 `npm run sync`
- 完成前做最小充分验证，优先运行与改动直接相关的命令
- 若发现仓库中已有未提交改动，默认不要回滚它们，除非用户明确要求

## 验证与交付

- 能本地验证的改动，至少运行相关命令并确认结果
- 前端或内容展示相关改动，必要时补充构建、lint 或页面级验证
- 汇报结果时，说明改了什么、验证了什么、还有什么未验证

## 迁移说明

本文件是面向 Codex 的仓库级说明。原有 `CLAUDE.md` 保留用于兼容其他工具，但在本仓库内执行任务时，应优先遵循本文件中的项目约束和工作约定。
