'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { FileText, Code, Image, File, Download } from 'lucide-react'

export interface NavItem {
  type: 'file' | 'directory'
  name: string
  path: string
  slug?: string
  fileType?: string
  language?: string
  isText?: boolean
  isImage?: boolean
  children?: NavItem[]
}

interface Manifest {
  version: string
  navigation: {
    docs: NavItem[]
  }
}

interface DocsSidebarClientProps {
  manifest: Manifest
}

/**
 * 在树中查找当前 slug 的所有父级目录路径
 */
function findParentPaths(items: NavItem[], targetSlug: string, parentPath: string[] = []): string[] | null {
  for (const item of items) {
    const currentPath = [...parentPath, item.path]
    // 不区分大小写比较 slug
    if (item.type === 'file' && item.slug?.toLowerCase() === targetSlug.toLowerCase()) {
      return parentPath
    }
    if (item.type === 'directory' && item.children) {
      const found = findParentPaths(item.children, targetSlug, currentPath)
      if (found) return found
    }
  }
  return null
}

/**
 * Get file icon based on file type
 */
function FileTypeIcon({ item }: { item: NavItem }) {
  if (item.isImage) {
    return <Image className="w-4 h-4 flex-shrink-0 text-[#57606a]" />
  }
  if (item.fileType === 'markdown') {
    return <FileText className="w-4 h-4 flex-shrink-0 text-[#57606a]" />
  }
  if (item.fileType === 'code' || item.fileType === 'json' || item.fileType === 'yaml') {
    return <Code className="w-4 h-4 flex-shrink-0 text-[#57606a]" />
  }
  if (item.fileType === 'text') {
    return <FileText className="w-4 h-4 flex-shrink-0 text-[#57606a]" />
  }
  return <File className="w-4 h-4 flex-shrink-0 text-[#57606a]" />
}

export function DocsSidebarClient({ manifest }: DocsSidebarClientProps) {
  const pathname = usePathname()
  // 从 pathname 中提取完整 slug（去掉 /docs/ 前缀和尾部斜杠）
  // 如 /docs/00-dashboard/file.md/ -> 00-dashboard/file.md
  const currentSlug = (pathname?.replace(/^\/docs\//, '').replace(/\/$/, '') || '').split('/').map(decodeURIComponent).join('/')

  // 初始化展开状态 - 包含当前 slug 的所有父级目录
  const initialExpanded = new Set<string>()
  const parentPaths = findParentPaths(manifest.navigation.docs, currentSlug) || []
  parentPaths.forEach(p => initialExpanded.add(p))

  const [expanded, setExpanded] = useState<Set<string>>(initialExpanded)

  const toggleExpand = (path: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  return (
    <aside className="w-72 h-screen sticky top-0 bg-white border-r border-[#d0d7de] overflow-y-scroll shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-[#d0d7de]">
        <Link href="/" className="block">
          <h1 className="font-semibold text-[#24292f] text-sm">PM Dashboard</h1>
        </Link>
        <p className="text-xs text-[#57606a] mt-1">产品文档中心</p>
      </div>

      {/* Tree Navigation */}
      <nav className="p-2 pb-20">
        {manifest.navigation.docs.map((item) => (
          <TreeItem
            key={item.path}
            item={item}
            level={0}
            currentSlug={currentSlug}
            expanded={expanded}
            onToggle={toggleExpand}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#d0d7de] bg-white">
        <p className="text-xs text-[#57606a]">v{manifest.version}</p>
      </div>
    </aside>
  )
}

interface TreeItemProps {
  item: NavItem
  level: number
  currentSlug: string
  expanded: Set<string>
  onToggle: (path: string) => void
}

function TreeItem({ item, level, currentSlug, expanded, onToggle }: TreeItemProps) {
  const isExpanded = expanded.has(item.path)
  // 不区分大小写比较 slug（解决线上服务器可能对 URL 进行大小写规范化的问题）
  const isCurrent = item.type === 'file' && item.slug?.toLowerCase() === currentSlug.toLowerCase()

  // GitHub 配色
  // 使用固定宽度和等宽数字，避免选中时跳动
  const itemClasses = cn(
    'flex items-center gap-2 w-full text-left text-sm rounded-md transition-colors',
    'h-8 px-2 font-normal',
    '[font-variant-numeric:tabular-nums]',
    isCurrent
      ? 'bg-[#bfd4f2] text-[#0969da]'
      : 'text-[#24292f] hover:bg-[#eaeef2]'
  )

  if (item.type === 'file') {
    const encodedSlug = item.slug!.split('/').map(encodeURIComponent).join('/')
    return (
      <div style={{ paddingLeft: `${level * 16}px` }} className="relative group">
        {/* 保留完整文件名，对路径的每一部分分别编码 */}
        <Link href={`/docs/${encodedSlug}`} className={itemClasses}>
          <FileTypeIcon item={item} />
          <span className="truncate">{item.name}</span>
        </Link>
        <a
          href={`/content/docs/${encodedSlug}`}
          download
          onClick={e => e.stopPropagation()}
          className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded opacity-0 group-hover:opacity-100 text-[#57606a] hover:text-[#0969da] hover:bg-[#eaeef2] transition-opacity"
          title="下载源文件"
        >
          <Download className="w-3.5 h-3.5" />
        </a>
      </div>
    )
  }

  // Directory
  return (
    <div>
      <button
        onClick={() => onToggle(item.path)}
        className={cn(
          'flex items-center gap-1 w-full text-left text-sm rounded-md transition-colors h-8 px-2',
          'text-[#24292f] hover:bg-[#eaeef2]'
        )}
        style={{ paddingLeft: `${level * 16}px` }}
      >
        <svg
          className={cn(
            'w-3 h-3 flex-shrink-0 text-[#57606a] transition-transform',
            isExpanded && 'rotate-90'
          )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <svg
          className="w-4 h-4 flex-shrink-0 text-[#57606a]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <span className="font-semibold truncate">{item.name}</span>
      </button>
      {isExpanded && item.children && (
        <div className="mt-1">
          {item.children.map((child) => (
            <TreeItem
              key={child.path}
              item={child}
              level={level + 1}
              currentSlug={currentSlug}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
