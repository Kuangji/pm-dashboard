/**
 * File type detection and classification system
 * Supports multiple file types for the PM Dashboard document browser
 */

export type FileCategory = 'markdown' | 'text' | 'json' | 'yaml' | 'code' | 'image' | 'binary'

export interface FileTypeInfo {
  category: FileCategory
  mimeType: string
  language?: string
  icon: string
}

// Extension to file type mapping
export const FILE_TYPE_MAP: Record<string, FileTypeInfo> = {
  // Markdown
  '.md': { category: 'markdown', mimeType: 'text/markdown', icon: 'file-text' },
  '.mdx': { category: 'markdown', mimeType: 'text/mdx', icon: 'file-text' },

  // Text
  '.txt': { category: 'text', mimeType: 'text/plain', icon: 'file' },

  // JSON
  '.json': { category: 'json', mimeType: 'application/json', language: 'json', icon: 'file-json' },

  // YAML
  '.yaml': { category: 'yaml', mimeType: 'text/yaml', language: 'yaml', icon: 'file-code' },
  '.yml': { category: 'yaml', mimeType: 'text/yaml', language: 'yaml', icon: 'file-code' },

  // JavaScript / TypeScript
  '.js': { category: 'code', mimeType: 'text/javascript', language: 'javascript', icon: 'code' },
  '.jsx': { category: 'code', mimeType: 'text/jsx', language: 'jsx', icon: 'code' },
  '.ts': { category: 'code', mimeType: 'text/typescript', language: 'typescript', icon: 'code' },
  '.tsx': { category: 'code', mimeType: 'text/typescript-jsx', language: 'tsx', icon: 'code' },
  '.mjs': { category: 'code', mimeType: 'text/javascript', language: 'javascript', icon: 'code' },
  '.cjs': { category: 'code', mimeType: 'text/javascript', language: 'javascript', icon: 'code' },

  // Web
  '.html': { category: 'code', mimeType: 'text/html', language: 'html', icon: 'code' },
  '.htm': { category: 'code', mimeType: 'text/html', language: 'html', icon: 'code' },
  '.css': { category: 'code', mimeType: 'text/css', language: 'css', icon: 'code' },
  '.scss': { category: 'code', mimeType: 'text/scss', language: 'scss', icon: 'code' },
  '.sass': { category: 'code', mimeType: 'text/sass', language: 'sass', icon: 'code' },
  '.less': { category: 'code', mimeType: 'text/less', language: 'less', icon: 'code' },

  // Python
  '.py': { category: 'code', mimeType: 'text/x-python', language: 'python', icon: 'code' },
  '.pyw': { category: 'code', mimeType: 'text/x-python', language: 'python', icon: 'code' },

  // Ruby
  '.rb': { category: 'code', mimeType: 'text/x-ruby', language: 'ruby', icon: 'code' },

  // Go
  '.go': { category: 'code', mimeType: 'text/x-go', language: 'go', icon: 'code' },

  // Rust
  '.rs': { category: 'code', mimeType: 'text/x-rust', language: 'rust', icon: 'code' },

  // Java
  '.java': { category: 'code', mimeType: 'text/x-java', language: 'java', icon: 'code' },

  // C/C++
  '.c': { category: 'code', mimeType: 'text/x-c', language: 'c', icon: 'code' },
  '.cpp': { category: 'code', mimeType: 'text/x-c++', language: 'cpp', icon: 'code' },
  '.cc': { category: 'code', mimeType: 'text/x-c++', language: 'cpp', icon: 'code' },
  '.h': { category: 'code', mimeType: 'text/x-c', language: 'c', icon: 'code' },
  '.hpp': { category: 'code', mimeType: 'text/x-c++', language: 'cpp', icon: 'code' },

  // C#
  '.cs': { category: 'code', mimeType: 'text/x-csharp', language: 'csharp', icon: 'code' },

  // PHP
  '.php': { category: 'code', mimeType: 'text/x-php', language: 'php', icon: 'code' },

  // Shell
  '.sh': { category: 'code', mimeType: 'text/x-shellscript', language: 'bash', icon: 'code' },
  '.bash': { category: 'code', mimeType: 'text/x-shellscript', language: 'bash', icon: 'code' },
  '.zsh': { category: 'code', mimeType: 'text/x-shellscript', language: 'zsh', icon: 'code' },

  // Other languages
  '.swift': { category: 'code', mimeType: 'text/x-swift', language: 'swift', icon: 'code' },
  '.kt': { category: 'code', mimeType: 'text/x-kotlin', language: 'kotlin', icon: 'code' },
  '.scala': { category: 'code', mimeType: 'text/x-scala', language: 'scala', icon: 'code' },
  '.r': { category: 'code', mimeType: 'text/x-r', language: 'r', icon: 'code' },
  '.dart': { category: 'code', mimeType: 'text/x-dart', language: 'dart', icon: 'code' },
  '.lua': { category: 'code', mimeType: 'text/x-lua', language: 'lua', icon: 'code' },
  '.perl': { category: 'code', mimeType: 'text/x-perl', language: 'perl', icon: 'code' },
  '.pl': { category: 'code', mimeType: 'text/x-perl', language: 'perl', icon: 'code' },

  // Config files
  '.xml': { category: 'code', mimeType: 'text/xml', language: 'xml', icon: 'code' },
  '.svg': { category: 'image', mimeType: 'image/svg+xml', language: 'xml', icon: 'image' },
  '.sql': { category: 'code', mimeType: 'text/x-sql', language: 'sql', icon: 'code' },

  // Images
  '.png': { category: 'image', mimeType: 'image/png', icon: 'image' },
  '.jpg': { category: 'image', mimeType: 'image/jpeg', icon: 'image' },
  '.jpeg': { category: 'image', mimeType: 'image/jpeg', icon: 'image' },
  '.gif': { category: 'image', mimeType: 'image/gif', icon: 'image' },
  '.webp': { category: 'image', mimeType: 'image/webp', icon: 'image' },
  '.bmp': { category: 'image', mimeType: 'image/bmp', icon: 'image' },
  '.ico': { category: 'image', mimeType: 'image/x-icon', icon: 'image' },
}

