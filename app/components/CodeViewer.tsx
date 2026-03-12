'use client'

import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import hljs from 'highlight.js/lib/core'

// Import common languages
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import json from 'highlight.js/lib/languages/json'
import sql from 'highlight.js/lib/languages/sql'

import 'highlight.js/styles/github.css'

// Register languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('python', python)
hljs.registerLanguage('json', json)
hljs.registerLanguage('sql', sql)

interface CodeViewerProps {
  content: string
  language?: string
  fileName?: string
}

export function CodeViewer({ content, language, fileName }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)
  const [highlighted, setHighlighted] = useState('')

  useEffect(() => {
    // Apply syntax highlighting
    if (language && hljs.getLanguage(language)) {
      const result = hljs.highlight(content, { language })
      setHighlighted(result.value)
    } else {
      // Auto-detect or plain text
      const result = hljs.highlightAuto(content)
      setHighlighted(result.value)
    }
  }, [content, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignore copy errors
    }
  }

  const displayLanguage = language || 'text'

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            {displayLanguage}
          </span>
          {fileName && fileName !== displayLanguage && (
            <span className="text-xs text-gray-400">• {fileName}</span>
          )}
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
      <div className="bg-[#f6f8fa] overflow-auto max-h-[80vh]">
        <pre className="p-3 md:p-4 m-0 text-sm leading-relaxed">
          <code
            className={`hljs ${language ? `language-${language}` : ''}`}
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
