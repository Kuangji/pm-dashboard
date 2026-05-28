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
  context: string
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
  items: ContentActivity[]
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

function mergeChangeType(
  current: ActivityChangeType,
  next: ActivityChangeType
): ActivityChangeType {
  if (current === next) return current
  if (current === 'deleted' && next === 'deleted') return 'deleted'
  if (current === 'added' && next === 'added') return 'added'
  return 'modified'
}

function humanizePathSegment(segment: string) {
  return segment.replace(/[-_]+/g, ' ').trim()
}

function findDocByPath(relativePath: string, docs: NavItem[]) {
  return docs.find((doc) => doc.path === relativePath || doc.slug === relativePath)
}

function findDocReadmeByProjectPath(projectPath: string, docs: NavItem[]) {
  return docs.find((doc) => {
    return doc.slug === `${projectPath}/README.md` || doc.path === `${projectPath}/README.md`
  })
}

function findDemoById(demoId: string, demos: DemoItem[]) {
  return demos.find((demo) => demo.id === demoId || demo.path === `demos/${demoId}/index.html`)
}

function getDocProjectInfo(relativePath: string) {
  const parts = relativePath.split('/').filter(Boolean)

  if (parts.length < 2) return null

  const projectDepth = parts[0] === '03-research' && parts[1] === 'channel-search-review'
    ? 3
    : Math.min(2, parts.length)

  const projectParts = parts.slice(0, projectDepth)
  const contextParts = parts.slice(0, Math.max(1, projectDepth - 1))
  const titleSegment = projectParts.at(-1) || parts[0]
  const contextSegment = contextParts.at(-1) || parts[0]

  return {
    projectPath: projectParts.join('/'),
    title: humanizePathSegment(titleSegment),
    context: humanizePathSegment(contextSegment),
  }
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
    const projectInfo = getDocProjectInfo(path)
    if (!projectInfo) return null

    const readme = findDocReadmeByProjectPath(projectInfo.projectPath, docs)
    const exactDoc = findDocByPath(path, docs)
    const hrefSlug = readme?.slug || exactDoc?.slug

    return {
      type: 'doc',
      title: projectInfo.title,
      context: projectInfo.context,
      href: hrefSlug ? `/docs/${encodeSlug(hrefSlug)}` : undefined,
      path: projectInfo.projectPath,
    }
  }

  if (changedPath.startsWith(demosPrefix)) {
    const path = changedPath.slice(demosPrefix.length)
    const demoId = path.split('/')[0]
    const demo = findDemoById(demoId, demos)
    return {
      type: 'demo',
      title: demo?.title || demoId,
      context: 'Demo',
      href: demoId ? `/demos/${encodeURIComponent(demoId)}` : undefined,
      path: demoId,
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
  const commitTargets = new Map<string, ContentActivity>()

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

    const key = `${currentCommit.commit}:${target.type}:${target.path}`
    const previous = commitTargets.get(key)
    const nextChangeType = getChangeType(status)

    if (previous) {
      previous.changeType = mergeChangeType(previous.changeType, nextChangeType)
      continue
    }

    const activity = {
      ...target,
      ...currentCommit,
      changeType: nextChangeType,
    }

    commitTargets.set(key, activity)
    activities.push(activity)
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
    items: deduped.slice(0, limitPerType * 2),
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
