'use client'

import { Download } from 'lucide-react'

interface ImageViewerProps {
  slug: string
  title: string
  mimeType: string
}

export function ImageViewer({ slug, title, mimeType }: ImageViewerProps) {
  // Build the public URL for the image
  const imageUrl = `/content/docs/${slug}`

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      {/* Image container */}
      <div className="rounded-md border border-gray-200 overflow-hidden bg-white">
        <div className="p-4 flex items-center justify-center bg-gray-50 min-h-[200px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full h-auto rounded shadow-sm"
            style={{ maxHeight: '70vh' }}
          />
        </div>
      </div>

      {/* Info and download */}
      <div className="flex items-center justify-between px-1">
        <div className="text-sm text-gray-500">
          <span className="font-medium">{title}</span>
          <span className="mx-2">•</span>
          <span className="text-gray-400">{mimeType}</span>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
        >
          <Download className="w-4 h-4" />
          <span>下载</span>
        </button>
      </div>
    </div>
  )
}