// All supported extensions
export const SUPPORTED_EXTENSIONS = Object.keys(FILE_TYPE_MAP)

// Text-based file categories that can be read as text
export const TEXT_CATEGORIES: FileCategory[] = ['markdown', 'text', 'json', 'yaml', 'code']

// Image categories
export const IMAGE_CATEGORIES: FileCategory[] = ['image']

/**
 * Detect file type from filename or path
 */
export function detectFileType(filename: string): FileTypeInfo {
  const ext = getExtension(filename).toLowerCase()
  return FILE_TYPE_MAP[ext] || { category: 'binary', mimeType: 'application/octet-stream', icon: 'file' }
}

/**
 * Get file extension including the dot
 */
export function getExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  return lastDot >= 0 ? filename.slice(lastDot) : ''
}

/**
 * Check if a file is a text file (can be read as text)
 */
export function isTextFile(filename: string): boolean {
  const info = detectFileType(filename)
  return TEXT_CATEGORIES.includes(info.category)
}

/**
 * Check if a file is an image
 */
export function isImageFile(filename: string): boolean {
  const info = detectFileType(filename)
  return IMAGE_CATEGORIES.includes(info.category)
}

/**
 * Check if a file is a binary file (not text)
 */
export function isBinaryFile(filename: string): boolean {
  return !isTextFile(filename)
}

/**
 * Get the language for syntax highlighting
 */
export function getLanguage(filename: string): string | undefined {
  const info = detectFileType(filename)
  return info.language
}

/**
 * Get the MIME type for a file
 */
export function getMimeType(filename: string): string {
  const info = detectFileType(filename)
  return info.mimeType
}

/**
 * Get the file category
 */
export function getFileCategory(filename: string): FileCategory {
  const info = detectFileType(filename)
  return info.category
}

/**
 * Get the icon name for a file
 */
export function getFileIcon(filename: string): string {
  const info = detectFileType(filename)
  return info.icon
}

/**
 * Check if a file extension is supported
 */
export function isSupportedFile(filename: string): boolean {
  const ext = getExtension(filename).toLowerCase()
  return SUPPORTED_EXTENSIONS.includes(ext)
}
