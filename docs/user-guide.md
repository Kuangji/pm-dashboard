---
title: PM Dashboard 使用指南
created: 2026-02-27
author: 匡济
tags: [指南, 使用说明]
---

# PM Dashboard 使用指南

## 快速开始

### 1. 添加新文档

```bash
# 1. 创建文档目录（按分类组织）
mkdir -p /Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/publish/documents/02-feature-name

# 2. 编写 Markdown 文档
cat > /Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/publish/documents/02-feature-name/spec.md << 'EOF'
---
title: 功能规格说明
created: 2026-02-27
tags: [PRD, 功能名]
---

# 功能规格说明

## 背景

...

## 需求

...
EOF

# 3. 更新 manifest.json
# 在 navigation.documents 中添加新条目
```

### 2. 添加新 Demo

```bash
# 1. 构建你的 Demo（以 Next.js 为例）
cd /Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/06_Prototypes/my-demo
npm run build

# 2. 复制构建产物到 publish
cp -r dist /Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/publish/demos/my-demo

# 3. 更新 manifest.json
# 在 navigation.demos 中添加新条目
```

### 3. 更新 Manifest

编辑 `/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/publish/manifest.json`：

```json
{
  "version": "1.0.0",
  "updatedAt": "2026-02-27T12:00:00Z",
  "navigation": {
    "documents": [
      {
        "id": "feature-name",
        "title": "功能名称",
        "category": "功能设计",
        "items": [
          {
            "slug": "feature-spec",
            "title": "功能规格说明",
            "file": "02-feature-name/spec.md",
            "tags": ["PRD", "功能名"],
            "created": "2026-02-27"
          }
        ]
      }
    ],
    "demos": [
      {
        "id": "my-demo",
        "title": "功能演示",
        "description": "交互式功能演示",
        "path": "demos/my-demo",
        "tags": ["Next.js"]
      }
    ]
  }
}
```

### 4. 同步与预览

```bash
cd /Users/yukuangji/Work/NoxInfluencer/pm-workspace/pm-dashboard

# 同步内容
npm run sync

# 开发预览
npm run dev

# 访问 http://localhost:3000
```

### 5. 构建部署

```bash
# 生产构建
npm run build

# dist/ 目录包含完整静态站点
# 可部署到 Vercel、Netlify、GitHub Pages 等
```

## 目录规范

### 文档目录

```
publish/documents/
├── 00-dashboard/              # 编号 + 分类名
│   ├── architecture.md
│   └── user-guide.md
├── 01-monitor-760/            # 功能代号
│   ├── prd.md
│   ├── design.md
│   └── research.md
└── 02-brand-analysis/         # 功能代号
    └── report.md
```

编号规则：
- `00-`: 元文档（关于 Dashboard 本身）
- `01-`, `02-`: 按优先级或时间排序的功能

### Demo 目录

```
publish/demos/
├── monitor-760-next/          # Next.js 构建输出
│   ├── index.html
│   └── _next/
└── content-monitor-vanilla/   # 原生 HTML
    ├── index.html
    ├── css/
    └── js/
```

## Markdown 支持

Dashboard 支持完整的 GitHub Flavored Markdown：

### 代码块

```typescript
function example() {
  return 'Hello World'
}
```

### 表格

| 功能 | 状态 | 说明 |
|------|------|------|
| 文档展示 | ✅ | 已上线 |
| Demo 托管 | ✅ | 已上线 |

### 任务列表

- [x] 已完成任务
- [ ] 待办任务

### 目录

在文档开头添加 `## 目录`，会自动生成。

### Frontmatter

```yaml
---
title: 文档标题
created: 2026-02-27
updated: 2026-02-27
author: 作者名
tags: [标签1, 标签2]
---
```

## 命令参考

| 命令 | 说明 |
|------|------|
| `npm run sync` | 同步 publish/ 内容到 dashboard |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm start` | 启动生产服务器 |

## 故障排除

### 文档不显示

1. 检查 `manifest.json` 是否包含该文档
2. 检查 `file` 路径是否正确（相对于 `documents/`）
3. 运行 `npm run sync` 查看是否有错误

### Demo 404

1. 检查 Demo 是否已复制到 `publish/demos/`
2. 检查 `manifest.json` 中的 `path` 是否正确
3. 确保 Demo 包含 `index.html`

### 样式丢失

1. 确保 Demo 使用相对路径引用资源
2. 检查 `_next/static/` 路径是否正确

## 工作流示例

### 日常更新文档

```bash
# 1. 编辑文档
vim pm-workspace/drafts/publish/documents/01-monitor-760/prd.md

# 2. 同步并预览
cd pm-workspace/pm-dashboard
npm run sync && npm run dev

# 3. 构建部署
npm run build
```

### 发布新版本

```bash
# 1. 更新版本号
vim pm-workspace/drafts/publish/manifest.json
# 修改 version 和 updatedAt

# 2. 构建
npm run build

# 3. 部署 dist/
```
