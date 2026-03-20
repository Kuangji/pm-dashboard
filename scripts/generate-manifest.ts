#!/usr/bin/env tsx
/**
 * Manifest 自动生成脚本
 */

import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  SUPPORTED_EXTENSIONS,
  detectFileType,
  isTextFile,
  isImageFile,
  getLanguage
} from '../app/lib/file-types'
import { invokeAiJson } from './lib/ai-cli'

const DASHBOARD_ROOT = process.cwd()
const DOCUMENTS_DIR = path.join(DASHBOARD_ROOT, 'public/content/docs')
const DEMOS_DIR = path.join(DASHBOARD_ROOT, 'public/demos')
const MANIFEST_PATH = path.join(DASHBOARD_ROOT, 'public/content/manifest.json')

interface NavItem {
  type: 'file' | 'directory'
  name: string
  path: string
  slug?: string
  order?: number
  fileType?: string
  language?: string
  isText?: boolean
  isImage?: boolean
  children?: NavItem[]
}

interface DemoItem {
  id: string
  title: string
  description: string
  path: string
  thumbnail?: string
  tags: string[]
}

interface Manifest {
  version: string
  updatedAt: string
  navigation: {
    docs: NavItem[]
    demos: DemoItem[]
  }
}

function parseName(name: string): { order: number; name: string } {
  const match = name.match(/^(\d+)[-\s]+(.+)$/)
  if (match) {
    return {
      order: parseInt(match[1], 10),
      name: match[2].replace(/-/g, ' ').replace(/_/g, ' '),
    }
  }
  return { order: 999, name: name.replace(/-/g, ' ').replace(/_/g, ' ') }
}

function hasSupportedExtension(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase()
  return SUPPORTED_EXTENSIONS.includes(ext)
}

async function scanDirectory(dirPath: string, relativePath: string = ''): Promise<NavItem[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const items: NavItem[] = []

  const files = entries.filter((e) => e.isFile() && hasSupportedExtension(e.name))
  const dirs = entries.filter((e) => e.isDirectory())

  for (const file of files) {
    const filePath = path.join(dirPath, file.name)
    const relPath = path.join(relativePath, file.name)
    const { order } = parseName(file.name)
    const fileTypeInfo = detectFileType(file.name)

    let itemOrder = order
    if (isTextFile(file.name)) {
      try {
        const content = await fs.readFile(filePath, 'utf-8')
        const { data } = matter(content)
        if (data.order !== undefined) {
          itemOrder = data.order
        }
      } catch {
        // 忽略
      }
    }

    const isRootReadme = file.name.toLowerCase() === 'readme.md' && !relativePath
    if (isRootReadme) {
      itemOrder = -1
    }

    items.push({
      type: 'file',
      name: file.name,
      path: relPath,
      slug: relPath,
      order: itemOrder,
      fileType: fileTypeInfo.category,
      language: fileTypeInfo.language,
      isText: isTextFile(file.name),
      isImage: isImageFile(file.name),
    })
  }

  for (const dir of dirs) {
    const { order } = parseName(dir.name)
    const fullDirPath = path.join(dirPath, dir.name)
    const relPath = path.join(relativePath, dir.name)

    const children = await scanDirectory(fullDirPath, relPath)

    if (children.length > 0) {
      items.push({
        type: 'directory',
        name: dir.name,
        path: relPath,
        children,
        order,
      })
    }
  }

  return items.sort((a, b) => (a as any).order - (b as any).order)
}

function cleanItems(items: NavItem[]): NavItem[] {
  return items.map((item) => {
    const { order, ...rest } = item as any
    if (rest.children) {
      rest.children = cleanItems(rest.children)
    }
    return rest
  })
}

/** 从 index.html 提取 <title> 和部分文本内容作为上下文 */
async function extractHtmlContext(indexPath: string): Promise<string> {
  try {
    const html = await fs.readFile(indexPath, 'utf-8')
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const title = titleMatch ? titleMatch[1].trim() : ''
    // 去掉标签，取前 300 字符作为内容摘要
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300)
    return [title, text].filter(Boolean).join('\n')
  } catch {
    return ''
  }
}

