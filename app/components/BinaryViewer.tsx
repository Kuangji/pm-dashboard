'use client'

import { Download, File } from 'lucide-react'

interface BinaryViewerProps {
  slug: string
  title: string
  mimeType: string
}

export function BinaryViewer({ slug, title, mimeType }: BinaryViewerProps) {
  // Build the public URL for the file
  const fileUrl = `/content/docs/${slug}`

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-200 rounded-lg">
        <File className="w-8 h-8 text-gray-500" />
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

      <p className="text-sm text-gray-500 mb-6 text-center">
        此文件为二进制文件，无法预览
        <br />
        <span className="text-gray-400">{mimeType}</span>
      </p>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>下载文件</span>
      </button>
    </div>
  )
}
