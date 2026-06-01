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
    name: 'README.md',
    path: '03-research/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/README.md',
    slug: '03-research/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/README.md',
  },
  {
    type: 'file',
    name: 'spec_v1.md',
    path: '02-project-documents/search_experience_6310/intelligent_curation/spec_v1.md',
    slug: '02-project-documents/search_experience_6310/intelligent_curation/spec_v1.md',
  },
  {
    type: 'file',
    name: 'README.md',
    path: '02-project-documents/monitor_761/README.md',
    slug: '02-project-documents/monitor_761/README.md',
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
      title: 'search experience 6310',
      context: '02 project documents',
      href: '/docs/02-project-documents/search_experience_6310/README.md',
      path: '02-project-documents/search_experience_6310',
    }
  )

  assert.deepEqual(
    mapChangedPathToActivityTarget(
      'public/content/docs/03-research/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/baby-supplement/nox-instagram/summary.md',
      docs,
      demos
    ),
    {
      type: 'doc',
      title: '20260527 nox vs xtb 10kw instagram us front10 promotion capacity v1',
      context: 'channel search review',
      href: '/docs/03-research/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/README.md',
      path: '03-research/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1',
    }
  )

  assert.deepEqual(
    mapChangedPathToActivityTarget('public/demos/search-experience-6310/index.html', docs, demos),
    {
      type: 'demo',
      title: '智能选品',
      context: 'Demo',
      href: '/demos/search-experience-6310',
      path: 'search-experience-6310',
    }
  )

  assert.equal(mapChangedPathToActivityTarget('public/content/docs/README.md', docs, demos), null)
  assert.equal(mapChangedPathToActivityTarget('app/page.tsx', docs, demos), null)
})

test('parses git log output into content activities', () => {
  const activities = parseGitActivityLog(
    `---1dd20393319f41f1f6a589a8ed30287c471d9f51\t1dd2039\t2026-05-28T10:00:08+08:00\tchore: sync publish content
M\tpublic/content/docs/02-project-documents/search_experience_6310/README.md
A\tpublic/content/docs/02-project-documents/search_experience_6310/intelligent_curation/spec_v1.md
A\tpublic/content/docs/03-research/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/README.md
A\tpublic/content/docs/03-research/channel-search-review/20260527-nox-vs-xtb-10kw-instagram-us-front10-promotion-capacity-v1/baby-supplement/provider-comparison.md
A\tpublic/demos/search-experience-6310/index.html
M\tpublic/demos/search-experience-6310/styles.css
---f16640a111111111111111111111111111111111111\tf16640a\t2026-05-26T18:00:00+08:00\tfeat: preview table documents
M\tapp/page.tsx`,
    docs,
    demos
  )

  assert.equal(activities.length, 3)
  assert.equal(activities[0].title, 'search experience 6310')
  assert.equal(activities[0].changeType, 'modified')
  assert.equal(activities[1].title, '20260527 nox vs xtb 10kw instagram us front10 promotion capacity v1')
  assert.equal(activities[1].changeType, 'added')
  assert.equal(activities[1].context, 'channel search review')
  assert.equal(activities[2].title, '智能选品')
  assert.equal(activities[2].changeType, 'modified')
})

test('treats deleted files inside an existing project as a project update', () => {
  const activities = parseGitActivityLog(
    `---66da8ef111111111111111111111111111111111111\t66da8ef\t2026-06-01T10:00:00+08:00\tchore: sync cleaned screenshots
D\tpublic/content/docs/02-project-documents/monitor_761/feedback_screenshots/example.png
D\tpublic/content/docs/02-project-documents/monitor_761/feedback_screenshots/example-2.jpeg`,
    docs,
    demos
  )

  assert.equal(activities.length, 1)
  assert.equal(activities[0].title, 'monitor 761')
  assert.equal(activities[0].changeType, 'modified')
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
  assert.equal(summary.items.length, 2)
  assert.equal(summary.docCount, 1)
  assert.equal(summary.demoCount, 1)
})
