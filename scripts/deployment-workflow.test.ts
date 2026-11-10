import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const workflow = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8')

test('CI validates the committed publication without a second deployment or content sync', () => {
  assert.doesNotMatch(workflow, /vercel\/action-deploy|VERCEL_TOKEN|git clone|npm run sync/)
  assert.match(workflow, /npm run build/)
  assert.match(workflow, /tsx --test/)
})
