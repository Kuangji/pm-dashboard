'use client'

import { Group, Panel, Separator } from 'react-resizable-panels'
import { useMediaQuery } from './useMediaQuery'
import { usePersistentPanelLayout } from './usePersistentPanelLayout'

interface ResizableDocsLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}

export function ResizableDocsLayout({ sidebar, children }: ResizableDocsLayoutProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const layout = usePersistentPanelLayout({
    id: 'pm-dashboard-docs-layout',
    panelIds: ['docs-sidebar', 'docs-main'],
    fallbackLayout: { 'docs-sidebar': 24, 'docs-main': 76 },
  })

  return (
    <>
      {!isDesktop ? (
        <div className="bg-white">
          {sidebar}
          <main className="min-w-0">
            <div className="max-w-full px-4 py-4">{children}</div>
          </main>
        </div>
      ) : (
        <div className="h-screen bg-white overflow-hidden">
          <Group
            orientation="horizontal"
            defaultLayout={layout.defaultLayout}
            onLayoutChanged={layout.onLayoutChanged}
          >
            <Panel id="docs-sidebar" defaultSize="24%" minSize="240px" maxSize="38%" className="min-w-[240px]">
              {sidebar}
            </Panel>
            <Separator
              className="group relative w-1 bg-transparent transition-colors hover:bg-[#0969da]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0969da]"
              aria-label="调整文档目录宽度"
            >
              <span className="absolute left-1/2 top-1/2 h-12 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d0d7de] opacity-0 transition-opacity group-hover:opacity-100 group-data-[separator-active]:opacity-100" />
            </Separator>
            <Panel id="docs-main" minSize="50%">
              <main className="h-screen overflow-y-auto min-w-0">
                <div className="max-w-full md:max-w-[1012px] mx-auto px-8 py-8">{children}</div>
              </main>
            </Panel>
          </Group>
        </div>
      )}
    </>
  )
}
