import assert from 'node:assert/strict'
import test from 'node:test'
import {
  readPersistedPanelMode,
  shouldPersistPanelLayout,
  writePersistedPanelMode,
} from './usePersistentPanelMode'

const values = ['expanded', 'compact'] as const

function createStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem(key: string) {
      return data.get(key) ?? null
    },
    setItem(key: string, value: string) {
      data.set(key, value)
    },
    value(key: string) {
      return data.get(key) ?? null
    },
  }
}

test('falls back when the mode key is missing or invalid', () => {
  const storage = createStorage({ bad: 'unknown' })

  assert.equal(readPersistedPanelMode(storage, 'missing', values, 'expanded'), 'expanded')
  assert.equal(readPersistedPanelMode(storage, 'bad', values, 'expanded'), 'expanded')
})

test('returns a valid stored mode', () => {
  const storage = createStorage({ mode: 'compact' })

  assert.equal(readPersistedPanelMode(storage, 'mode', values, 'expanded'), 'compact')
})

test('writes the selected mode as a string', () => {
  const storage = createStorage()

  writePersistedPanelMode(storage, 'mode', 'compact')

  assert.equal(storage.value('mode'), 'compact')
})

test('persists only ordinary user-driven panel layouts', () => {
  assert.equal(shouldPersistPanelLayout('expanded', false), true)
  assert.equal(shouldPersistPanelLayout('expanded', true), false)
  assert.equal(shouldPersistPanelLayout('compact', false), false)
  assert.equal(shouldPersistPanelLayout('collapsed', false), false)
})
