export interface AnchorScrollPosition {
  currentScrollTop: number
  containerTop: number
  targetTop: number
  offset?: number
}

export function decodeAnchorHash(hash: string) {
  const value = hash.startsWith('#') ? hash.slice(1) : hash
  if (!value) return ''

  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function getAnchorScrollTop({
  currentScrollTop,
  containerTop,
  targetTop,
  offset = 16,
}: AnchorScrollPosition) {
  return Math.max(0, currentScrollTop + targetTop - containerTop - offset)
}

export function matchesAnchorId(candidateId: string, requestedId: string) {
  const candidate = candidateId.toLowerCase()
  const requested = requestedId.toLowerCase()

  return candidate === requested || candidate.startsWith(`${requested}-`)
}

function isScrollable(element: HTMLElement) {
  const style = window.getComputedStyle(element)
  return /(auto|scroll|overlay)/.test(style.overflowY) && element.scrollHeight > element.clientHeight
}

function findScrollContainer(target: HTMLElement) {
  let parent = target.parentElement

  while (parent) {
    if (isScrollable(parent)) return parent
    parent = parent.parentElement
  }

  return null
}

function findAnchorTarget(id: string) {
  const exactTarget = document.getElementById(id)
  if (exactTarget) return exactTarget

  return Array.from(document.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'))
    .find((heading) => matchesAnchorId(heading.id, id)) ?? null
}

export function scrollToAnchor(hash: string, behavior: ScrollBehavior = 'auto') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false

  const id = decodeAnchorHash(hash)
  if (!id) return false

  const target = findAnchorTarget(id)
  if (!target) return false

  const container = findScrollContainer(target)
  const targetRect = target.getBoundingClientRect()

  if (container) {
    const containerRect = container.getBoundingClientRect()
    container.scrollTo({
      top: getAnchorScrollTop({
        currentScrollTop: container.scrollTop,
        containerTop: containerRect.top,
        targetTop: targetRect.top,
      }),
      behavior,
    })
  } else {
    window.scrollTo({
      top: Math.max(0, window.scrollY + targetRect.top - 16),
      behavior,
    })
  }

  return true
}
