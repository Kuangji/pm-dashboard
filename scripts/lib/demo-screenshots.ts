import { promises as fs } from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const SCREENSHOT_FILE_NAME = 'screenshot.png'
const SCREENSHOT_STALENESS_IGNORED_FILES = new Set([
  'demo.json',
  SCREENSHOT_FILE_NAME,
])
const CHROME_EXECUTABLE_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
]

export interface DemoScreenshotPaths {
  filePath: string
  publicPath: string
}

export interface CaptureDemoScreenshotOptions {
  demoPath: string
  screenshotPath: string
}

export interface EnsureDemoScreenshotOptions {
  demoId: string
  demoPath: string
  capture?: (options: CaptureDemoScreenshotOptions) => Promise<void>
}

export interface EnsureDemoScreenshotResult {
  filePath: string
  publicPath: string
  generated: boolean
}

export function getDemoScreenshotPaths(demoPath: string, demoId: string): DemoScreenshotPaths {
  return {
    filePath: path.join(demoPath, SCREENSHOT_FILE_NAME),
    publicPath: `/demos/${demoId}/${SCREENSHOT_FILE_NAME}`,
  }
}

async function getNewestScreenshotInputMtime(dir: string): Promise<number> {
  let newest = 0

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name)
      if (entry.isFile() && SCREENSHOT_STALENESS_IGNORED_FILES.has(entry.name)) {
        continue
      }

      if (entry.isDirectory()) {
        await walk(entryPath)
        continue
      }

      if (entry.isFile()) {
        const { mtimeMs } = await fs.stat(entryPath)
        newest = Math.max(newest, mtimeMs)
      }
    }
  }

  await walk(dir)
  return newest
}

async function needsScreenshot(demoPath: string, screenshotPath: string): Promise<boolean> {
  try {
    const screenshotStat = await fs.stat(screenshotPath)
    const newestDemoFileMtime = await getNewestScreenshotInputMtime(demoPath)
    return screenshotStat.mtimeMs < newestDemoFileMtime
  } catch {
    return true
  }
}

async function captureWithPlaywright({
  demoPath,
  screenshotPath,
}: CaptureDemoScreenshotOptions): Promise<void> {
  const { chromium } = await import('playwright')
  const executablePath = await resolveChromeExecutablePath()
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  })

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
    await page.goto(pathToFileURL(path.join(demoPath, 'index.html')).toString(), {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })
    await page.waitForTimeout(1000)
    await page.screenshot({ path: screenshotPath, fullPage: false })
  } finally {
    await browser.close()
  }
}

export async function resolveChromeExecutablePath(
  candidates = CHROME_EXECUTABLE_CANDIDATES,
): Promise<string | undefined> {
  for (const candidate of candidates) {
    try {
      await fs.access(candidate)
      return candidate
    } catch {
      // Try the next common local browser path.
    }
  }

  return undefined
}

export async function ensureDemoScreenshot({
  demoId,
  demoPath,
  capture = captureWithPlaywright,
}: EnsureDemoScreenshotOptions): Promise<EnsureDemoScreenshotResult> {
  const paths = getDemoScreenshotPaths(demoPath, demoId)

  if (!(await needsScreenshot(demoPath, paths.filePath))) {
    return {
      ...paths,
      generated: false,
    }
  }

  await capture({
    demoPath,
    screenshotPath: paths.filePath,
  })

  return {
    ...paths,
    generated: true,
  }
}

export async function hasMissingDemoScreenshots(demosDir: string): Promise<boolean> {
  try {
    const entries = await fs.readdir(demosDir, { withFileTypes: true })

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue
      }

      const demoPath = path.join(demosDir, entry.name)
      const indexPath = path.join(demoPath, 'index.html')
      try {
        await fs.access(indexPath)
      } catch {
        continue
      }

      const { filePath } = getDemoScreenshotPaths(demoPath, entry.name)
      if (await needsScreenshot(demoPath, filePath)) {
        return true
      }
    }

    return false
  } catch {
    return false
  }
}
