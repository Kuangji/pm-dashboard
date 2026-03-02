---
title: PM Dashboard 架构设计
created: 2026-02-27
author: 匡济
tags: [架构, Dashboard, Next.js]
---

# PM Dashboard 架构设计

## 概述

PM Dashboard 是一个基于 Next.js 的产品文档与原型展示系统，采用**手动挑选 + 构建同步**的架构模式。

## 核心原则

1. **内容与展示解耦** - 内容由 `drafts/publish/` 管理，展示层完全独立
2. **显式控制** - 通过 `manifest.json` 显式声明要展示的内容
3. **单向同步** - 构建脚本只复制文件，不修改 Dashboard 代码
4. **静态导出** - 生产环境为纯静态站点，可部署到任意托管服务

## 架构图

```
drafts/publish/              # 内容层（手动维护）
├── manifest.json            # 导航结构与元数据
├── documents/               # Markdown 文档
└── demos/                   # Demo 静态文件
          ↓
     构建同步 (npm run sync)
          ↓
pm-dashboard/
├── app/                     # Next.js 应用
│   ├── page.tsx             # 仪表盘首页
│   ├── docs/                # 文档页面
│   ├── demos/               # Demo 列表
│   └── components/          # 共享组件
├── content/                 # 同步后的内容
├── public/demos/            # Demo 静态文件
└── dist/                    # 构建输出
```

## 目录结构

### 内容层 (drafts/publish/)

| 路径 | 用途 |
|------|------|
| `manifest.json` | 导航配置、元数据、路由定义 |
| `documents/` | Markdown 文档，按分类组织 |
| `demos/` | Demo 静态构建产物 |

### 展示层 (pm-dashboard/)

| 路径 | 用途 |
|------|------|
| `app/page.tsx` | 仪表盘首页，显示统计卡片 |
| `app/docs/page.tsx` | 文档列表页 |
| `app/docs/[slug]/page.tsx` | 文档详情页 (SSG) |
| `app/demos/page.tsx` | Demo 列表页 |
| `app/components/Sidebar.tsx` | 侧边导航 |
| `app/components/MarkdownViewer.tsx` | GitHub 风格 Markdown 渲染 |
| `scripts/sync-content.ts` | 内容同步脚本 |

## Manifest 格式

```json
{
  "version": "1.0.0",
  "updatedAt": "2026-02-27T00:00:00Z",
  "navigation": {
    "documents": [
      {
        "id": "category-id",
        "title": "分类标题",
        "category": "分类名",
        "items": [
          {
            "slug": "doc-slug",
            "title": "文档标题",
            "file": "相对路径/file.md",
            "tags": ["标签"],
            "created": "2026-02-27",
            "updated": "2026-02-27"
          }
        ]
      }
    ],
    "demos": [
      {
        "id": "demo-id",
        "title": "Demo 标题",
        "description": "描述",
        "path": "demos/demo-id",
        "thumbnail": "/demos/demo-id/thumb.png",
        "tags": ["标签"]
      }
    ]
  }
}
```

## 技术栈

- **框架**: Next.js 16 + App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **Markdown**: react-markdown + remark-gfm + rehype-highlight
- **图标**: lucide-react

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 仪表盘 | 显示文档/Demo/分类统计 |
| `/docs/` | 文档列表 | 按分类展示文档 |
| `/docs/[slug]/` | 文档详情 | Markdown 渲染，代码高亮 |
| `/demos/` | Demo 列表 | 卡片式展示 |
| `/demos/[id]/` | Demo 页面 | 静态文件直接访问 |

## 构建流程

```bash
# 1. 同步内容
npm run sync
# - 复制 manifest.json → content/
# - 复制 documents/* → content/docs/
# - 复制 demos/* → public/demos/

# 2. 开发预览
npm run dev

# 3. 生产构建
npm run build
# 生成 dist/ 目录，包含完整静态站点
```

## 设计决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 内容管理 | 手动 manifest.json | 显式控制，避免意外暴露 |
| Demo 托管 | public/demos/ 静态文件 | Next.js 原生支持，无路径问题 |
| 渲染模式 | SSG (静态生成) | 利于部署，无需服务器 |
| Markdown 引擎 | react-markdown | 完整的 GFM 支持，可扩展 |
| 同步策略 | 单向复制 | Dashboard 代码稳定，内容独立 |

## 隐私与安全

- 只有 `publish/` 目录下的内容会被同步
- 通过 `manifest.json` 显式控制哪些内容对外可见
- 静态导出无服务端逻辑，无注入风险

## 未来扩展

- [ ] 全文搜索 (使用 flexsearch 或类似方案)
- [ ] 深色模式切换
- [ ] 文档版本历史
- [ ] 多语言支持
- [ ] PDF 导出
