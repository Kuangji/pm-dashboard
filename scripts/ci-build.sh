#!/bin/bash
#
# CI Build Script for pm-dashboard
#
# 这个脚本在 CI/CD 环境中执行，用于：
# 1. 克隆 drafts 仓库到临时目录
# 2. 执行内容同步
# 3. 生成 manifest
# 4. 构建 Next.js 应用
#
# 环境变量:
#   DRAFTS_REPO_URL - drafts 仓库 URL (必需)
#   DRAFTS_BRANCH   - drafts 分支名 (默认: main)
#   DRAFTS_TMP_DIR  - 临时目录 (默认: /tmp/drafts-clone)
#

set -e

# 默认配置
DRAFTS_BRANCH="${DRAFTS_BRANCH:-main}"
DRAFTS_TMP_DIR="${DRAFTS_TMP_DIR:-/tmp/drafts-clone}"

# 检查必需的环境变量
if [ -z "$DRAFTS_REPO_URL" ]; then
    echo "❌ 错误: DRAFTS_REPO_URL 环境变量未设置"
    echo "   请设置 drafts 仓库的 URL，例如:"
    echo "   export DRAFTS_REPO_URL=https://github.com/username/drafts.git"
    exit 1
fi

echo "🚀 开始 CI 构建流程..."
echo ""
echo "📦 Drafts 仓库: $DRAFTS_REPO_URL"
echo "🌿 分支: $DRAFTS_BRANCH"
echo "📁 临时目录: $DRAFTS_TMP_DIR"
echo ""

# 清理并克隆 drafts 仓库
echo "🔽 克隆 drafts 仓库..."
rm -rf "$DRAFTS_TMP_DIR"
git clone --depth 1 --branch "$DRAFTS_BRANCH" "$DRAFTS_REPO_URL" "$DRAFTS_TMP_DIR"

if [ $? -ne 0 ]; then
    echo "❌ 克隆 drafts 仓库失败"
    exit 1
fi

echo "✅ 克隆完成"
echo ""

# 同步内容
echo "🔄 同步内容..."
DRAFTS_ROOT="$DRAFTS_TMP_DIR/publish" npm run sync-content

if [ $? -ne 0 ]; then
    echo "❌ 内容同步失败"
    exit 1
fi

echo ""

# 生成 manifest
echo "📝 生成 manifest..."
npm run generate-manifest

if [ $? -ne 0 ]; then
    echo "❌ Manifest 生成失败"
    exit 1
fi

echo ""

# 构建 Next.js 应用
echo "🏗️ 构建 Next.js 应用..."
next build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo ""
echo "✅ CI 构建完成!"
