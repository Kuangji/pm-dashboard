import test from 'node:test'
import assert from 'node:assert/strict'
import {
  mapChangedPathToActivityTarget,
  parseGitActivityLog,
  summarizeActivities,
} from './git-activity'
import type { DemoItem, NavItem } from './content'

const docs: NavItem[] = [
  {
    type: 'file',
    name: 'README.md',
    path: '02-project-documents/search_experience_6310/README.md',
    slug: '02-project-documents/search_experience_6310/README.md',
  },
  {
    type: 'file',
    name: 'spec_v1.md',
    path: '02-project-documents/search_experience_6310/intelligent_curation/spec_v1.md',
    slug: '02-project-documents/search_experience_6310/intelligent_curation/spec_v1.md',
  },
]

const demos: DemoItem[] = [
  {
    id: 'search-experience-6310',
    title: '智能选品',
    description: '',
    path: 'demos/search-experience-6310/index.html',
    tags: [],
  },
]

test('maps changed paths to document and demo activity targets', () => {
  assert.deepEqual(
    mapChangedPathToActivityTarget('public/content/docs/02-project-documents/search_experience_6310/README.md', docs, demos),
    {
      type: 'doc',
      title: 'README.md',
      href: '/docs/02-project-documents/search_experience_6310/README.md',
      path: '02-project-documents/search_experience_6310/README.md',
    }
  )

  assert.deepEqual(
    mapChangedPathToActivityTarget('public/demos/search-experience-6310/index.html', docs, demos),
    {
      type: 'demo',
      title: '智能选品',
      href: '/demos/search-experience-6310',
      path: 'search-experience-6310/index.html',
    }
  )

  assert.equal(mapChangedPathToActivityTarget('app/page.tsx', docs, demos), null)
})

test('parses git log output into content activities', () => {
  const activities = parseGitActivityLog(
    `---1dd20393319f41f1f6a589a8ed30287c471d9f51\t1dd2039\t2026-05-28T10:00:08+08:00\tchore: sync publish content
M\tpublic/content/docs/02-project-documents/search_experience_6310/README.md
A\tpublic/demos/search-experience-6310/index.html
---f16640a111111111111111111111111111111111111\tf16640a\t2026-05-26T18:00:00+08:00\tfeat: preview table documents
M\tapp/page.tsx`,
    docs,
    demos
  )

  assert.equal(activities.length, 2)
  assert.equal(activities[0].title, 'README.md')
  assert.equal(activities[0].changeType, 'modified')
  assert.equal(activities[1].title, '智能选品')
  assert.equal(activities[1].changeType, 'added')
})

test('summarizes activity counts by type and recent items', () => {
  const summary = summarizeActivities(
    parseGitActivityLog(
      `---1dd20393319f41f1f6a589a8ed30287c471d9f51\t1dd2039\t2026-05-28T10:00:08+08:00\tchore: sync publish content
M\tpublic/content/docs/02-project-documents/search_experience_6310/README.md
A\tpublic/demos/search-experience-6310/index.html`,
      docs,
      demos
    )
  )

  assert.equal(summary.docs.length, 1)
  assert.equal(summary.demos.length, 1)
  assert.equal(summary.docCount, 1)
  assert.equal(summary.demoCount, 1)
})
