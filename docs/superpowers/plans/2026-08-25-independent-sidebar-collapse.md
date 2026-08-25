# Independent Sidebar Collapse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two independent desktop sidebar controls: a persistent main-navigation compact mode with in-place hover expansion, and a persistent document-tree collapse mode with a floating restore button.

**Architecture:** Keep the two existing `react-resizable-panels` groups and their layout storage keys. Add a small validated localStorage mode hook, let each layout owner control its panel through `usePanelRef`, and use a client context to let the server-rendered document sidebar request collapse without moving manifest loading into the client layout.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, `react-resizable-panels` 4.11, Lucide React, `node:test`, Playwright.

---

## File Map

- Create: `app/components/usePersistentPanelMode.ts` — validated mode storage and React hook.
- Test: `app/components/usePersistentPanelMode.test.ts` — fallback, validation, and write behavior.
- Create: `app/components/DocsSidebarControls.tsx` — client context connecting `ResizableDocsLayout` and `DocsSidebarClient`.
- Modify: `app/components/ResizableAppShell.tsx` — main-navigation mode, panel ref, transient hover/focus resize, and persistence suppression.
- Modify: `app/components/Sidebar.tsx` — compact icon rendering and bottom toggle control while preserving `SidebarLinks` use in mobile navigation.
- Modify: `app/components/ResizableDocsLayout.tsx` — document-tree mode, collapsible panel, floating restore button, and context provider.
- Modify: `app/components/DocsSidebarClient.tsx` — desktop bottom collapse button using the context; mobile TOC stays unchanged.
- Verify: existing `app/components`, `app/lib`, and `scripts` tests, lint, production build, and browser interaction checks.

### Task 1: Add validated persistent mode state

**Files:**
- Create: `app/components/usePersistentPanelMode.ts`
- Test: `app/components/usePersistentPanelMode.test.ts`

- [ ] **Step 1: Write the failing helper tests**

Create tests with an in-memory storage object. The tests must cover missing values, invalid values, valid values, and writes:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { readPersistedPanelMode, writePersistedPanelMode } from './usePersistentPanelMode'

const values = ['expanded', 'compact'] as const

function createStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem(key: string) {
      return data.get(key) ?? null
    },
    setItem(key: string, value: string) {
      data.set(key, value)
    },
    value(key: string) {
      return data.get(key) ?? null
    },
  }
}

test('falls back when the mode key is missing or invalid', () => {
  const storage = createStorage({ bad: 'unknown' })
  assert.equal(readPersistedPanelMode(storage, 'missing', values, 'expanded'), 'expanded')
  assert.equal(readPersistedPanelMode(storage, 'bad', values, 'expanded'), 'expanded')
})

test('returns a valid stored mode', () => {
  const storage = createStorage({ mode: 'compact' })
  assert.equal(readPersistedPanelMode(storage, 'mode', values, 'expanded'), 'compact')
})

test('writes the selected mode as a string', () => {
  const storage = createStorage()
  writePersistedPanelMode(storage, 'mode', 'compact')
  assert.equal(storage.value('mode'), 'compact')
})
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
npx tsx --test app/components/usePersistentPanelMode.test.ts
```

Expected: FAIL because `usePersistentPanelMode.ts` does not exist yet.

- [ ] **Step 3: Implement the minimal mode helper and hook**

Implement this public shape in `usePersistentPanelMode.ts`:

```ts
'use client'

import { useEffect, useState } from 'react'

export interface PanelModeStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
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
```

Use module-level `as const` arrays in consumers so the hook effect does not receive a new `values` array on every render:

```ts
export const MAIN_NAV_MODES = ['expanded', 'compact'] as const
export const DOCS_NAV_MODES = ['expanded', 'collapsed'] as const
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```bash
npx tsx --test app/components/usePersistentPanelMode.test.ts
```

Expected: 3 passing tests and 0 failures.

### Task 2: Implement the independent main-navigation mode

