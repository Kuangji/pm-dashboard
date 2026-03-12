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
