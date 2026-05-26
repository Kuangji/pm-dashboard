'use client'

import { useDefaultLayout, type Layout } from 'react-resizable-panels'

interface PersistentPanelLayoutOptions {
  id: string
  panelIds: string[]
  fallbackLayout: Layout
}

const noopStorage = {
  getItem: () => null,
  setItem: () => undefined,
}

const browserStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(key)
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, value)
  },
}

export function usePersistentPanelLayout({
  id,
  panelIds,
  fallbackLayout,
}: PersistentPanelLayoutOptions) {
  const layout = useDefaultLayout({
    id,
    panelIds,
    storage: typeof window === 'undefined' ? noopStorage : browserStorage,
  })

  return {
    defaultLayout: layout.defaultLayout ?? fallbackLayout,
    onLayoutChanged: layout.onLayoutChanged,
  }
}
