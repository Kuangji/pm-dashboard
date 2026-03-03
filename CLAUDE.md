# PM Dashboard - Claude Code 配置

## 项目概述

这是一个产品管理仪表板，用于管理产品文档和原型演示。

- **框架**: Next.js 16 + React 19 + TypeScript
- **样式**: Tailwind CSS v4 + shadcn/ui (New York style, Zinc 主题)
- **图标**: Lucide React

## 项目定位

**个人内容发布平台**，而非团队协作工具。

- **核心用途**：沉淀和展示个人产品工作内容
- **目标受众**：外部访问者（同事、合作伙伴、面试官等）
- **内容形态**：产品文档（PRD、调研报告）+ 可交互原型 Demo
- **设计原则**：简洁、快速、内容优先，不追求复杂的协作功能

## 常用命令

```bash
# 开发模式（会自动同步内容）
npm run dev

# 构建（会自动同步内容）
npm run build

# 仅同步内容
npm run sync

# 仅同步文档
npm run sync-content

# 仅生成清单
npm run generate-manifest
```

## 项目结构

```
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

docs/            # 同步后的文档内容
public/demos-raw/# 同步后的 Demo 文件
scripts/         # 同步脚本
```

## 内容管理

内容源文件位于 `content/` 目录：

1. **文档**: 在 `content/documents/` 添加 Markdown 文件
2. **导航配置**: 编辑 `content/manifest.json` 配置文档导航结构
3. **Demos**: 在 `content/demos/` 添加 Demo 文件

修改内容后需要运行 `npm run sync` 同步到应用目录。

## 开发规范

### 组件

- 优先使用 shadcn/ui 组件
- 新组件放在 `app/components/` 或 `components/ui/`
- 使用 Tailwind CSS 进行样式编写

### 样式

- 使用 Tailwind CSS v4 语法
- 颜色主题基于 Zinc
- 遵循 shadcn/ui 设计规范

### 图标

- 使用 `lucide-react` 图标库

## 注意事项

- 修改 `content/` 中的文件后必须运行 `npm run sync` 才能生效
- 同步脚本会将内容复制到 `docs/` 和 `public/demos-raw/` 目录

## AI 协作工作流

### 1. 规划优先
- 默认进入 plan mode
- 如果事情偏离轨道，立即停止并重新规划，不要硬撑
- 不仅用于开发，也用于验证步骤
- upfront 编写详细规格以减少歧义

### 2. 子代理策略
- 积极使用子代理保持主上下文窗口整洁
- 将研究、探索、并行分析 offload 给子代理
- 复杂问题通过子代理投入更多计算资源
- 每个子代理专注于一个具体方向

### 3. 自我改进循环
- 收到用户的任何纠正后：更新 `tasks/lessons.md` 记录模式
- 为自己编写规则防止同样错误
- 无情地迭代这些教训直到错误率下降
- 会话开始时回顾相关项目的教训

### 4. 完成前验证
- 从不标记任务完成而不证明它工作
- 在适当时对比 main 分支和你修改的行为差异
- 问自己："Staff engineer 会批准这个吗？"
- 运行测试、检查日志、证明正确性

### 5. 追求优雅（平衡）
- 非简单修改：暂停并问"有更优雅的方式吗？"
- 如果修复感觉 hacky："以我现在知道的一切，实现优雅的方案"
- 简单、明显的修复跳过这一步，不要过度工程
- 在呈现之前挑战自己的工作

### 6. 自主 Bug 修复
- 收到 bug 报告时：直接修复，不要问东问西
- 指出日志、错误、失败的测试，然后解决它们
- 不需要用户上下文切换
- 主动修复失败的 CI 测试，不需要被告知怎么做

### 代码任务管理

1. **先规划**：写入 `tasks/todo.md`，包含可勾选项目
2. **验证规划**：开始实现前确认
3. **跟踪进度**：完成时标记项目
4. **解释变更**：每步提供高层次摘要
5. **记录结果**：添加审查部分到 `tasks/todo.md`
6. **捕获教训**：纠正后更新 `tasks/lessons.md`

### 代码核心原则

- **简洁优先**：每个修改尽可能简单，影响最少代码
- **不偷懒**：找到根本原因，不用临时修复，保持资深开发者标准
- **最小影响**：修改只触及必要部分，避免引入 bug
