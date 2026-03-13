#!/usr/bin/env tsx
/**
 * Content Sync Script
 *
 * 将 drafts/publish/ 内容同步到 dashboard/public/content/ 和 dashboard/public/demos/
 * 原则：只复制业务文档，dashboard 自身文档在 docs/ 目录自维护
 *
 * 本地开发使用：npm run sync-content
 */

import { promises as fs } from 'fs'
import path from 'path'

/**
 * 支持两种模式：
 * - CI 模式：DRAFTS_ROOT 环境变量指向克隆的 drafts 仓库 publish 目录
 * - 本地模式：使用本地绝对路径
 */
const DRAFTS_ROOT = process.env.DRAFTS_ROOT
  ? process.env.DRAFTS_ROOT
  : '/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/publish'
const DASHBOARD_ROOT = process.cwd()

const PATHS = {
  documents: {
    source: path.join(DRAFTS_ROOT, 'documents'),
    dest: path.join(DASHBOARD_ROOT, 'public/content/docs'),
  },
  demos: {
    source: path.join(DRAFTS_ROOT, 'demos'),
    dest: path.join(DASHBOARD_ROOT, 'public/demos'),
  },
}

async function syncFile(src: string, dest: string) {
  const destDir = path.dirname(dest)
  await fs.mkdir(destDir, { recursive: true })
  await fs.copyFile(src, dest)
  const { atime, mtime } = await fs.stat(src)
  await fs.utimes(dest, atime, mtime)
}

async function syncDirectory(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true })

  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await syncDirectory(srcPath, destPath)
    } else {
      await syncFile(srcPath, destPath)
    }
  }
}

async function cleanDirectory(dir: string) {
  try {
    await fs.rm(dir, { recursive: true, force: true })
  } catch {
    // 忽略
  }
  await fs.mkdir(dir, { recursive: true })
}

async function sync() {
  const isCI = !!process.env.DRAFTS_ROOT
  console.log(`🔄 开始同步内容... (${isCI ? 'CI 模式' : '本地模式'})\n`)
  console.log(`📂 源目录: ${DRAFTS_ROOT}\n`)

  // 1. 同步文档
  console.log('📝 同步文档...')
  try {
    await cleanDirectory(PATHS.documents.dest)
    await syncDirectory(PATHS.documents.source, PATHS.documents.dest)
    console.log('   ✓ documents/')
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      console.log('   ⚠ 无文档可同步')
    } else {
      throw e
    }
  }

  // 2. 同步演示
  console.log('\n🎮 同步演示...')
  try {
    await cleanDirectory(PATHS.demos.dest)
    await syncDirectory(PATHS.demos.source, PATHS.demos.dest)
    console.log('   ✓ demos/')
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      console.log('   ⚠ 无演示可同步')
    } else {
      throw e
    }
  }

  console.log('\n✅ 同步完成!')
}

sync().catch((error) => {
  console.error('❌ 同步失败:', error.message)
  process.exit(1)
})
