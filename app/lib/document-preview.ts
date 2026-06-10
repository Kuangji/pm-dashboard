import { detectFileType } from './file-types'

export const MAX_INLINE_PREVIEW_BYTES = 2 * 1024 * 1024

const NON_PREVIEW_DATA_FILE_PATTERNS = [
  /(?:^|\/)records\.(?:raw|normalized)\.json$/i,
  /(?:^|\/)run_meta\.json$/i,
  /(?:^|\/)scores\.json$/i,
  /(?:^|\/)badcases\.csv$/i,
  /(?:^|\/)summary\.csv$/i,
  /(?:^|\/)review-package\.jsonl(?:\.gz)?$/i,
]

export function shouldPreviewDocumentContent(filePath: string, sizeBytes: number) {
  const normalizedPath = filePath.replace(/\\/g, '/')
  const fileName = normalizedPath.split('/').pop() || normalizedPath
  const fileTypeInfo = detectFileType(fileName)

  if (fileTypeInfo.category === 'markdown') return true
  if (NON_PREVIEW_DATA_FILE_PATTERNS.some((pattern) => pattern.test(normalizedPath))) return false

  return sizeBytes <= MAX_INLINE_PREVIEW_BYTES
}
