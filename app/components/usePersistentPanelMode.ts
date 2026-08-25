'use client'

import { useEffect, useState } from 'react'

export interface PanelModeStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export const MAIN_NAV_MODES = ['expanded', 'compact'] as const
export const DOCS_NAV_MODES = ['expanded', 'collapsed'] as const

export function shouldPersistPanelLayout(mode: string, programmatic: boolean) {
  return mode === 'expanded' && !programmatic
}

function isAllowedMode<T extends string>(value: string | null, values: readonly T[]): value is T {
  return value !== null && values.includes(value as T)
}

export function readPersistedPanelMode<T extends string>(
  storage: PanelModeStorage | null,
  key: string,
  values: readonly T[],
  fallback: T,
): T {
  if (!storage) return fallback

  try {
    const value = storage.getItem(key)
    return isAllowedMode(value, values) ? value : fallback
  } catch {
    return fallback
  }
}

export function writePersistedPanelMode<T extends string>(
  storage: PanelModeStorage | null,
  key: string,
  value: T,
) {
  try {
    storage?.setItem(key, value)
  } catch {
    // Storage may be unavailable in private or restricted browsing contexts.
  }
}

function getBrowserStorage(): PanelModeStorage | null {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function usePersistentPanelMode<T extends string>({
  storageKey,
  values,
  fallback,
}: {
  storageKey: string
  values: readonly T[]
  fallback: T
}) {
  const [mode, setModeState] = useState(fallback)

  useEffect(() => {
    setModeState(readPersistedPanelMode(getBrowserStorage(), storageKey, values, fallback))
  }, [fallback, storageKey, values])

  function setMode(nextMode: T) {
    setModeState(nextMode)
    writePersistedPanelMode(getBrowserStorage(), storageKey, nextMode)
  }

  return [mode, setMode] as const
}
