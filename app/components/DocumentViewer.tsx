'use client'

import { useEffect, useState } from 'react'
import type { Document } from '@/app/lib/content'
import { getDocumentPublicUrl } from '@/app/lib/document-url'
import { shouldPreviewDocumentContent } from '@/app/lib/document-preview'
import { MarkdownViewer } from './MarkdownViewer'
import { JsonViewer } from './JsonViewer'
import { CodeViewer } from './CodeViewer'
import { ImageViewer } from './ImageViewer'
import { BinaryViewer } from './BinaryViewer'
import { TableViewer } from './TableViewer'

interface DocumentViewerProps {
  doc: Document
}

type ContentState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; content: string }
  | { status: 'error'; message: string }

function stripMarkdownMetadata(content: string) {
  return content
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .replace(/<!--\s*CONTENT-TREE-(?:START|END)\s*-->\n?/g, '')
}

function shouldLoadTextPreview(doc: Document) {
  if (doc.isImage || doc.isBinary) return false
  if (doc.fileType === 'table') return doc.extension === '.csv' || doc.extension === '.tsv'
  return doc.isText
}

function prepareContent(doc: Document, content: string) {
  if (doc.fileType === 'markdown') return stripMarkdownMetadata(content)
  if (doc.fileType === 'json') {
    try {
      return JSON.stringify(JSON.parse(content), null, 2)
    } catch {
      return content
    }
  }

  return content
}

function LoadingPreview() {
  return (
    <div className="rounded-xl border border-[#d0d7de] bg-[#f6f8fa] p-8 text-sm text-[#57606a]">
      正在加载文档内容...
    </div>
  )
}

function ErrorPreview({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
      {message}
    </div>
  )
}

export function DocumentViewer({ doc }: DocumentViewerProps) {
  const { fileType, isImage, isText, isBinary } = doc
  const [state, setState] = useState<ContentState>({ status: 'idle' })

  useEffect(() => {
    if (!shouldLoadTextPreview(doc)) {
      setState({ status: 'idle' })
      return
    }

    let cancelled = false

    async function loadContent() {
      setState({ status: 'loading' })

      try {
        const url = getDocumentPublicUrl(doc.slug)
        const headResponse = await fetch(url, { method: 'HEAD' })
        const size = Number(headResponse.headers.get('content-length') || '0')

        if (!shouldPreviewDocumentContent(doc.slug, size)) {
          setState({ status: 'idle' })
          return
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`文件读取失败：${response.status}`)
        }

        const content = prepareContent(doc, await response.text())
        if (!cancelled) setState({ status: 'ready', content })
      } catch (error) {
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : '文档内容加载失败。',
          })
        }
      }
    }

    loadContent()

    return () => {
      cancelled = true
    }
  }, [doc])

  // Route to appropriate viewer based on file type
  if (fileType === 'markdown') {
    if (state.status === 'ready') return <MarkdownViewer content={state.content} />
    if (state.status === 'error') return <ErrorPreview message={state.message} />
    return <LoadingPreview />
  }

  if (fileType === 'json') {
    if (state.status === 'ready') return <JsonViewer content={state.content} />
    if (state.status === 'error') return <ErrorPreview message={state.message} />
    return (
      <BinaryViewer
        slug={doc.slug}
        title={doc.title}
        mimeType={doc.mimeType}
        extension={doc.extension}
      />
    )
  }

  if (fileType === 'table') {
    if (doc.extension === '.csv' || doc.extension === '.tsv') {
      if (state.status === 'loading') return <LoadingPreview />
      if (state.status === 'error') return <ErrorPreview message={state.message} />
      if (state.status !== 'ready') {
        return (
          <BinaryViewer
            slug={doc.slug}
            title={doc.title}
            mimeType={doc.mimeType}
            extension={doc.extension}
          />
        )
      }
    }

    return (
      <TableViewer
        slug={doc.slug}
        title={doc.title}
        content={state.status === 'ready' ? state.content : doc.content}
        extension={doc.extension}
      />
    )
  }

  if (isImage) {
    return <ImageViewer slug={doc.slug} title={doc.title} mimeType={doc.mimeType} />
  }

  if (isText) {
    if (state.status === 'ready') {
      return (
        <CodeViewer
          content={state.content}
          language={doc.language}
          fileName={doc.title}
        />
      )
    }

    if (state.status === 'error') return <ErrorPreview message={state.message} />
    if (state.status === 'loading') return <LoadingPreview />

    return (
      <BinaryViewer
        slug={doc.slug}
        title={doc.title}
        mimeType={doc.mimeType}
        extension={doc.extension}
      />
    )
  }

  if (isBinary) {
    return (
      <BinaryViewer
        slug={doc.slug}
        title={doc.title}
        mimeType={doc.mimeType}
        extension={doc.extension}
      />
    )
  }

  // Fallback for unknown types
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <p className="text-yellow-800">
        无法预览此文件类型: <code className="bg-yellow-100 px-1 py-0.5 rounded">{doc.extension || 'unknown'}</code>
      </p>
    </div>
  )
}
