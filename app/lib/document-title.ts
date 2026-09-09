import matter from 'gray-matter'

interface ResolveDocumentTitleOptions {
  fileName: string
  rawContent: string
  isMarkdown: boolean
}

function findFirstMarkdownH1(content: string): string | undefined {
  const lines = content.split(/\r?\n/)
  let fenceCharacter: string | null = null
  let fenceLength = 0

  for (const line of lines) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/)
    if (fenceMatch) {
      const marker = fenceMatch[1]
      const markerCharacter = marker[0]

      if (fenceCharacter === null) {
        fenceCharacter = markerCharacter
        fenceLength = marker.length
      } else if (markerCharacter === fenceCharacter && marker.length >= fenceLength) {
        fenceCharacter = null
        fenceLength = 0
      }
      continue
    }

    if (fenceCharacter !== null) continue

    const headingMatch = line.match(/^\s{0,3}#(?!#)[ \t]+(.+?)\s*$/)
    if (!headingMatch) continue

    const title = headingMatch[1].replace(/[ \t]+#+[ \t]*$/, '').trim()
    if (title) return title
  }

  return undefined
}

export function resolveDocumentTitle({
  fileName,
  rawContent,
  isMarkdown,
}: ResolveDocumentTitleOptions): string {
  if (!isMarkdown) return fileName

  let markdown = rawContent
  try {
    markdown = matter(rawContent).content
  } catch {
    // Keep the raw content if optional frontmatter is malformed.
  }

  const heading = findFirstMarkdownH1(markdown)
  return heading ? `${heading} | ${fileName}` : fileName
}