**Files:**
- Modify: `app/components/ResizableAppShell.tsx`
- Modify: `app/components/Sidebar.tsx`

- [ ] **Step 1: Add panel mode and resize refs in `ResizableAppShell`**

Import `useEffect`, `useRef`, `useState`, `Layout`, and `usePanelRef`. Use the existing `pm-dashboard-app-shell` layout hook and add:

```ts
const [mainNavMode, setMainNavMode] = usePersistentPanelMode({
  storageKey: 'pm-dashboard-app-shell-sidebar-mode',
  values: MAIN_NAV_MODES,
  fallback: 'expanded',
})
const mainPanelRef = usePanelRef()
const mainNavModeRef = useRef(mainNavMode)
const mainNavExpandedSizeRef = useRef(layout.defaultLayout['app-sidebar'] ?? 18)
const mainNavTransientRef = useRef(false)
const [mainNavTransientExpanded, setMainNavTransientExpanded] = useState(false)
const interactionRef = useRef({ pointer: false, focus: false })
const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
```

Wrap `layout.onLayoutChanged` so only an ordinary, non-transient main-navigation resize updates `pm-dashboard-app-shell` and `mainNavExpandedSizeRef`. Use `panelRef.resize(`${size}%`)` for restoration and `panelRef.resize('56px')` for compact mode. Set `collapsible` and `collapsedSize="56px"` on the main panel while retaining the current `minSize="220px"` and `maxSize="28%"` constraints.

- [ ] **Step 2: Add explicit mode and transient hover/focus transitions**

Implement these transitions in `ResizableAppShell`:

- On mode `compact`, clear transient state and resize to `56px` without invoking the persisted layout callback.
- On mode `expanded`, clear transient state and resize to the saved ordinary percentage.
- On pointer enter or focus capture while compact, cancel the leave timer, mark transient expanded, and resize to the saved ordinary percentage.
- On pointer leave or focus leaving the sidebar, wait 120ms and collapse only when neither pointer nor focus remains inside.
- When the bottom toggle changes the persistent mode, clear the transient timer/state before updating the mode.

Use a ref guard around programmatic `resize` calls so the callback cannot overwrite the ordinary layout while a transient operation is active. Add `aria-label="调整主导航宽度"` to the separator and pass `disabled={mainNavMode === 'compact'}` while compact.

- [ ] **Step 3: Update `Sidebar` for normal, compact, and transient-expanded rendering**

Add explicit props:

```ts
interface SidebarProps {
  compact: boolean
  temporarilyExpanded: boolean
  onToggleCompact: () => void
  onPointerEnter: () => void
  onPointerLeave: () => void
  onFocusCapture: () => void
  onBlurCapture: (event: React.FocusEvent<HTMLElement>) => void
}
```

Compute `showLabels = !compact || temporarilyExpanded`. Keep the existing navigation links and active-route logic, but apply centered icon-only styles and `title={item.label}` when labels are hidden. Render `PanelLeftClose`/`PanelLeftOpen` from `lucide-react` in the bottom toggle, with an accessible label and text only when labels are visible. Hide the product subtitle and version text in compact mode, while retaining the brand/icon anchor and footer control.

Preserve the current no-prop `SidebarLinks` call from `MobileNav`; desktop-only props are optional at the `SidebarLinks` boundary or are applied by a compact-aware wrapper in `Sidebar`.

- [ ] **Step 4: Run TypeScript/lint checks for the main-navigation changes**

Run:

```bash
npm run lint
npx tsc --noEmit
```

Expected: exit code 0 with no TypeScript errors or ESLint errors.

### Task 3: Implement the independent document-tree collapse mode

**Files:**
- Create: `app/components/DocsSidebarControls.tsx`
- Modify: `app/components/ResizableDocsLayout.tsx`
- Modify: `app/components/DocsSidebarClient.tsx`

- [ ] **Step 1: Add a client context for the server-rendered sidebar slot**

Create a context with this interface:

```ts
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
```

- [ ] **Step 2: Add the document-tree mode and floating restore button**

