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
