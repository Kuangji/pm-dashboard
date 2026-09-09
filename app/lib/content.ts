import path from 'path'
import { detectFileType, isTextFile, getMimeType, getLanguage, FileCategory } from './file-types'
import manifestData from '@/public/content/manifest.json'

export { shouldPreviewDocumentContent } from './document-preview'
export { resolveDocumentTitle } from './document-title'

export interface NavItem {
  type: 'file' | 'directory'
  name: string
  path: string
  slug?: string
  title?: string
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

type DocumentFrontmatter = Record<string, unknown>

export interface Document {
  slug: string
  title: string
  content: string
  rawContent?: string
  frontmatter: DocumentFrontmatter
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

export type DocumentMetadata = Document

export async function readManifest(): Promise<Manifest> {
  return manifestData as Manifest
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

export async function getDocumentHtmlTitle(slug: string): Promise<string> {
  const manifest = await readManifest()
  const docItem = findDocInTree(slug, manifest.navigation.docs)

  if (!docItem || docItem.type !== 'file') {
    throw new Error(`Document not found: ${slug}`)
  }

  return docItem.title ?? docItem.name
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

export async function readDocument(slug: string): Promise<Document> {
  const manifest = await readManifest()

  // Find document in tree
  const docItem = findDocInTree(slug, manifest.navigation.docs)

  if (!docItem || docItem.type !== 'file') {
    throw new Error(`Document not found: ${slug}`)
  }

  // Detect file type info
  const fileTypeInfo = detectFileType(docItem.name)
  const extension = path.extname(docItem.name).toLowerCase()
  const isText = isTextFile(docItem.name)
  const mimeType = getMimeType(docItem.name)
  const language = getLanguage(docItem.name)

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

  return {
    slug,
    title: docItem.name,
    content: '',
    frontmatter: {},
    fileType: fileTypeInfo.category,
    mimeType,
    extension,
    language,
    isText,
    isImage: false,
    isBinary: !isText,
  }
}

export const readDocumentMetadata = readDocument

export async function getAllDocuments(): Promise<NavItem[]> {
  const manifest = await readManifest()
  return flattenNavTree(manifest.navigation.docs)
}