In `ResizableDocsLayout`, add `usePanelRef`, `usePersistentPanelMode`, a `docsSidebarModeRef`, and an expanded-size ref initialized from `layout.defaultLayout['docs-sidebar'] ?? 24`. Configure the docs panel with `collapsible`, `collapsedSize="0px"`, the existing `minSize="240px"` and `maxSize="38%"`, and suppress layout persistence while the panel is collapsed.

Wrap `{sidebar}` with `DocsSidebarControlsProvider`. The provider's `collapse` callback sets the persistent mode to `collapsed`. In the docs main panel, render a `PanelLeftOpen` icon button only when collapsed:

```tsx
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
```

Make the docs main wrapper `relative` so this button is positioned over the content without adding a block or vertical spacing. Disable/hide the docs separator while collapsed; keep its existing accessible label in ordinary mode.

- [ ] **Step 3: Add the ordinary-state collapse button to `DocsSidebarClient`**

Read `useDocsSidebarControls()` in the client component. In the desktop footer, render a `PanelLeftClose` icon button with `aria-label="缩入文档目录"`, `title="缩入文档目录"`, and `onClick={controls?.collapse}`. Do not add this control to the mobile TOC branch. Keep all tree expansion, current-file highlighting, and download links unchanged.

- [ ] **Step 4: Run TypeScript/lint checks for the document-tree changes**

Run:

```bash
npm run lint
npx tsc --noEmit
```

Expected: exit code 0 with no errors.

### Task 4: Run focused tests and browser acceptance

**Files:**
- Test: `app/components/usePersistentPanelMode.test.ts`
- Verify: `app/components/ResizableAppShell.tsx`, `app/components/ResizableDocsLayout.tsx`, `app/components/Sidebar.tsx`, `app/components/DocsSidebarClient.tsx`

- [ ] **Step 1: Run the focused and existing test suites**

Run:

```bash
npx tsx --test app/components/usePersistentPanelMode.test.ts app/components/LineNumberedCodeBlock.test.tsx app/components/mermaid-utils.test.ts app/lib/*.test.ts scripts/*.test.ts
```

Expected: all tests pass with zero failures.

- [ ] **Step 2: Run a production build**

Run:

```bash
npm run build
```

Expected: Next.js compilation, TypeScript validation, static page generation, and route optimization all complete successfully.

- [ ] **Step 3: Verify desktop interactions in a real browser**

Start the app with `npm run dev`, open a document page at a viewport of at least `1280x900`, and verify:

1. Main navigation starts ordinary and remains resizable.
2. Main navigation bottom toggle enters compact mode; labels disappear and the panel remains 56px wide.
3. Hovering the compact rail expands the same panel in place; no floating navigation panel is rendered; leaving returns to 56px.
4. Toggling the document tree collapses its panel to 0px and shows the floating restore button at the document content's top-left without increasing content height.
5. The restore button returns the previous directory width.
6. Test all four combinations and reload to confirm both modes persist independently.

- [ ] **Step 4: Verify the mobile boundary**

At a `375x812` viewport, confirm the existing `MobileNav` Sheet and inline document TOC remain available and no desktop rail, floating document button, or hover resize is shown.

### Task 5: Final verification and commit

- [ ] **Step 1: Run the full delivery checks**

Run:

```bash
npm run lint
npm run build
git diff --check
git status --short --branch
```

Expected: lint/build exit 0, no whitespace errors, and only the planned design/implementation/test files changed.

- [ ] **Step 2: Commit the implementation**

```bash
git add app/components/usePersistentPanelMode.ts app/components/usePersistentPanelMode.test.ts app/components/DocsSidebarControls.tsx app/components/ResizableAppShell.tsx app/components/Sidebar.tsx app/components/ResizableDocsLayout.tsx app/components/DocsSidebarClient.tsx
git commit -m "feat: add independent sidebar collapse modes"
```

Do not push automatically as part of this implementation step; report the commit and wait for the deployment request.
