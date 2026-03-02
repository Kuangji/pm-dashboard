# PM Dashboard

产品文档与原型展示平台 - 用于托管和展示从 `drafts/publish/` 同步的业务内容。

## 架构

```
pm-workspace/
├── drafts/publish/           # 内容生产（业务文档、Demo）
│   ├── documents/            # Markdown 文档
│   └── demos/                # 构建后的 Demo
│
└── pm-dashboard/             # 内容展示平台（本仓库）
    ├── docs/                 # 平台自身文档
    ├── public/content/docs   # 同步后的业务文档
    ├── public/demos-raw/     # 同步后的 Demo
    └── scripts/
        ├── sync-content.ts       # 从 drafts 拉取内容
        └── generate-manifest.ts  # 生成导航 manifest
```

## 职责边界

| 职责 | drafts | pm-dashboard |
|------|--------|--------------|
| 内容生产 | ✅ 业务文档、Demo 源码 | ❌ |
| 内容输出 | ✅ `publish/` 目录 | ❌ |
| 平台功能 | ❌ | ✅ Next.js 应用 |
| 平台文档 | ❌ | ✅ `docs/` 目录 |
| 内容消费 | ❌ | ✅ sync + manifest |

## 常用命令

```bash
# 同步内容（从 drafts/publish 拉取）
npm run sync

# 开发模式（自动同步并启动）
npm run dev

# 构建
npm run build
```

## 平台文档

- [架构设计](./docs/pm-dashboard-architecture.md)
- [使用指南](./docs/user-guide.md)

## 技术栈

- **框架**: Next.js 16 + App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **Markdown**: react-markdown + remark-gfm
