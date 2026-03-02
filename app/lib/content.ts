import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { detectFileType, isTextFile, getMimeType, getLanguage, FileCategory } from './file-types'

// 使用相对路径，确保在构建时能找到正确的位置
const CONTENT_DIR = path.resolve('./public/content')

export interface NavItem {
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

export interface Manifest {
  version: string
  updatedAt: string
  navigation: {
    docs: NavItem[]
    demos: DemoItem[]
  }
}

export interface DemoItem {
  id: string
  title: string
  description: string
  path: string
  thumbnail?: string
  tags: string[]
}

export interface Document {
  slug: string
  title: string
  content: string
  rawContent?: string
  frontmatter: Record<string, any>
  created?: string
  updated?: string
  fileType: FileCategory
  mimeType: string
  extension: string
  language?: string
  isText: boolean
  isImage: boolean
  isBinary: boolean
}

export async function readManifest(): Promise<Manifest> {
  const filePath = path.join(CONTENT_DIR, 'manifest.json')
  const content = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(content)
}

/**
 * 递归在树形结构中查找文档
 * slug 格式: "README.md" 或 "00-dashboard/pm-dashboard-architecture.md"
 */
export function findDocInTree(slug: string, items: NavItem[]): NavItem | undefined {
  // slug 已经是完整路径，直接使用

  for (const item of items) {
    if (item.type === 'file' && item.slug === slug) {
      return item
    }
    if (item.type === 'directory' && item.children) {
      const found = findDocInTree(slug, item.children)
      if (found) return found
    }
  }
  return undefined
}

/**
 * 将树形结构扁平化为所有文件列表
 */
export function flattenNavTree(items: NavItem[]): NavItem[] {
  const result: NavItem[] = []
  for (const item of items) {
    if (item.type === 'file') {
      result.push(item)
    }
    if (item.type === 'directory' && item.children) {
      result.push(...flattenNavTree(item.children))
    }
  }
  return result
}

/**
 * 获取树中的第一个文件
 */
export function getFirstFile(items: NavItem[]): NavItem | undefined {
  for (const item of items) {
    if (item.type === 'file') {
      return item
    }
    if (item.type === 'directory' && item.children) {
      const found = getFirstFile(item.children)
      if (found) return found
    }
  }
  return undefined
}

/**
 * 确保日期是字符串格式（gray-matter 可能返回 Date 对象）
 */
function formatDate(date: any): string | undefined {
  if (!date) return undefined
  if (date instanceof Date) return date.toISOString().split('T')[0]
  if (typeof date === 'string') return date
  return String(date)
}

export async function readDocument(slug: string): Promise<Document> {
  const manifest = await readManifest()

  // Find document in tree
  const docItem = findDocInTree(slug, manifest.navigation.docs)

  if (!docItem || docItem.type !== 'file') {
    throw new Error(`Document not found: ${slug}`)
  }

  // Read file
  const filePath = path.join(CONTENT_DIR, 'docs', docItem.path)

  // Detect file type info
  const fileTypeInfo = detectFileType(docItem.name)
  const extension = path.extname(docItem.name).toLowerCase()
  const isText = isTextFile(docItem.name)
  const mimeType = getMimeType(docItem.name)
  const language = getLanguage(docItem.name)

  // Handle text files
  if (isText) {
    const rawContent = await fs.readFile(filePath, 'utf-8')

    // Parse frontmatter for markdown files
    let frontmatter: Record<string, any> = {}
    let content = rawContent

    if (fileTypeInfo.category === 'markdown') {
      const parsed = matter(rawContent)
      frontmatter = parsed.data
      content = parsed.content
    } else if (fileTypeInfo.category === 'json') {
      // For JSON files, try to parse and format
      try {
        const parsed = JSON.parse(rawContent)
        content = JSON.stringify(parsed, null, 2)
      } catch {
        content = rawContent
      }
    } else {
      // For other text files, use raw content as-is
      content = rawContent
    }

    return {
      slug,
      title: docItem.name,
      content,
      rawContent,
      frontmatter,
      created: formatDate(frontmatter.created),
      updated: formatDate(frontmatter.updated),
      fileType: fileTypeInfo.category,
      mimeType,
      extension,
      language,
      isText: true,
      isImage: false,
      isBinary: false,
    }
  }

  // Handle image files
  if (fileTypeInfo.category === 'image') {
    // For images, we don't read content, just return metadata
    // The actual image will be served from public path
    return {
      slug,
      title: docItem.name,
      content: '',
      frontmatter: {},
      fileType: 'image',
      mimeType,
      extension,
      isText: false,
      isImage: true,
      isBinary: true,
    }
  }

  // Handle binary files
  return {
    slug,
    title: docItem.name,
    content: '',
    frontmatter: {},
    fileType: 'binary',
    mimeType,
    extension,
    isText: false,
    isImage: false,
    isBinary: true,
  }
}

export async function getAllDocuments(): Promise<NavItem[]> {
  const manifest = await readManifest()
  return flattenNavTree(manifest.navigation.docs)
}

/**
 * Get the public URL for a document (for images and other assets)
 */
export function getDocumentPublicUrl(slug: string): string {
  return `/content/docs/${slug}`
}
