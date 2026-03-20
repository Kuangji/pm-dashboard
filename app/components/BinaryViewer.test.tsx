import test from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { BinaryViewer } from './BinaryViewer'

test('renders an unsupported-file placeholder card with a unified download link', () => {
  const html = renderToStaticMarkup(
    <BinaryViewer
      slug="samples/prototype_v1.pen"
      title="prototype_v1.pen"
      mimeType="application/octet-stream"
    />
  )

  assert.match(html, /无法预览/)
  assert.match(html, /下载文件/)
  assert.match(html, /href="\/api\/download\/samples\/prototype_v1\.pen"/)
  assert.match(html, /PEN/)
  assert.doesNotMatch(html, /\/content\/docs\//)
})
