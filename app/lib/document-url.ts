export function encodeDocumentPath(slug: string) {
  return slug.split('/').map(encodeURIComponent).join('/')
}

export function getDocumentPublicUrl(slug: string) {
  return `/content/docs/${encodeDocumentPath(slug)}`
}
