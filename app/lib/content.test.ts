import test from 'node:test'
import assert from 'node:assert/strict'
import { shouldPreviewDocumentContent, resolveDocumentTitle } from './content'

test('prefers frontmatter title for markdown documents', () => {
  const title = resolveDocumentTitle({
    fileName: 'spec_v1.md',
    rawContent: `---
title: 自定义标题
---

# 不应被使用
`,
    isMarkdown: true,
  })

  assert.equal(title, '自定义标题')
})

test('falls back to the first markdown heading when frontmatter title is absent', () => {
  const title = resolveDocumentTitle({
    fileName: 'agent_response_contract_v1.md',
    rawContent: `# 频道搜索 Agent 化改造 · Agent Response Contract v1

正文内容
`,
    isMarkdown: true,
  })

  assert.equal(title, '频道搜索 Agent 化改造 · Agent Response Contract v1')
})

test('falls back to the file name when markdown has no level-one heading', () => {
  const title = resolveDocumentTitle({
    fileName: 'notes.md',
    rawContent: `## 只有二级标题

正文内容
`,
    isMarkdown: true,
  })

  assert.equal(title, 'notes.md')
})

test('uses the file name for non-markdown files', () => {
  const title = resolveDocumentTitle({
    fileName: 'prototype_v1.pen',
    rawContent: '',
    isMarkdown: false,
  })

  assert.equal(title, 'prototype_v1.pen')
})

test('does not preview large generated data files', () => {
  assert.equal(shouldPreviewDocumentContent('records.raw.json', 1024), false)
  assert.equal(shouldPreviewDocumentContent('summary.csv', 1024), false)
})

test('still previews ordinary markdown and small text files', () => {
  assert.equal(shouldPreviewDocumentContent('README.md', 10 * 1024 * 1024), true)
  assert.equal(shouldPreviewDocumentContent('notes.json', 32 * 1024), true)
})
