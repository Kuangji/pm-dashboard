import test from 'node:test'
import assert from 'node:assert/strict'
import { getDocumentHtmlTitle, readDocument, shouldPreviewDocumentContent, resolveDocumentTitle } from './content'

test('combines the first markdown H1 with the file name', () => {
  const title = resolveDocumentTitle({
    fileName: 'spec_v1.md',
    rawContent: `---
title: 自定义标题
---

# 首个文档标题

# 后续标题
`,
    isMarkdown: true,
  })

  assert.equal(title, '首个文档标题 | spec_v1.md')
})

test('uses the first markdown H1 when multiple H1 headings exist', () => {
  const title = resolveDocumentTitle({
    fileName: 'agent_response_contract_v1.md',
    rawContent: `# 第一个标题

# 频道搜索 Agent 化改造 · Agent Response Contract v1

正文内容
`,
    isMarkdown: true,
  })

  assert.equal(title, '第一个标题 | agent_response_contract_v1.md')
})

test('ignores H1-looking lines inside fenced code blocks', () => {
  const title = resolveDocumentTitle({
    fileName: 'notes.md',
    rawContent: `\`\`\`markdown
# 代码示例中的标题
\`\`\`

# 实际文档标题
`,
    isMarkdown: true,
  })

  assert.equal(title, '实际文档标题 | notes.md')
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

test('keeps the document display title as the file name when an HTML title exists', async () => {
  const slug = '02-project-documents/brand_reputation_radar_752/README.md'

  assert.equal(await getDocumentHtmlTitle(slug), 'v7.5.2 - 品牌舆情雷达 | README.md')
  assert.equal((await readDocument(slug)).title, 'README.md')
})

test('does not preview large generated data files', () => {
  assert.equal(shouldPreviewDocumentContent('records.raw.json', 1024), false)
  assert.equal(shouldPreviewDocumentContent('summary.csv', 1024), false)
})

test('still previews ordinary markdown and small text files', () => {
  assert.equal(shouldPreviewDocumentContent('README.md', 10 * 1024 * 1024), true)
  assert.equal(shouldPreviewDocumentContent('notes.json', 32 * 1024), true)
})
