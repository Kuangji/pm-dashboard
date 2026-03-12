# 移动端响应式支持 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使 PM Dashboard 在移动设备（320px+）上可正常使用，主导航改为 Drawer，文档 TOC 移动端纵向堆叠并支持折叠。

**Architecture:** 新增 `MobileNav`（Client 组件，持有 Drawer 状态）和 `MobileHeader`（汉堡菜单），`layout.tsx` 移动端隐藏固定侧边栏改用 MobileNav；`DocsSidebarClient` 新增移动端渲染路径，超 10 条叶子节点时折叠。

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4（`md:` = 768px），shadcn/ui Sheet + Collapsible，lucide-react

---

## 文件变更清单

| 操作 | 文件 | 职责 |
|---|---|---|
| 新建 | `app/components/MobileHeader.tsx` | 移动端顶部 Header，含 Logo + 汉堡菜单按钮 |
| 新建 | `app/components/MobileNav.tsx` | Client 组件：持有 isOpen 状态、渲染 MobileHeader + Sheet |
| 修改 | `app/components/Sidebar.tsx` | 提取 `SidebarLinks` 子组件供 Sheet 复用；aside 添加 `hidden md:block` |
| 修改 | `app/layout.tsx` | 包裹 MobileNav + 主内容为 flex-col；Sidebar 仅桌面端显示 |
| 修改 | `app/docs/layout.tsx` | 移动端 flex-col，去掉 h-screen overflow-hidden |
| 修改 | `app/components/DocsSidebarClient.tsx` | 新增移动端 TOC 渲染，Collapsible 折叠超出的 10 条 |
| 修改 | `app/components/MarkdownViewer.tsx` | 表格添加横向滚动 |
| 修改 | `app/components/CodeViewer.tsx` | 代码块 padding 响应式 |
| 修改 | `app/page.tsx` | padding 响应式 |
| 修改 | `app/demos/page.tsx` | padding 响应式 |
| 修改 | `app/settings/page.tsx` | padding 响应式 |

---

## Chunk 1: 依赖安装 + 主导航 Drawer

### Task 1: 安装 shadcn/ui 组件

**Files:**
- 运行命令（无文件变更）

- [ ] **Step 1: 安装 Sheet 和 Collapsible**

```bash
cd /Users/yukuangji/Work/NoxInfluencer/pm-workspace/pm-dashboard
npx shadcn@latest add sheet collapsible
```

接受所有提示（默认 yes）。

- [ ] **Step 2: 验证组件文件已生成**

```bash
ls components/ui/sheet.tsx components/ui/collapsible.tsx
```

预期输出：两个文件都存在，无报错。

- [ ] **Step 3: Commit**

```bash
git add components/ui/sheet.tsx components/ui/collapsible.tsx
git commit -m "feat: install shadcn/ui Sheet and Collapsible components"
```

---

### Task 2: 重构 Sidebar，提取 SidebarLinks

**Files:**
- Modify: `app/components/Sidebar.tsx`

- [ ] **Step 1: 修改 Sidebar.tsx**

将 `app/components/Sidebar.tsx` 替换为以下内容：

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, LayoutDashboard, PlayCircle, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: '仪表盘', icon: LayoutDashboard },
  { href: '/docs', label: '文档', icon: FileText },
  { href: '/demos', label: 'Demos', icon: PlayCircle },
  { href: '/settings', label: '设置', icon: Settings },
]

