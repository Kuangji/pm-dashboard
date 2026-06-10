'use client'

import { useState } from 'react'
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
import { LineNumberedCodeBlock } from './LineNumberedCodeBlock'

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
  const highlighted = language && hljs.getLanguage(language)
    ? hljs.highlight(content, { language }).value
    : hljs.highlightAuto(content).value

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
      <LineNumberedCodeBlock
        content={content}
        highlightedHtml={highlighted}
        languageClass={language ? `language-${language}` : ''}
        maxHeightClassName="max-h-[80vh]"
      />
    </div>
  )
}
