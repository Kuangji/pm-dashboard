# PM Dashboard

产品文档与原型展示平台 - 用于托管和展示从 `drafts/publish/` 同步的业务内容。

## 内容目录

```
├── 01-getting-started/  # 快速开始
├── 02-project-documents/  # 项目文档
│   ├── monitor_760/  # Monitor 监控功能
│   └── 支付单暂存和预约发送/
└── 03-research/  # 研究报告
    └── nox_ai_transform_quick_validation/  # Nox AI转型快速验证
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
