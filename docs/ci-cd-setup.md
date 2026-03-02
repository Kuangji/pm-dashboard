# CI/CD 自动同步配置

本文档说明如何配置 CI/CD 自动同步 drafts 仓库内容。

## 架构说明

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   drafts 仓库    │────▶│  pm-dashboard CI │────▶│   部署的网站     │
│  (内容源文件)    │     │  (构建 + 同步)    │     │  (public/内容)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## 本地开发（保持现状）

本地开发时直接读取本地的 drafts 目录：

```bash
npm run dev
```

这会执行：
1. 从 `/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/publish/` 同步内容
2. 生成 manifest.json
3. 启动 Next.js 开发服务器

## CI/CD 配置

### 方案一：Vercel 部署（推荐）

在 Vercel 控制台配置以下环境变量：

```
DRAFTS_REPO_URL=https://github.com/your-username/drafts.git
DRAFTS_BRANCH=main  # 可选，默认 main
```

然后在 `vercel.json` 中已经配置了：

```json
{
  "buildCommand": "bash scripts/ci-build.sh"
}
```

Vercel 会在每次部署时：
1. 克隆 drafts 仓库到临时目录
2. 执行内容同步
3. 生成 manifest
4. 构建 Next.js 应用

### 方案二：GitHub Actions

如果需要在 GitHub Actions 中构建，使用已配置的 workflow：

```yaml
# .github/workflows/deploy.yml
```

需要配置以下 Secrets：

- `VERCEL_TOKEN` - Vercel API Token
- `VERCEL_ORG_ID` - Vercel 组织 ID
- `VERCEL_PROJECT_ID` - Vercel 项目 ID

### 方案三：其他 CI 平台

在其他 CI 平台（如 GitLab CI、CircleCI）中，设置环境变量后运行：

```bash
export DRAFTS_REPO_URL=https://github.com/your-username/drafts.git
export DRAFTS_BRANCH=main
npm run build:ci
```

或者手动执行步骤：

```bash
# 1. 克隆 drafts 仓库
git clone --depth 1 --branch main $DRAFTS_REPO_URL /tmp/drafts

# 2. 同步内容
DRAFTS_ROOT=/tmp/drafts/publish npm run sync

# 3. 构建
next build
```

## 环境变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `DRAFTS_ROOT` | drafts 仓库 publish 目录的绝对路径 | 本地开发路径 |
| `DRAFTS_REPO_URL` | drafts 仓库 URL | 无（CI 必需） |
| `DRAFTS_BRANCH` | drafts 分支名 | `main` |
| `DRAFTS_TMP_DIR` | CI 克隆临时目录 | `/tmp/drafts-clone` |

## 自动触发构建（可选）

如需在 drafts 提交后自动触发 pm-dashboard 构建：

### 方案 A：Vercel Deploy Hook

1. 在 Vercel 项目中创建 Deploy Hook
2. 在 drafts 仓库添加 post-commit hook：

```bash
#!/bin/bash
# drafts/.git/hooks/post-commit
curl -X POST "https://api.vercel.com/v1/integrations/deploy/YOUR_DEPLOY_HOOK"
```

### 方案 B：GitHub Actions Repository Dispatch

在 drafts 仓库添加 GitHub Actions workflow：

```yaml
name: Trigger Dashboard Deploy

on:
  push:
    branches: [main]

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger pm-dashboard build
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.PAT_TOKEN }}
          repository: your-username/pm-dashboard
          event-type: drafts-updated
```

然后在 pm-dashboard 添加对应的触发 workflow。

## 测试 CI 构建

在本地模拟 CI 构建：

```bash
# 1. 设置环境变量
export DRAFTS_REPO_URL=https://github.com/your-username/drafts.git

# 2. 运行 CI 构建
npm run build:ci
```

## 常见问题

### Q: 同步失败，提示找不到目录
A: 检查 `DRAFTS_ROOT` 指向的目录结构是否正确，确保包含 `documents/` 和 `demos/` 子目录。

### Q: CI 构建成功但内容未更新
A: 检查 drafts 仓库是否正确推送到远程，以及 CI 是否正确克隆了最新版本。

### Q: 如何排除某些文件同步？
A: 在 `scripts/sync-content.ts` 中的 `syncDirectory` 函数添加过滤逻辑。
