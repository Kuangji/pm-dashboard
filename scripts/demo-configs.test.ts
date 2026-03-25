import test from 'node:test'
import assert from 'node:assert/strict'
import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'
import { hasMissingDemoConfigFiles } from './lib/demo-configs'

test('detects demo directories that have an index.html but are missing demo.json', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-dashboard-demo-configs-'))

  try {
    const missingConfigDemo = path.join(root, 'missing-config')
    const completeDemo = path.join(root, 'complete-demo')
    const ignoredDir = path.join(root, 'assets-only')

    await fs.mkdir(missingConfigDemo, { recursive: true })
    await fs.mkdir(completeDemo, { recursive: true })
    await fs.mkdir(ignoredDir, { recursive: true })

    await fs.writeFile(path.join(missingConfigDemo, 'index.html'), '<title>Missing</title>', 'utf-8')
    await fs.writeFile(path.join(completeDemo, 'index.html'), '<title>Complete</title>', 'utf-8')
    await fs.writeFile(path.join(completeDemo, 'demo.json'), '{}\n', 'utf-8')
    await fs.writeFile(path.join(ignoredDir, 'notes.txt'), 'ignore me', 'utf-8')

    assert.equal(await hasMissingDemoConfigFiles(root), true)
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

test('returns false when every demo directory already has a demo.json', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-dashboard-demo-configs-'))

  try {
    const completeDemo = path.join(root, 'complete-demo')
    await fs.mkdir(completeDemo, { recursive: true })
    await fs.writeFile(path.join(completeDemo, 'index.html'), '<title>Complete</title>', 'utf-8')
    await fs.writeFile(path.join(completeDemo, 'demo.json'), '{}\n', 'utf-8')

    assert.equal(await hasMissingDemoConfigFiles(root), false)
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})
