'use client'

import { useEffect, useRef, useState } from 'react'
import { Group, Panel, Separator, usePanelRef, type Layout } from 'react-resizable-panels'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { useMediaQuery } from './useMediaQuery'
import { usePersistentPanelLayout } from './usePersistentPanelLayout'
import {
  MAIN_NAV_MODES,
  shouldPersistPanelLayout,
  usePersistentPanelMode,
} from './usePersistentPanelMode'

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
  const [mainNavMode, setMainNavMode] = usePersistentPanelMode({
    storageKey: 'pm-dashboard-app-shell-sidebar-mode',
    values: MAIN_NAV_MODES,
    fallback: 'expanded',
  })
  const mainPanelRef = usePanelRef()
  const mainNavModeRef = useRef(mainNavMode)
  const mainNavExpandedSizeRef = useRef(layout.defaultLayout['app-sidebar'] ?? 18)
  const programmaticResizeRef = useRef(false)
  const interactionRef = useRef({ pointer: false, focus: false })
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mainNavTransientExpanded, setMainNavTransientExpanded] = useState(false)

  function releaseProgrammaticResize() {
    if (typeof window === 'undefined') {
      programmaticResizeRef.current = false
      return
    }

    window.requestAnimationFrame(() => {
      programmaticResizeRef.current = false
    })
  }

  function resizeMainPanel(size: string) {
    const panel = mainPanelRef.current
    if (!panel) return

    programmaticResizeRef.current = true
    panel.resize(size)
    releaseProgrammaticResize()
  }

  function clearLeaveTimer() {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
  }

  function collapseMainNavAfterInteraction() {
    clearLeaveTimer()
    leaveTimerRef.current = setTimeout(() => {
      leaveTimerRef.current = null
      if (
        mainNavModeRef.current !== 'compact' ||
        interactionRef.current.pointer ||
        interactionRef.current.focus
      ) {
        return
      }

      setMainNavTransientExpanded(false)
      resizeMainPanel('56px')
    }, 120)
  }

  function expandMainNavForInteraction() {
    clearLeaveTimer()
    if (mainNavModeRef.current !== 'compact') return

    setMainNavTransientExpanded(true)
    resizeMainPanel(`${mainNavExpandedSizeRef.current}%`)
  }

  function handleMainNavModeToggle() {
    clearLeaveTimer()
    interactionRef.current = { pointer: false, focus: false }
    setMainNavTransientExpanded(false)

    const nextMode = mainNavModeRef.current === 'compact' ? 'expanded' : 'compact'
    mainNavModeRef.current = nextMode
    setMainNavMode(nextMode)
  }

  function handleMainNavPointerEnter() {
    interactionRef.current.pointer = true
    expandMainNavForInteraction()
  }

  function handleMainNavPointerLeave() {
    interactionRef.current.pointer = false
    collapseMainNavAfterInteraction()
  }

  function handleMainNavFocusCapture() {
    interactionRef.current.focus = true
    expandMainNavForInteraction()
  }

  function handleMainNavBlurCapture(event: React.FocusEvent<HTMLElement>) {
    const relatedTarget = event.relatedTarget as Node | null
    if (relatedTarget && event.currentTarget.contains(relatedTarget)) return

    interactionRef.current.focus = false
    collapseMainNavAfterInteraction()
  }

  function handleLayoutChanged(nextLayout: Layout) {
    if (!shouldPersistPanelLayout(mainNavModeRef.current, programmaticResizeRef.current)) return

    const size = nextLayout['app-sidebar']
    if (typeof size === 'number') {
      mainNavExpandedSizeRef.current = size
      layout.onLayoutChanged(nextLayout)
    }
  }

  useEffect(() => {
    mainNavModeRef.current = mainNavMode

    const panel = mainPanelRef.current
    if (!panel) return

    programmaticResizeRef.current = true
    panel.resize(mainNavMode === 'compact' ? '56px' : `${mainNavExpandedSizeRef.current}%`)

    if (typeof window === 'undefined') {
      programmaticResizeRef.current = false
    } else {
      window.requestAnimationFrame(() => {
        programmaticResizeRef.current = false
      })
    }
  }, [isDesktop, mainNavMode, mainPanelRef])

  useEffect(() => {
    return () => clearLeaveTimer()
  }, [])

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
            onLayoutChanged={handleLayoutChanged}
          >
            <Panel
              id="app-sidebar"
              panelRef={mainPanelRef}
              defaultSize="18%"
              minSize="220px"
              maxSize="28%"
              collapsedSize="56px"
              collapsible
              className="min-w-0 overflow-visible"
            >
              <Sidebar
                compact={mainNavMode === 'compact'}
                temporarilyExpanded={mainNavTransientExpanded}
                onToggleCompact={handleMainNavModeToggle}
                onPointerEnter={handleMainNavPointerEnter}
                onPointerLeave={handleMainNavPointerLeave}
                onFocusCapture={handleMainNavFocusCapture}
                onBlurCapture={handleMainNavBlurCapture}
              />
            </Panel>
            <Separator
              disabled={mainNavMode === 'compact'}
              className={`group relative bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0969da] ${
                mainNavMode === 'compact'
                  ? 'pointer-events-none w-0'
                  : 'w-1 hover:bg-[#0969da]/20'
              }`}
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
