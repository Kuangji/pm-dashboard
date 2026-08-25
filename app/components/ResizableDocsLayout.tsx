'use client'

import { useEffect, useRef } from 'react'
import { PanelLeftOpen } from 'lucide-react'
import { Group, Panel, Separator, usePanelRef, type Layout } from 'react-resizable-panels'
import { DocsSidebarControlsProvider } from './DocsSidebarControls'
import { useMediaQuery } from './useMediaQuery'
import { usePersistentPanelLayout } from './usePersistentPanelLayout'
import {
  DOCS_NAV_MODES,
  shouldPersistPanelLayout,
  usePersistentPanelMode,
} from './usePersistentPanelMode'

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
  const [docsSidebarMode, setDocsSidebarMode] = usePersistentPanelMode({
    storageKey: 'pm-dashboard-docs-sidebar-mode',
    values: DOCS_NAV_MODES,
    fallback: 'expanded',
  })
  const docsPanelRef = usePanelRef()
  const docsSidebarModeRef = useRef(docsSidebarMode)
  const docsSidebarExpandedSizeRef = useRef(layout.defaultLayout['docs-sidebar'] ?? 24)
  const programmaticResizeRef = useRef(false)

  function handleDocsLayoutChanged(nextLayout: Layout) {
    if (!shouldPersistPanelLayout(docsSidebarModeRef.current, programmaticResizeRef.current)) return

    const size = nextLayout['docs-sidebar']
    if (typeof size === 'number') {
      docsSidebarExpandedSizeRef.current = size
      layout.onLayoutChanged(nextLayout)
    }
  }

  function collapseDocsSidebar() {
    docsSidebarModeRef.current = 'collapsed'
    setDocsSidebarMode('collapsed')
  }

  useEffect(() => {
    docsSidebarModeRef.current = docsSidebarMode

    const panel = docsPanelRef.current
    if (!panel) return

    programmaticResizeRef.current = true
    panel.resize(docsSidebarMode === 'collapsed' ? '0px' : `${docsSidebarExpandedSizeRef.current}%`)

    if (typeof window === 'undefined') {
      programmaticResizeRef.current = false
    } else {
      window.requestAnimationFrame(() => {
        programmaticResizeRef.current = false
      })
    }
  }, [docsPanelRef, docsSidebarMode])

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
            onLayoutChanged={handleDocsLayoutChanged}
          >
            <Panel
              id="docs-sidebar"
              panelRef={docsPanelRef}
              defaultSize="24%"
              minSize="240px"
              maxSize="38%"
              collapsedSize="0px"
              collapsible
              className="min-w-0 overflow-hidden"
            >
              <DocsSidebarControlsProvider value={{ collapse: collapseDocsSidebar }}>
                {sidebar}
              </DocsSidebarControlsProvider>
            </Panel>
            <Separator
              disabled={docsSidebarMode === 'collapsed'}
              className={`group relative bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0969da] ${
                docsSidebarMode === 'collapsed'
                  ? 'pointer-events-none w-0'
                  : 'w-1 hover:bg-[#0969da]/20'
              }`}
              aria-label="调整文档目录宽度"
            >
              <span className="absolute left-1/2 top-1/2 h-12 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d0d7de] opacity-0 transition-opacity group-hover:opacity-100 group-data-[separator-active]:opacity-100" />
            </Separator>
            <Panel id="docs-main" minSize="50%">
              <div className="relative h-screen min-w-0">
                {docsSidebarMode === 'collapsed' && (
                  <button
                    type="button"
                    aria-label="展开文档目录"
                    title="展开文档目录"
                    onClick={() => setDocsSidebarMode('expanded')}
                    className="absolute left-4 top-4 z-10 rounded-md p-2 text-[#57606a] hover:bg-[#eaeef2] hover:text-[#24292f] focus:outline-none focus:ring-2 focus:ring-[#0969da]"
                  >
                    <PanelLeftOpen className="h-4 w-4" />
                  </button>
                )}
                <main className="h-full overflow-y-auto min-w-0">
                  <div className="max-w-full md:max-w-[1012px] mx-auto px-8 py-8">{children}</div>
                </main>
              </div>
            </Panel>
          </Group>
        </div>
      )}
    </>
  )
}
