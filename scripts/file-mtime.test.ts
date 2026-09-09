import test from 'node:test'
import assert from 'node:assert/strict'
import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'
import { getNewestMtime } from './lib/file-mtime'

test('includes direct file paths when finding the newest modification time', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-dashboard-file-mtime-'))

  try {
    const filePath = path.join(root, 'input.ts')
    await fs.writeFile(filePath, 'export const value = 1\n', 'utf-8')

    const expectedMtime = new Date('2026-01-02T00:00:00Z')
    await fs.utimes(filePath, expectedMtime, expectedMtime)

    assert.equal(await getNewestMtime([filePath]), expectedMtime.getTime())
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})
