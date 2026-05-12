import test from 'node:test'
import assert from 'node:assert/strict'
import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'
import {
  ensureDemoScreenshot,
  getDemoScreenshotPaths,
  hasMissingDemoScreenshots,
  resolveChromeExecutablePath,
} from './lib/demo-screenshots'

test('builds the local and public screenshot paths for a demo', () => {
  const paths = getDemoScreenshotPaths('/repo/public/demos/example-demo', 'example-demo')

  assert.equal(paths.filePath, path.join('/repo/public/demos/example-demo', 'screenshot.png'))
  assert.equal(paths.publicPath, '/demos/example-demo/screenshot.png')
})

test('captures a screenshot when no screenshot exists yet', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-dashboard-demo-screenshots-'))

  try {
    const demoPath = path.join(root, 'fresh-demo')
    await fs.mkdir(demoPath, { recursive: true })
    await fs.writeFile(path.join(demoPath, 'index.html'), '<title>Fresh</title>', 'utf-8')

    const calls: string[] = []
    const result = await ensureDemoScreenshot({
      demoId: 'fresh-demo',
      demoPath,
      capture: async ({ screenshotPath }) => {
        calls.push(screenshotPath)
        await fs.writeFile(screenshotPath, 'png', 'utf-8')
      },
    })

    assert.equal(result.publicPath, '/demos/fresh-demo/screenshot.png')
    assert.equal(result.generated, true)
    assert.deepEqual(calls, [path.join(demoPath, 'screenshot.png')])
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

test('skips capture when screenshot is newer than demo files', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-dashboard-demo-screenshots-'))

  try {
    const demoPath = path.join(root, 'cached-demo')
    const indexPath = path.join(demoPath, 'index.html')
    const screenshotPath = path.join(demoPath, 'screenshot.png')
    await fs.mkdir(demoPath, { recursive: true })
    await fs.writeFile(indexPath, '<title>Cached</title>', 'utf-8')
    await fs.writeFile(screenshotPath, 'png', 'utf-8')

    const older = new Date('2026-01-01T00:00:00Z')
    const newer = new Date('2026-01-02T00:00:00Z')
    await fs.utimes(indexPath, older, older)
    await fs.utimes(screenshotPath, newer, newer)

    let captureCount = 0
    const result = await ensureDemoScreenshot({
      demoId: 'cached-demo',
      demoPath,
      capture: async () => {
        captureCount += 1
      },
    })

    assert.equal(result.publicPath, '/demos/cached-demo/screenshot.png')
    assert.equal(result.generated, false)
    assert.equal(captureCount, 0)
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

test('does not treat demo metadata changes as stale screenshot input', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-dashboard-demo-screenshots-'))

  try {
    const demoPath = path.join(root, 'metadata-demo')
    const indexPath = path.join(demoPath, 'index.html')
    const configPath = path.join(demoPath, 'demo.json')
    const screenshotPath = path.join(demoPath, 'screenshot.png')
    await fs.mkdir(demoPath, { recursive: true })
    await fs.writeFile(indexPath, '<title>Metadata</title>', 'utf-8')
    await fs.writeFile(configPath, '{"title":"Metadata"}\n', 'utf-8')
    await fs.writeFile(screenshotPath, 'png', 'utf-8')

    const older = new Date('2026-01-01T00:00:00Z')
    const middle = new Date('2026-01-02T00:00:00Z')
    const newer = new Date('2026-01-03T00:00:00Z')
    await fs.utimes(indexPath, older, older)
    await fs.utimes(screenshotPath, middle, middle)
    await fs.utimes(configPath, newer, newer)

    let captureCount = 0
    const result = await ensureDemoScreenshot({
      demoId: 'metadata-demo',
      demoPath,
      capture: async () => {
        captureCount += 1
      },
    })

    assert.equal(result.generated, false)
    assert.equal(captureCount, 0)
    assert.equal(await hasMissingDemoScreenshots(root), false)
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

test('detects demo directories that have an index.html but are missing or have stale screenshots', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-dashboard-demo-screenshots-'))

  try {
    const missingScreenshotDemo = path.join(root, 'missing-screenshot')
    const staleScreenshotDemo = path.join(root, 'stale-screenshot')
    const completeDemo = path.join(root, 'complete-demo')
    const ignoredDir = path.join(root, 'assets-only')

    await fs.mkdir(missingScreenshotDemo, { recursive: true })
    await fs.mkdir(staleScreenshotDemo, { recursive: true })
    await fs.mkdir(completeDemo, { recursive: true })
    await fs.mkdir(ignoredDir, { recursive: true })

    await fs.writeFile(path.join(missingScreenshotDemo, 'index.html'), '<title>Missing</title>', 'utf-8')
    await fs.writeFile(path.join(staleScreenshotDemo, 'index.html'), '<title>Stale</title>', 'utf-8')
    await fs.writeFile(path.join(staleScreenshotDemo, 'screenshot.png'), 'png', 'utf-8')
    await fs.writeFile(path.join(completeDemo, 'index.html'), '<title>Complete</title>', 'utf-8')
    await fs.writeFile(path.join(completeDemo, 'screenshot.png'), 'png', 'utf-8')
    await fs.writeFile(path.join(ignoredDir, 'notes.txt'), 'ignore me', 'utf-8')

    const older = new Date('2026-01-01T00:00:00Z')
    const newer = new Date('2026-01-02T00:00:00Z')
    await fs.utimes(path.join(staleScreenshotDemo, 'screenshot.png'), older, older)
    await fs.utimes(path.join(staleScreenshotDemo, 'index.html'), newer, newer)

    assert.equal(await hasMissingDemoScreenshots(root), true)
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

test('detects stale screenshots even when every demo has a screenshot file', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-dashboard-demo-screenshots-'))

  try {
    const demoPath = path.join(root, 'stale-only')
    const indexPath = path.join(demoPath, 'index.html')
    const screenshotPath = path.join(demoPath, 'screenshot.png')
    await fs.mkdir(demoPath, { recursive: true })
    await fs.writeFile(indexPath, '<title>Stale Only</title>', 'utf-8')
    await fs.writeFile(screenshotPath, 'png', 'utf-8')

    const older = new Date('2026-01-01T00:00:00Z')
    const newer = new Date('2026-01-02T00:00:00Z')
    await fs.utimes(screenshotPath, older, older)
    await fs.utimes(indexPath, newer, newer)

    assert.equal(await hasMissingDemoScreenshots(root), true)
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

test('resolves the first available local Chrome executable from candidates', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-dashboard-demo-screenshots-'))

  try {
    const missingCandidate = path.join(root, 'missing-chrome')
    const availableCandidate = path.join(root, 'chrome')
    await fs.writeFile(availableCandidate, '', 'utf-8')

    assert.equal(
      await resolveChromeExecutablePath([missingCandidate, availableCandidate]),
      availableCandidate,
    )
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})
