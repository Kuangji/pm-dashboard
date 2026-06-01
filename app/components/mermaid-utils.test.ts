import test from 'node:test'
import assert from 'node:assert/strict'
import { getCodeLanguage, isMermaidCodeBlock } from './mermaid-utils'

test('detects mermaid code fences by language', () => {
  assert.equal(getCodeLanguage('language-mermaid'), 'mermaid')
  assert.equal(isMermaidCodeBlock('A --> B', 'mermaid'), true)
})

test('detects flowchart code blocks without a language hint', () => {
  assert.equal(
    isMermaidCodeBlock(`flowchart TD
  A[Start] --> B[Done]`),
    true
  )
})

test('keeps ordinary code blocks as code', () => {
  assert.equal(isMermaidCodeBlock('const value = "flowchart TD"'), false)
  assert.equal(isMermaidCodeBlock('SELECT * FROM graph_table'), false)
})
