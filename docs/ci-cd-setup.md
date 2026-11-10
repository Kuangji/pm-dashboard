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

### GitHub Actions 验证

`.github/workflows/deploy.yml` 中的 `Validate dashboard` 只运行测试和生产构建，
不克隆 drafts、不同步内容、不执行第二次部署，也不需要 Vercel secrets。
生产发布由 Vercel 的 Git 集成负责；Actions 成功不等同于部署成功。

### 部署未触发时

1. 用 `git ls-remote origin refs/heads/main` 确认远端提交 SHA。
2. 分别检查该 SHA 的 Actions run 和 `Vercel` commit status。
   GitHub combined status 返回 `pending` 但 `total_count: 0` 时，表示没有状态记录，
   不能据此判断 Vercel 正在部署。
3. 若没有 Vercel 记录，在项目 Settings / Git 确认连接到 `Kuangji/pm-dashboard`，
   生产分支为 `main`，并检查 GitHub Vercel App 的仓库授权及项目 Activity。
4. 可在 Vercel Deployments 使用 Create Deployment，选择 `main` 的目标提交手动发布。
   不要用旧部署的 Redeploy 代替新提交发布，也不要强推 main。

历史 `Deploy to Vercel` workflow 引用了不存在的 `vercel/action-deploy@v1`，
会在 Set up job 阶段失败。该流程已替换为验证流程，不再作为发布入口。

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