export function SidebarLinks() {
  const pathname = usePathname()

  return (
    <ul className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-zinc-50 border-r border-zinc-200 h-screen sticky top-0 shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-zinc-900">PM Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">产品管理系统</p>
      </div>

      <nav className="px-4">
        <SidebarLinks />
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-200">
        <p className="text-xs text-zinc-400">v1.0.0</p>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: 确认应用启动无报错**

```bash
npm run dev 2>&1 | head -20
```

预期：无 TypeScript 错误，服务器正常启动。按 Ctrl+C 退出。

- [ ] **Step 3: Commit**

```bash
git add app/components/Sidebar.tsx
git commit -m "refactor: extract SidebarLinks from Sidebar for mobile reuse"
```

---

### Task 3: 新建 MobileHeader

**Files:**
- Create: `app/components/MobileHeader.tsx`

- [ ] **Step 1: 创建 MobileHeader.tsx**

```tsx
// app/components/MobileHeader.tsx
'use client'

import { Menu } from 'lucide-react'

interface MobileHeaderProps {
  onMenuOpen: () => void
}

export function MobileHeader({ onMenuOpen }: MobileHeaderProps) {
  return (
    <header className="flex md:hidden items-center justify-between px-4 h-14 bg-zinc-50 border-b border-zinc-200 sticky top-0 z-10">
      <span className="text-base font-bold text-zinc-900">PM Dashboard</span>
      <button
        onClick={onMenuOpen}
        className="p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors"
        aria-label="打开导航菜单"
      >
        <Menu className="w-5 h-5" />
      </button>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/MobileHeader.tsx
git commit -m "feat: add MobileHeader component with hamburger menu"
```

---

### Task 4: 新建 MobileNav（Drawer 容器）

**Files:**
- Create: `app/components/MobileNav.tsx`

- [ ] **Step 1: 创建 MobileNav.tsx**

```tsx
// app/components/MobileNav.tsx
'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { MobileHeader } from './MobileHeader'
import { SidebarLinks } from './Sidebar'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // 路由变化时自动关闭 Drawer
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <MobileHeader onMenuOpen={() => setIsOpen(true)} />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b border-zinc-200">
            <h1 className="text-xl font-bold text-zinc-900">PM Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-1">产品管理系统</p>
          </div>
          <nav className="px-4 py-4">
            <SidebarLinks />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/MobileNav.tsx
git commit -m "feat: add MobileNav with Sheet Drawer and auto-close on route change"
```

---

### Task 5: 更新根布局

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: 修改 app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PM Dashboard",
  description: "产品管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen overflow-x-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <MobileNav />
            <main className="flex-1 bg-white min-w-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: 在浏览器验证移动端布局**

```bash
npm run dev
```

打开 http://localhost:3000，Chrome DevTools → 切换到 375px 视图：
- [ ] 固定侧边栏消失，顶部出现 "PM Dashboard" + 汉堡菜单
- [ ] 点击汉堡菜单，Drawer 从左侧滑入
- [ ] Drawer 内有正确的导航链接
- [ ] 点击导航链接，路由跳转，Drawer 自动关闭
- [ ] 点击遮罩或按 ESC，Drawer 关闭

切换到 1024px 视图：
- [ ] 固定侧边栏正常显示，Header 消失

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: integrate MobileNav into root layout for mobile drawer navigation"
```

---

## Chunk 2: 文档 TOC + 全站间距

### Task 6: 文档布局响应式改造

**Files:**
- Modify: `app/docs/layout.tsx`

- [ ] **Step 1: 修改 app/docs/layout.tsx**

```tsx
import { DocsSidebar } from '@/app/components/DocsSidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row md:h-screen bg-white md:overflow-hidden">
      <DocsSidebar />
      <main className="flex-1 min-w-0 md:h-screen md:overflow-y-auto">
        <div className="max-w-full md:max-w-[1012px] mx-auto px-4 py-4 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/docs/layout.tsx
git commit -m "feat: make docs layout responsive with vertical stacking on mobile"
```

---

### Task 7: DocsSidebarClient 移动端 TOC 折叠

**Files:**
- Modify: `app/components/DocsSidebarClient.tsx`

★ Insight ─────────────────────────────────────
`countLeafNodes` 递归统计树中所有 `type === 'file'` 节点数。`splitAtLeaf10` 从根节点列表中找到"包含第 10 个叶子节点的根项"，在该项之后截断，保证"常驻前 10 条"的语义在根层级实现，无需深入树内部拆分。
─────────────────────────────────────────────────

- [ ] **Step 1: 修改 DocsSidebarClient.tsx，添加辅助函数和移动端 TOC**

将 `app/components/DocsSidebarClient.tsx` 替换为以下完整内容：

```tsx
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
    <aside className="hidden md:block w-72 h-screen sticky top-0 bg-white border-r border-[#d0d7de] overflow-y-scroll shrink-0">
      <div className="p-4 border-b border-[#d0d7de]">
        <Link href="/" className="block">
          <h1 className="font-semibold text-[#24292f] text-sm">PM Dashboard</h1>
        </Link>
        <p className="text-xs text-[#57606a] mt-1">产品文档中心</p>
      </div>
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
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#d0d7de] bg-white">
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
              <button className="w-full flex items-center justify-center gap-1.5 mt-2 py-1.5 text-xs text-[#57606a] hover:text-[#24292f] hover:bg-[#eaeef2] rounded-md transition-colors">
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
```

- [ ] **Step 2: 在浏览器验证文档 TOC 移动端**

打开 http://localhost:3000/docs，切换到 375px 视图：
- [ ] 文档导航树出现在内容上方（TOC 块可见）
- [ ] 若文档总数 > 10，底部有"展开全部目录"按钮；点击后展开，按钮变为"收起目录"
- [ ] 若文档总数 ≤ 10，无折叠按钮，全部常驻

切换到 1024px 视图：
- [ ] 桌面端左侧 w-72 侧边栏正常显示，移动端 TOC 块不可见

- [ ] **Step 3: Commit**

```bash
git add app/components/DocsSidebarClient.tsx
git commit -m "feat: add mobile TOC with collapsible overflow (threshold: 10 leaf nodes)"
```

---

### Task 8: 全站间距响应式 + 内容渲染修复

**Files:**
- Modify: `app/page.tsx:14`
- Modify: `app/demos/page.tsx:9`
- Modify: `app/settings/page.tsx:8`
- Modify: `app/components/MarkdownViewer.tsx:103-107`
- Modify: `app/components/CodeViewer.tsx:98`

- [ ] **Step 1: 修改 app/page.tsx 第 14 行**

将：
```tsx
<div className="max-w-5xl mx-auto py-8 px-6">
```
改为：
```tsx
<div className="max-w-5xl mx-auto py-8 px-4 md:px-6">
```

- [ ] **Step 2: 修改 app/demos/page.tsx 第 9 行**

将：
```tsx
<div className="max-w-5xl mx-auto py-8 px-6">
```
改为：
```tsx
<div className="max-w-5xl mx-auto py-8 px-4 md:px-6">
```

- [ ] **Step 3: 修改 app/settings/page.tsx 第 8 行**

将：
```tsx
<div className="max-w-4xl mx-auto py-8 px-6">
```
改为：
```tsx
<div className="max-w-4xl mx-auto py-8 px-4 md:px-6">
```

- [ ] **Step 4: 修改 MarkdownViewer.tsx — 表格横向滚动**

在 `app/components/MarkdownViewer.tsx` 的 `<style>` 块中，将原有 table 样式：
```css
.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 16px;
}
```
替换为：
```css
.markdown-body table {
  border-collapse: collapse;
  display: block;
  width: max-content;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 16px;
}
```

- [ ] **Step 5: 修改 CodeViewer.tsx — padding 响应式**

将 `app/components/CodeViewer.tsx` 第 98 行：
```tsx
<pre className="p-4 m-0 text-sm leading-relaxed">
```
改为：
```tsx
<pre className="p-3 md:p-4 m-0 text-sm leading-relaxed">
```

- [ ] **Step 6: 在浏览器验证各页面**

打开 http://localhost:3000，切换到 375px 视图，逐一检查：
- [ ] 首页：内边距正常（无内容贴边），统计卡片单列堆叠
- [ ] `/demos`：Demo 卡片单列，内边距正常
- [ ] `/settings`：设置页内容正常，无水平溢出
- [ ] 打开一篇含表格的 Markdown 文档：长表格可横向滚动（手指滑动或鼠标横向拖拽）
- [ ] 打开一篇含代码块的文档：代码块 padding 在移动端更紧凑

- [ ] **Step 7: 桌面端回归检查（1024px）**

切换回桌面宽度：
- [ ] 首页、Demos、Settings 布局与改动前一致
- [ ] 文档页左侧 TOC 侧边栏正常，无移动端 TOC 块

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx app/demos/page.tsx app/settings/page.tsx app/components/MarkdownViewer.tsx app/components/CodeViewer.tsx
git commit -m "feat: responsive spacing and content rendering fixes for mobile"
```

---

## 最终验证

- [ ] 运行 `npm run build` 确认无构建错误
- [ ] 移动端（375px）完整体验一遍：首页 → 点击文档 → 阅读文档（含 TOC 折叠） → Demos → 设置
- [ ] Drawer 打开时背景不可滚动（shadcn/ui Sheet 默认行为，确认生效）
- [ ] 桌面端（1024px）完整体验一遍，确认无回归
