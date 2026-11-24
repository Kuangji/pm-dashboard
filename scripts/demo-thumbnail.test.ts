import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveDemoThumbnail } from './lib/demo-thumbnail'

test('resolves a demo-local thumbnail to an absolute public path', () => {
  assert.equal(
    resolveDemoThumbnail('brand-monitor-portfolio-754', 'preview.png'),
    '/demos/brand-monitor-portfolio-754/preview.png',
  )
})

test('preserves already absolute and remote thumbnail URLs', () => {
  assert.equal(
    resolveDemoThumbnail('example-demo', '/demos/example-demo/screenshot.png'),
    '/demos/example-demo/screenshot.png',
  )
  assert.equal(
    resolveDemoThumbnail('example-demo', 'https://cdn.example.com/preview.png'),
    'https://cdn.example.com/preview.png',
  )
})

test('normalizes a dot-relative demo thumbnail', () => {
  assert.equal(resolveDemoThumbnail('example-demo', './assets/preview.png'), '/demos/example-demo/assets/preview.png')
})
