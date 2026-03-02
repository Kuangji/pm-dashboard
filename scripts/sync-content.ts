#!/usr/bin/env tsx
/**
 * Content Sync Script
 *
 * 将 drafts/publish/ 内容同步到 dashboard/public/content/ 和 dashboard/public/demos/
 * 原则：只复制业务文档，dashboard 自身文档在 docs/ 目录自维护
 *
 * 支持两种模式：
 * - 本地开发: 读取本地 drafts 目录 (默认)
 * - CI 模式: 通过 DRAFTS_ROOT 环境变量指定 drafts 仓库路径
 */

import { promises as fs } from 'fs'
import path from 'path'

// 本地开发默认路径
const LOCAL_DRAFTS_ROOT = '/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts'

// 通过环境变量支持 CI 模式
const DRAFTS_ROOT = process.env.DRAFTS_ROOT || LOCAL_DRAFTS_ROOT
const DASHBOARD_ROOT = '/Users/yukuangji/Work/NoxInfluencer/pm-workspace/pm-dashboard'

// publish 子目录（CI 模式下直接指向克隆的目录）
const PUBLISH_DIR = DRAFTS_ROOT === LOCAL_DRAFTS_ROOT ? 'publish' : ''

const PATHS = {
  documents: {
    source: PUBLISH_DIR
      ? path.join(DRAFTS_ROOT, PUBLISH_DIR, 'documents')
      : path.join(DRAFTS_ROOT, 'documents'),
    dest: path.join(DASHBOARD_ROOT, 'public/content/docs'),
  },
  demos: {
    source: PUBLISH_DIR
      ? path.join(DRAFTS_ROOT, PUBLISH_DIR, 'demos')
      : path.join(DRAFTS_ROOT, 'demos'),
    dest: path.join(DASHBOARD_ROOT, 'public/demos-raw'),
  },
}

async function syncFile(src: string, dest: string) {
  const destDir = path.dirname(dest)
  await fs.mkdir(destDir, { recursive: true })
  await fs.copyFile(src, dest)
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
    await fs.mkdir(dir, { recursive: true })
  } catch {
    // Ignore errors
  }
}

async function sync() {
  // 显示当前模式
  const isCIMode = !!process.env.DRAFTS_ROOT
  console.log(isCIMode ? '🚀 CI 模式' : '💻 本地开发模式')
  console.log(`   DRAFTS_ROOT: ${DRAFTS_ROOT}`)
  console.log('')
  console.log('🔄 Syncing content...\n')

  // 1. Clean and sync documents
  console.log('📝 Syncing documents...')
  try {
    // Clean destination first to remove stale files
    await cleanDirectory(PATHS.documents.dest)
    await syncDirectory(PATHS.documents.source, PATHS.documents.dest)
    console.log('   ✓ documents/')
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      console.log('   ⚠ No documents to sync')
    } else {
      throw e
    }
  }

  // 2. Clean and sync demos
  console.log('\n🎮 Syncing demos...')
  try {
    await cleanDirectory(PATHS.demos.dest)
    await syncDirectory(PATHS.demos.source, PATHS.demos.dest)
    console.log('   ✓ demos/')
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      console.log('   ⚠ No demos to sync')
    } else {
      throw e
    }
  }

  console.log('\n✅ Sync complete!')
}

sync().catch(console.error)
