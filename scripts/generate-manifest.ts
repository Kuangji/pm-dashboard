#!/usr/bin/env tsx
/**
 * Manifest 自动生成脚本
 *
 * 扫描同步后的 public/content/docs/ 目录，自动生成 manifest.json
 * 规则：
 * 1. 目录按数字前缀排序（如 00-xxx, 01-yyy）
 * 2. 从 frontmatter 读取：title, order, tags
 * 3. slug = 完整相对路径（保留目录结构和文件扩展名）
 * 4. README.md 作为根级别文件
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

const DASHBOARD_ROOT = '/Users/yukuangji/Work/NoxInfluencer/pm-workspace/pm-dashboard'
const DOCUMENTS_DIR = path.join(DASHBOARD_ROOT, 'public/content/docs')
const DEMOS_DIR = path.join(DASHBOARD_ROOT, 'public/demos-raw')
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

/**
 * 从文件名提取排序前缀和显示名称
 * 例如: "00-dashboard" -> { order: 0, name: "dashboard" }
 *       "01-getting-started" -> { order: 1, name: "getting-started" }
 */
function parseName(name: string): { order: number; name: string } {
  // 匹配数字前缀: "00-dashboard" -> order: 0, name: "dashboard"
  const match = name.match(/^(\d+)[-\s]+(.+)$/)
  if (match) {
    return {
      order: parseInt(match[1], 10),
      name: match[2].replace(/-/g, ' ').replace(/_/g, ' '),
    }
  }
  return { order: 999, name: name.replace(/-/g, ' ').replace(/_/g, ' ') }
}

/**
 * 检查文件是否有支持的扩展名
 */
function hasSupportedExtension(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase()
  return SUPPORTED_EXTENSIONS.includes(ext)
}

/**
 * 扫描目录生成导航树
 */
async function scanDirectory(dirPath: string, relativePath: string = ''): Promise<NavItem[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const items: NavItem[] = []

  // 分离文件和目录
  const files = entries.filter((e) => e.isFile() && hasSupportedExtension(e.name))
  const dirs = entries.filter((e) => e.isDirectory())

  // 处理文件
  for (const file of files) {
    const filePath = path.join(dirPath, file.name)
    const relPath = path.join(relativePath, file.name)

    // 解析文件名（仅用于排序）
    const { order } = parseName(file.name)

    // 检测文件类型
    const fileTypeInfo = detectFileType(file.name)

    // 读取 frontmatter（仅用于 order 排序，仅对文本文件）
    let itemOrder = order
    if (isTextFile(file.name)) {
      try {
        const content = await fs.readFile(filePath, 'utf-8')
        const { data } = matter(content)
        if (data.order !== undefined) {
          itemOrder = data.order
        }
      } catch {
        // 忽略读取错误
      }
    }

    // 根级 README 默认排在最前
    const isRootReadme = file.name.toLowerCase() === 'readme.md' && !relativePath
    if (isRootReadme) {
      itemOrder = -1
    }

    // slug = 完整相对路径（保留原始扩展名）
    const slug = relPath

    // 显示名称 = 原始文件名
    items.push({
      type: 'file',
      name: file.name,
      path: relPath,
      slug,
      order: itemOrder,
      fileType: fileTypeInfo.category,
      language: fileTypeInfo.language,
      isText: isTextFile(file.name),
      isImage: isImageFile(file.name),
    })
  }

  // 处理目录
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

  // 按 order 排序
  return items.sort((a, b) => (a as any).order - (b as any).order)
}

/**
 * 清理排序标记（从最终输出中移除）
 */
function cleanItems(items: NavItem[]): NavItem[] {
  return items.map((item) => {
    const { order, ...rest } = item as any
    if (rest.children) {
      rest.children = cleanItems(rest.children)
    }
    return rest
  })
}

/**
 * 扫描 demos 目录
 */
async function scanDemos(): Promise<DemoItem[]> {
  try {
    const entries = await fs.readdir(DEMOS_DIR, { withFileTypes: true })
    const demos: DemoItem[] = []

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const demoPath = path.join(DEMOS_DIR, entry.name)
        const indexPath = path.join(demoPath, 'index.html')

        // 检查是否有 index.html
        try {
          await fs.access(indexPath)
        } catch {
          continue
        }

        // 尝试读取 demo.json 配置
        const configPath = path.join(demoPath, 'demo.json')
        let config: Partial<DemoItem> = {}
        try {
          const configContent = await fs.readFile(configPath, 'utf-8')
          config = JSON.parse(configContent)
        } catch {
          // 使用默认配置
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

/**
 * 生成 manifest
 */
async function generateManifest() {
  console.log('🔄 自动生成 manifest.json...\n')

  // 扫描文档目录
  const docs = await scanDirectory(DOCUMENTS_DIR)
  const cleanedDocs = cleanItems(docs)

  // 扫描 demos 目录
  const demos = await scanDemos()

  const manifest: Manifest = {
    version: '1.0.0',
    updatedAt: new Date().toISOString(),
    navigation: {
      docs: cleanedDocs,
      demos,
    },
  }

  // 写入文件
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')

  // 打印统计
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
  console.log('')

  // 打印树形预览
  function printTree(items: NavItem[], indent: number = 0) {
    for (const item of items) {
      const prefix = '  '.repeat(indent)
      if (item.type === 'file') {
        const typeIcon = item.isImage ? '🖼️' : item.fileType === 'markdown' ? '📝' : '📄'
        console.log(`${prefix}${typeIcon} ${item.name} (${item.slug})`)
      } else {
        console.log(`${prefix}📁 ${item.name}/`)
        if (item.children) {
          printTree(item.children, indent + 1)
        }
      }
    }
  }

  printTree(cleanedDocs)
}

generateManifest().catch(console.error)
