import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { DemoItem, NavItem } from './content'
import { flattenNavTree } from './content'

const execFileAsync = promisify(execFile)
const GIT_COMMIT_PREFIX = '---'

export type ActivityTargetType = 'doc' | 'demo'
export type ActivityChangeType = 'added' | 'modified' | 'deleted' | 'renamed'

export interface ActivityTarget {
  type: ActivityTargetType
  title: string
  href?: string
  path: string
}

export interface ContentActivity extends ActivityTarget {
  commit: string
  shortCommit: string
  committedAt: string
  message: string
  changeType: ActivityChangeType
}

export interface ActivitySummary {
  docs: ContentActivity[]
  demos: ContentActivity[]
  docCount: number
  demoCount: number
}

interface GitCommitContext {
  commit: string
  shortCommit: string
  committedAt: string
  message: string
}

function encodeSlug(slug: string) {
  return slug.split('/').map(encodeURIComponent).join('/')
}

function getChangeType(status: string): ActivityChangeType {
  if (status.startsWith('A')) return 'added'
  if (status.startsWith('D')) return 'deleted'
  if (status.startsWith('R')) return 'renamed'
  return 'modified'
}

function getDisplayTitle(path: string) {
  const parts = path.split('/').filter(Boolean)
  return parts.at(-1) || path
}

function findDocByPath(relativePath: string, docs: NavItem[]) {
  return docs.find((doc) => doc.path === relativePath || doc.slug === relativePath)
}

function findDemoById(demoId: string, demos: DemoItem[]) {
  return demos.find((demo) => demo.id === demoId || demo.path === `demos/${demoId}/index.html`)
}

export function mapChangedPathToActivityTarget(
  changedPath: string,
  docs: NavItem[],
  demos: DemoItem[]
): ActivityTarget | null {
  const docsPrefix = 'public/content/docs/'
  const demosPrefix = 'public/demos/'

  if (changedPath.startsWith(docsPrefix)) {
    const path = changedPath.slice(docsPrefix.length)
    const doc = findDocByPath(path, docs)
    return {
      type: 'doc',
      title: doc?.name || getDisplayTitle(path),
      href: doc?.slug ? `/docs/${encodeSlug(doc.slug)}` : undefined,
      path,
    }
  }

  if (changedPath.startsWith(demosPrefix)) {
    const path = changedPath.slice(demosPrefix.length)
    const demoId = path.split('/')[0]
    const demo = findDemoById(demoId, demos)
    return {
      type: 'demo',
      title: demo?.title || demoId,
      href: demoId ? `/demos/${encodeURIComponent(demoId)}` : undefined,
      path,
    }
  }

  return null
}

function parseCommitLine(line: string): GitCommitContext | null {
  if (!line.startsWith(GIT_COMMIT_PREFIX)) return null

  const [commit = '', shortCommit = '', committedAt = '', ...messageParts] = line
    .slice(GIT_COMMIT_PREFIX.length)
    .split('\t')

  if (!commit || !shortCommit || !committedAt) return null

  return {
    commit,
    shortCommit,
    committedAt,
    message: messageParts.join('\t'),
  }
}

export function parseGitActivityLog(
  logOutput: string,
  docs: NavItem[],
  demos: DemoItem[]
): ContentActivity[] {
  const activities: ContentActivity[] = []
  let currentCommit: GitCommitContext | null = null

  for (const line of logOutput.split('\n')) {
    if (!line.trim()) continue

    const commit = parseCommitLine(line)
    if (commit) {
      currentCommit = commit
      continue
    }

    if (!currentCommit) continue

    const [status = '', firstPath = '', renamedPath] = line.split('\t')
    const changedPath = status.startsWith('R') && renamedPath ? renamedPath : firstPath
    const target = mapChangedPathToActivityTarget(changedPath, docs, demos)

    if (!target) continue

    activities.push({
      ...target,
      ...currentCommit,
      changeType: getChangeType(status),
    })
  }

  return activities
}

function dedupeActivities(activities: ContentActivity[]) {
  const seen = new Set<string>()
  return activities.filter((activity) => {
    const key = `${activity.type}:${activity.path}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function summarizeActivities(
  activities: ContentActivity[],
  limitPerType = 6
): ActivitySummary {
  const deduped = dedupeActivities(activities)
  const docs = deduped.filter((activity) => activity.type === 'doc')
  const demos = deduped.filter((activity) => activity.type === 'demo')

  return {
    docs: docs.slice(0, limitPerType),
    demos: demos.slice(0, limitPerType),
    docCount: docs.length,
    demoCount: demos.length,
  }
}

export async function readRecentContentActivity(
  navItems: NavItem[],
  demos: DemoItem[],
  options: { commitLimit?: number; itemLimit?: number } = {}
): Promise<ActivitySummary> {
  const docs = flattenNavTree(navItems)
  const commitLimit = String(options.commitLimit ?? 30)

  try {
    const { stdout } = await execFileAsync('git', [
      'log',
      `--max-count=${commitLimit}`,
      '--name-status',
      '--pretty=format:---%H%x09%h%x09%cI%x09%s',
      '--',
      'public/content/docs',
      'public/demos',
    ])

    return summarizeActivities(
      parseGitActivityLog(stdout, docs, demos),
      options.itemLimit ?? 6
    )
  } catch {
    return summarizeActivities([], options.itemLimit ?? 6)
  }
}
