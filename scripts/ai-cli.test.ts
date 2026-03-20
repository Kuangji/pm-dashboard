import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readdir, readFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { invokeAiJson } from './lib/ai-cli'

test('logs raw output and throws a clear error when kimi returns empty stdout', async () => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'ai-cli-log-'))

  await assert.rejects(
    invokeAiJson({
      prompt: 'return json',
      purpose: 'unit-test',
      logDir: tempDir,
      runAgent: () => ({
        status: 0,
        signal: null,
        stdout: '\n',
        stderr: '',
      }),
    }),
    /empty stdout/i
  )

  const files = await readdir(tempDir)
  assert.equal(files.length, 1)

  const logContent = await readFile(path.join(tempDir, files[0]), 'utf-8')
  const log = JSON.parse(logContent)

  assert.equal(log.cli, 'kimi')
  assert.equal(log.status, 0)
  assert.equal(log.stdout, '\n')
  assert.equal(log.stderr, '')
  assert.equal(log.prompt, 'return json')
  assert.match(log.error, /empty stdout/i)
})

test('parses valid json and still records a trace log', async () => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'ai-cli-log-'))

  const result = await invokeAiJson<{ ok: true }>({
    prompt: 'return json',
    purpose: 'unit-test',
    logDir: tempDir,
    runAgent: () => ({
      status: 0,
      signal: null,
      stdout: '{"ok":true}\n',
      stderr: '',
    }),
  })

  assert.deepEqual(result, { ok: true })

  const files = await readdir(tempDir)
  assert.equal(files.length, 1)

  const logContent = await readFile(path.join(tempDir, files[0]), 'utf-8')
  const log = JSON.parse(logContent)

  assert.equal(log.cli, 'kimi')
  assert.equal(log.status, 0)
  assert.equal(log.stdout, '{"ok":true}\n')
  assert.equal(log.error, null)
})
