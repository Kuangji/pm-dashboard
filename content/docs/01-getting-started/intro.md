---
title: 使用指南
author: 匡济
created: 2026-02-27
tags: [指南, 入门]
---

# 使用指南

欢迎使用 PM Dashboard！

## 目录

## 快速开始

1. **添加文档**：将 Markdown 文件放入 `drafts/publish/documents/`
2. **配置导航**：在 `manifest.json` 中添加文档条目
3. **同步内容**：运行 `npm run sync`
4. **预览**：运行 `npm run dev`

## Markdown 支持

### 代码块

```typescript
function hello() {
  console.log('Hello, PM Dashboard!')
}
```

### 表格

| 功能 | 状态 | 说明 |
|------|------|------|
| 文档展示 | ✅ | 已上线 |
| Demo 托管 | ✅ | 已上线 |
| 搜索功能 | ⏳ | 开发中 |

### 任务列表

- [x] 项目初始化
- [x] 文档页面
- [x] Demo 页面
- [ ] 搜索 API
- [ ] 深色模式

## 链接

- [返回首页](/)
- [查看 Demos](/demos/)
