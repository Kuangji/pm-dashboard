'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { FileText, Code, Image, File, Download, ChevronDown, ChevronUp } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

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
 * 统计树中所有叶子文件节点的总数
 */
function countLeafNodes(items: NavItem[]): number {
  let count = 0
  for (const item of items) {
    if (item.type === 'file') {
      count += 1
    } else if (item.type === 'directory' && item.children) {
      count += countLeafNodes(item.children)
    }
  }
  return count
}

/**
 * 在根层级将 items 拆分为"常驻（含前10个叶子）"和"折叠"两部分
 */
function splitAtLeaf10(items: NavItem[]): { visible: NavItem[]; hidden: NavItem[] } {
  let leafCount = 0
  let splitIndex = items.length

  for (let i = 0; i < items.length; i++) {
    leafCount += countLeafNodes([items[i]])
    if (leafCount >= 10) {
      splitIndex = i + 1
      break
    }
  }

  return {
    visible: items.slice(0, splitIndex),
    hidden: items.slice(splitIndex),
  }
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
  const currentSlug = (pathname?.replace(/^\/docs\//, '').replace(/\/$/, '') || '').split('/').map(decodeURIComponent).join('/')

  const initialExpanded = new Set<string>()
  const parentPaths = findParentPaths(manifest.navigation.docs, currentSlug) || []
  parentPaths.forEach(p => initialExpanded.add(p))

  const [expanded, setExpanded] = useState<Set<string>>(initialExpanded)
  const [tocOpen, setTocOpen] = useState(false)

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

  const totalLeaves = countLeafNodes(manifest.navigation.docs)
  const needsCollapsible = totalLeaves > 10
  const { visible, hidden } = needsCollapsible
    ? splitAtLeaf10(manifest.navigation.docs)
    : { visible: manifest.navigation.docs, hidden: [] }

  // 桌面端：原有样式
  const desktopSidebar = (
    <aside className="hidden md:flex md:flex-col w-72 h-screen sticky top-0 bg-white border-r border-[#d0d7de] shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-[#d0d7de]">
        <Link href="/" className="block">
          <h1 className="font-semibold text-[#24292f] text-sm">PM Dashboard</h1>
        </Link>
        <p className="text-xs text-[#57606a] mt-1">产品文档中心</p>
      </div>

      {/* Tree Navigation */}
      <nav className="p-2 flex-1 overflow-y-auto">
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
      <div className="p-4 border-t border-[#d0d7de] bg-white shrink-0">
        <p className="text-xs text-[#57606a]">v{manifest.version}</p>
      </div>
    </aside>
  )

  // 移动端：TOC 在内容上方，超 10 条时折叠
  const mobileToc = (
    <div className="block md:hidden border-b border-[#d0d7de] bg-white">
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-[#57606a] uppercase tracking-wide mb-2">文档目录</p>
        <nav className="space-y-0.5">
          {visible.map((item) => (
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

        {/* needsCollapsible: totalLeaves > 10; hidden.length > 0: guards against edge case where splitAtLeaf10 puts everything in visible */}
        {needsCollapsible && hidden.length > 0 && (
          <Collapsible open={tocOpen} onOpenChange={setTocOpen}>
            <CollapsibleContent>
              <nav className="space-y-0.5 mt-0.5">
                {hidden.map((item) => (
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
            </CollapsibleContent>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-1.5 mt-2 py-1.5 text-xs text-[#57606a] hover:text-[#24292f] hover:bg-[#eaeef2] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300"
              >
                {tocOpen ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    收起目录
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    展开全部目录
                  </>
                )}
              </button>
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </div>
    </div>
  )

  return (
    <>
      {desktopSidebar}
      {mobileToc}
    </>
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
  const isCurrent = item.type === 'file' && item.slug?.toLowerCase() === currentSlug.toLowerCase()

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
        <Link href={`/docs/${encodedSlug}`} className={itemClasses}>
          <FileTypeIcon item={item} />
          <span className="truncate">{item.name}</span>
        </Link>
        <a
          href={`/api/download/${encodedSlug}`}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <svg className="w-4 h-4 flex-shrink-0 text-[#57606a]" fill="currentColor" viewBox="0 0 24 24">
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
