import assert from 'node:assert/strict'
import test from 'node:test'
import { shouldShowMainNavLabels } from './main-nav'

test('keeps main navigation labels hidden in compact mode', () => {
  assert.equal(shouldShowMainNavLabels(true), false)
  assert.equal(shouldShowMainNavLabels(false), true)
})
