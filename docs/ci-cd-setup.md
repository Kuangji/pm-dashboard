# 部署工作流

本文档说明当前采用的**本地预同步 + Vercel 直接部署**工作流。

## 架构说明

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   drafts 仓库    │────▶│ 本地同步 + 提交   │────▶│  Vercel 部署    │
│  (内容源文件)    │     │  (npm run sync)  │     │  (直接使用)     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## 工作流程

### 本地开发

```bash
# 开发模式（自动同步 + 启动）
npm run dev

# 或手动同步
npm run sync

# 提交同步后的内容
git add public/content/ public/demos/
git commit -m "同步内容更新"

# 推送触发部署
git push
```

### Vercel 部署

Vercel 直接部署仓库中已提交的内容：

```json
// vercel.json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs"
}
```

无需额外的构建脚本，Vercel 原生支持 Next.js Runtime。

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `DRAFTS_ROOT` | drafts 仓库 publish 目录的绝对路径 | `/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/publish` |

## 同步脚本

### 内容同步 (`npm run sync`)

```bash
# 同步内容
npm run sync-content

# 生成清单
npm run generate-manifest

# 完整同步
npm run sync  # 上面两个的组合
```

同步规则：
- `drafts/publish/documents/` → `public/content/docs/`
- `drafts/publish/demos/` → `public/demos/`

## 常见问题

### Q: 同步失败，提示找不到目录
A: 检查 `DRAFTS_ROOT` 指向的目录结构是否正确，确保包含 `documents/` 和 `demos/` 子目录。

### Q: 为什么不用 CI 自动同步？
A: 本地预同步 + 提交的方式更简单可靠：
- 避免 CI 构建时克隆 drafts 仓库的复杂性
- 内容版本与 Dashboard 版本明确对应
- 可本地预览后再部署

### Q: 如何排除某些文件同步？
A: 在 `scripts/sync-content.ts` 中的 `syncDirectory` 函数添加过滤逻辑。
