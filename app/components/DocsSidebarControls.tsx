'use client'

import { createContext, useContext } from 'react'

export interface DocsSidebarControls {
  collapse: () => void
}

const DocsSidebarControlsContext = createContext<DocsSidebarControls | null>(null)

export function DocsSidebarControlsProvider({
  value,
  children,
}: {
  value: DocsSidebarControls
  children: React.ReactNode
}) {
  return (
    <DocsSidebarControlsContext.Provider value={value}>
      {children}
    </DocsSidebarControlsContext.Provider>
  )
}

export function useDocsSidebarControls() {
  return useContext(DocsSidebarControlsContext)
}
