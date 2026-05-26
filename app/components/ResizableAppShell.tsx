'use client'

import { Group, Panel, Separator } from 'react-resizable-panels'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { useMediaQuery } from './useMediaQuery'
import { usePersistentPanelLayout } from './usePersistentPanelLayout'

interface ResizableAppShellProps {
  children: React.ReactNode
}

export function ResizableAppShell({ children }: ResizableAppShellProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const layout = usePersistentPanelLayout({
    id: 'pm-dashboard-app-shell',
    panelIds: ['app-sidebar', 'app-main'],
    fallbackLayout: { 'app-sidebar': 18, 'app-main': 82 },
  })

  return (
    <div className="min-h-screen overflow-x-hidden">
      {!isDesktop ? (
        <div>
          <MobileNav />
          <main className="bg-white min-w-0">{children}</main>
        </div>
      ) : (
        <div className="h-screen">
          <Group
            orientation="horizontal"
            defaultLayout={layout.defaultLayout}
            onLayoutChanged={layout.onLayoutChanged}
          >
            <Panel id="app-sidebar" defaultSize="18%" minSize="220px" maxSize="28%" className="min-w-[220px]">
              <Sidebar />
            </Panel>
            <Separator
              className="group relative w-1 bg-transparent transition-colors hover:bg-[#0969da]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0969da]"
              aria-label="调整主导航宽度"
            >
              <span className="absolute left-1/2 top-1/2 h-12 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d0d7de] opacity-0 transition-opacity group-hover:opacity-100 group-data-[separator-active]:opacity-100" />
            </Separator>
            <Panel id="app-main" minSize="55%">
              <main className="h-screen overflow-y-auto bg-white min-w-0">{children}</main>
            </Panel>
          </Group>
        </div>
      )}
    </div>
  )
}
