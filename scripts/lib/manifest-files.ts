export function shouldIncludeManifestFile(filename: string): boolean {
  return !filename.startsWith('.')
}
