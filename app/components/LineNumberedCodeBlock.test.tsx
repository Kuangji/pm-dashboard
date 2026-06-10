import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { LineNumberedCodeBlock } from './LineNumberedCodeBlock'

test('renders one line number per source line without splitting highlighted html', () => {
  const html = renderToStaticMarkup(
    <LineNumberedCodeBlock
      content={'{\n  "ok": true\n}'}
      highlightedHtml={'{\\n  <span class="hljs-attr">&quot;ok&quot;</span>: true\\n}'}
      languageClass="language-json"
    />
  )

  assert.match(html, /line-numbered-code/)
  assert.match(html, /aria-label="代码行号"/)
  assert.match(html, />1<\/span>/)
  assert.match(html, />2<\/span>/)
  assert.match(html, />3<\/span>/)
  assert.match(html, /class="hljs language-json"/)
  assert.match(html, /hljs-attr/)
})
