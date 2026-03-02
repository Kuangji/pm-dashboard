'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/github.css'

// Register JSON language
hljs.registerLanguage('json', json)

interface JsonViewerProps {
  content: string
}

export function JsonViewer({ content }: JsonViewerProps) {
  const [copied, setCopied] = useState(false)

  // Format JSON if possible
  let formattedContent = content
  try {
    const parsed = JSON.parse(content)
    formattedContent = JSON.stringify(parsed, null, 2)
  } catch {
    // If parsing fails, show raw content
    formattedContent = content
  }

  // Apply syntax highlighting
  const highlighted = hljs.highlight(formattedContent, { language: 'json' }).value

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignore copy errors
    }
  }

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">JSON</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
          title="复制内容"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="bg-[#f6f8fa] overflow-auto">
        <pre className="p-4 m-0 text-sm leading-relaxed">
          <code
            className="hljs language-json"
            dangerouslySetInnerHTML={{ __html: highlighted }}
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
              backgroundColor: 'transparent',
            }}
          />
        </pre>
      </div>
    </div>
  )
}
