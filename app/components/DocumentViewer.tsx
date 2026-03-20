import { Document } from '@/app/lib/content'
import { MarkdownViewer } from './MarkdownViewer'
import { JsonViewer } from './JsonViewer'
import { CodeViewer } from './CodeViewer'
import { ImageViewer } from './ImageViewer'
import { BinaryViewer } from './BinaryViewer'

interface DocumentViewerProps {
  doc: Document
}

export function DocumentViewer({ doc }: DocumentViewerProps) {
  const { fileType, isImage, isText, isBinary } = doc

  // Route to appropriate viewer based on file type
  if (fileType === 'markdown') {
    return <MarkdownViewer content={doc.content} />
  }

  if (fileType === 'json') {
    return <JsonViewer content={doc.content} />
  }

  if (isImage) {
    return <ImageViewer slug={doc.slug} title={doc.title} mimeType={doc.mimeType} />
  }

  if (isText) {
    return (
      <CodeViewer
        content={doc.content}
        language={doc.language}
        fileName={doc.title}
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