/** 调用 kimi CLI 为 demo 生成 title/description/tags */
async function generateDemoConfig(dirName: string, indexPath: string): Promise<Partial<DemoItem>> {
  const htmlContext = await extractHtmlContext(indexPath)
  const prompt = `以下是一个产品原型 Demo 的目录名和页面内容摘要，请生成展示卡片所需的元数据。

目录名: ${dirName}
页面内容摘要:
${htmlContext || '（无）'}

严格按以下 JSON 格式返回，不要添加任何其他文字或代码块标记：
{
  "title": "简短标题（10字以内）",
  "description": "一句话描述这个 Demo 的功能和用途（20-40字）",
  "tags": ["标签1", "标签2", "标签3"]
}`

  try {
    return await invokeAiJson<Partial<DemoItem>>({
      prompt,
      purpose: `generate-demo-config-${dirName}`,
    })
  } catch (err) {
    console.warn(`   ⚠️  kimi 调用失败，使用默认配置: ${(err as Error).message.split('\n')[0]}`)
    return { title: dirName, description: '', tags: [] }
  }
}

async function scanDemos(): Promise<DemoItem[]> {
  try {
    const entries = await fs.readdir(DEMOS_DIR, { withFileTypes: true })
    const demos: DemoItem[] = []

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const demoPath = path.join(DEMOS_DIR, entry.name)
        const indexPath = path.join(demoPath, 'index.html')

        try {
          await fs.access(indexPath)
        } catch {
          continue
        }

        const configPath = path.join(demoPath, 'demo.json')
        let config: Partial<DemoItem> = {}
        try {
          const configContent = await fs.readFile(configPath, 'utf-8')
          config = JSON.parse(configContent)
        } catch {
          // 没有 demo.json，调用 kimi 自动生成
          config = await generateDemoConfig(entry.name, indexPath)
          await fs.writeFile(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8')
          console.log(`   🤖 已生成 demo.json: ${entry.name}`)
        }

        demos.push({
          id: entry.name,
          title: config.title || entry.name,
          description: config.description || '',
          path: `demos/${entry.name}/index.html`,
          thumbnail: config.thumbnail || '',
          tags: config.tags || [],
        })
      }
    }

    return demos
  } catch {
    return []
  }
}

async function getNewestMtime(dirs: string[]): Promise<number> {
  let newest = 0
  async function walk(dir: string) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) { await walk(full) }
        else { const { mtimeMs } = await fs.stat(full); if (mtimeMs > newest) newest = mtimeMs }
      }
    } catch { return }
  }
  for (const dir of dirs) await walk(dir)
  return newest
}

async function generateManifest() {
  console.log('🔄 生成 manifest.json...\n')

  try {
    const manifestStat = await fs.stat(MANIFEST_PATH)
    const newestMtime = await getNewestMtime([DOCUMENTS_DIR, DEMOS_DIR])
    if (manifestStat.mtimeMs > newestMtime) {
      console.log('⚡ 内容未变动，跳过 manifest 生成')
      return
    }
  } catch { /* manifest 不存在或目录不存在，继续生成 */ }

  const docs = await scanDirectory(DOCUMENTS_DIR)
  const cleanedDocs = cleanItems(docs)
  const demos = await scanDemos()

  const manifest: Manifest = {
    version: '1.0.0',
    updatedAt: new Date().toISOString(),
    navigation: {
      docs: cleanedDocs,
      demos,
    },
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')

  function countFiles(items: NavItem[]): number {
    return items.reduce((count, item) => {
      if (item.type === 'file') return count + 1
      if (item.children) return count + countFiles(item.children)
      return count
    }, 0)
  }

  function countDirs(items: NavItem[]): number {
    return items.reduce((count, item) => {
      if (item.type === 'directory') {
        return count + 1 + (item.children ? countDirs(item.children) : 0)
      }
      return count
    }, 0)
  }

  console.log(`✅ 生成完成: ${MANIFEST_PATH}`)
  console.log(`   📄 文件: ${countFiles(cleanedDocs)} 个`)
  console.log(`   📁 目录: ${countDirs(cleanedDocs)} 个`)
  console.log(`   🎮 Demos: ${demos.length} 个`)
}

generateManifest().catch((error) => {
  console.error('❌ 生成失败:', error)
  process.exit(1)
})
