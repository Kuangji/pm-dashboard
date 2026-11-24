export function resolveDemoThumbnail(demoId: string, thumbnail: string): string {
  const value = thumbnail.trim()
  if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|\/)/i.test(value)) {
    return value
  }

  return `/demos/${demoId}/${value.replace(/^(?:\.\/)+/, '')}`
}
