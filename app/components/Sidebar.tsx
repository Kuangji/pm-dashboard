'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FileText,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  PlayCircle,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: '仪表盘', icon: LayoutDashboard },
  { href: '/docs', label: '文档', icon: FileText },
  { href: '/demos', label: 'Demos', icon: PlayCircle },
  { href: '/settings', label: '设置', icon: Settings },
]

interface SidebarLinksProps {
  compact?: boolean
}

export function SidebarLinks({ compact = false }: SidebarLinksProps) {
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
                'flex items-center rounded-lg text-sm font-medium transition-colors',
                compact ? 'justify-center px-2 py-2.5' : 'gap-3 px-4 py-2.5',
                isActive
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              )}
              title={compact ? item.label : undefined}
            >
              <Icon className="w-4 h-4" />
              <span className={compact ? 'sr-only' : undefined}>{item.label}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

interface SidebarProps {
  compact: boolean
  temporarilyExpanded: boolean
  onToggleCompact: () => void
  onPointerEnter: () => void
  onPointerLeave: () => void
  onFocusCapture: () => void
  onBlurCapture: (event: React.FocusEvent<HTMLElement>) => void
}

export function Sidebar({
  compact,
  temporarilyExpanded,
  onToggleCompact,
  onPointerEnter,
  onPointerLeave,
  onFocusCapture,
  onBlurCapture,
}: SidebarProps) {
  const showLabels = !compact || temporarilyExpanded

  return (
    <aside
      className={cn(
        'h-screen bg-zinc-50 border-r border-zinc-200 shrink-0 relative overflow-hidden',
        showLabels ? 'min-w-0' : 'w-full'
      )}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
    >
      <div className={cn('border-b border-zinc-200', showLabels ? 'p-6' : 'flex justify-center p-3')}>
        {showLabels ? (
          <>
            <h1 className="text-xl font-bold text-zinc-900">PM Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-1">产品管理系统</p>
          </>
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-xs font-semibold text-white">
            PM
          </span>
        )}
      </div>

      <nav className={cn(showLabels ? 'px-4 pt-4' : 'px-2 pt-4')}>
        <SidebarLinks compact={!showLabels} />
      </nav>

      <div className={cn(
        'absolute bottom-0 left-0 right-0 border-t border-zinc-200',
        showLabels ? 'p-4' : 'flex flex-col items-center gap-3 p-2'
      )}>
        <button
          type="button"
          onClick={onToggleCompact}
          aria-label={showLabels ? '收起主导航文字' : '展开主导航文字'}
          title={showLabels ? '收起主导航文字' : '展开主导航文字'}
          className={cn(
            'flex items-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0969da]',
            showLabels ? 'w-full gap-2 px-2 py-2 text-sm' : 'justify-center p-2'
          )}
        >
          {showLabels ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          {showLabels && <span>收起文字</span>}
        </button>
        {showLabels && <p className="mt-3 text-xs text-zinc-400">v1.0.0</p>}
      </div>
    </aside>
  )
}
