import test from 'node:test'
import assert from 'node:assert/strict'
import { shouldIncludeManifestFile } from './lib/manifest-files'

test('includes unknown file extensions in the manifest', () => {
  assert.equal(shouldIncludeManifestFile('prototype_v1.pen'), true)
  assert.equal(shouldIncludeManifestFile('archive.bin'), true)
})

test('keeps hidden filesystem artifacts out of the manifest', () => {
  assert.equal(shouldIncludeManifestFile('.DS_Store'), false)
  assert.equal(shouldIncludeManifestFile('.gitkeep'), false)
})
