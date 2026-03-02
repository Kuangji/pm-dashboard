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

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-zinc-50 border-r border-zinc-200 h-screen sticky top-0 shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-zinc-900">PM Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">产品管理系统</p>
      </div>

      <nav className="px-4">
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
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-200">
        <p className="text-xs text-zinc-400">v1.0.0</p>
      </div>
    </aside>
  )
}
