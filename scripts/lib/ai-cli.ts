import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const DEFAULT_LOG_DIR = path.join(process.cwd(), '.ai', 'logs')

interface AiRunResult {
  status: number | null
  signal: NodeJS.Signals | null
  stdout: string
  stderr: string
}

interface InvokeAiJsonOptions {
  prompt: string
  purpose: string
  timeoutMs?: number
  logDir?: string
  runAgent?: () => AiRunResult
}

function sanitizePurpose(purpose: string) {
  return purpose.replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-+|-+$/g, '') || 'ai-call'
}

function timestampForFilename(date: Date) {
  return date.toISOString().replace(/[:.]/g, '-')
}

async function writeAiLog(
  logDir: string,
  purpose: string,
  payload: Record<string, unknown>
) {
  await mkdir(logDir, { recursive: true })

  const filename = `${timestampForFilename(new Date())}-${sanitizePurpose(purpose)}.json`
  const logPath = path.join(logDir, filename)

  await writeFile(logPath, JSON.stringify(payload, null, 2) + '\n', 'utf-8')
  return logPath
}

function defaultRunAgent(prompt: string, timeoutMs: number): AiRunResult {
  const result = spawnSync(
    'kimi',
    ['--print', '--output-format', 'text', '--final-message-only', '-p', prompt],
    {
      encoding: 'utf-8',
      timeout: timeoutMs,
    }
  )

  if (result.error) {
    throw result.error
  }

  return {
    status: result.status,
    signal: result.signal,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  }
}

export async function invokeAiJson<T>({
  prompt,
  purpose,
  timeoutMs = 60000,
  logDir = DEFAULT_LOG_DIR,
  runAgent,
}: InvokeAiJsonOptions): Promise<T> {
  let result: AiRunResult

  try {
    result = runAgent ? runAgent() : defaultRunAgent(prompt, timeoutMs)
  } catch (error) {
    const logPath = await writeAiLog(logDir, purpose, {
      purpose,
      prompt,
      cwd: process.cwd(),
      cli: 'kimi',
      status: null,
      signal: null,
      stdout: '',
      stderr: '',
      error: error instanceof Error ? error.message : String(error),
    })

    throw new Error(`AI CLI execution failed for ${purpose}. Log: ${logPath}`)
  }

  const stdout = result.stdout ?? ''
  const stderr = result.stderr ?? ''
  const trimmedStdout = stdout.trim()

  let parsed: T | null = null
  let errorMessage: string | null = null

  if (result.status !== 0) {
    errorMessage = `AI CLI exited with status ${result.status}${stderr ? `: ${stderr.split('\n')[0]}` : ''}`
  } else if (!trimmedStdout) {
    errorMessage = 'AI CLI returned empty stdout'
  } else {
    const cleaned = trimmedStdout.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')

    try {
      parsed = JSON.parse(cleaned) as T
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : String(error)
    }
  }

  const logPath = await writeAiLog(logDir, purpose, {
    purpose,
    prompt,
    cwd: process.cwd(),
    cli: 'kimi',
    status: result.status,
    signal: result.signal,
    stdout,
    stderr,
    error: errorMessage,
  })

  if (errorMessage) {
    throw new Error(`AI CLI failed for ${purpose}: ${errorMessage}. Log: ${logPath}`)
  }

  return parsed as T
}
