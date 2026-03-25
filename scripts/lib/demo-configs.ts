import { promises as fs } from 'fs'
import path from 'path'

export async function hasMissingDemoConfigFiles(demosDir: string): Promise<boolean> {
  try {
    const entries = await fs.readdir(demosDir, { withFileTypes: true })

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue
      }

      const demoPath = path.join(demosDir, entry.name)
      const indexPath = path.join(demoPath, 'index.html')
      const configPath = path.join(demoPath, 'demo.json')

      try {
        await fs.access(indexPath)
      } catch {
        continue
      }

      try {
        await fs.access(configPath)
      } catch {
        return true
      }
    }

    return false
  } catch {
    return false
  }
}
