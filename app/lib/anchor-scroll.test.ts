import test from 'node:test'
import assert from 'node:assert/strict'
import { decodeAnchorHash, getAnchorScrollTop } from './anchor-scroll'

test('decodes URL encoded anchor hashes without the leading hash marker', () => {
  assert.equal(decodeAnchorHash('#3-%E6%A0%B8%E5%BF%83%E5%90%8D%E8%AF%8D'), '3-核心名词')
  assert.equal(decodeAnchorHash('##plain'), '#plain')
  assert.equal(decodeAnchorHash(''), '')
})

test('calculates a scroll position relative to the scroll container', () => {
  assert.equal(getAnchorScrollTop({ currentScrollTop: 120, containerTop: 80, targetTop: 640, offset: 24 }), 656)
  assert.equal(getAnchorScrollTop({ currentScrollTop: 0, containerTop: 80, targetTop: 40, offset: 24 }), 0)
})
