import { promises as fs } from 'fs'
import path from 'path'

export async function getNewestMtime(paths: string[]): Promise<number> {
  let newest = 0

  async function walk(target: string): Promise<void> {
    try {
      const targetStat = await fs.stat(target)
      if (!targetStat.isDirectory()) {
        newest = Math.max(newest, targetStat.mtimeMs)
        return
      }

      const entries = await fs.readdir(target, { withFileTypes: true })
      for (const entry of entries) {
        await walk(path.join(target, entry.name))
      }
    } catch {
      // Ignore missing or unreadable paths while checking freshness.
    }
  }

  for (const target of paths) {
    await walk(target)
  }

  return newest
}
