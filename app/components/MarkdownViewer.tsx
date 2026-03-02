'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown-light.css'

interface MarkdownViewerProps {
  content: string
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="markdown-body" style={{
      backgroundColor: 'transparent',
      color: '#24292f',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
      fontSize: '16px',
      lineHeight: '1.5',
      wordWrap: 'break-word'
    }}>
      <style>{`
        .markdown-body {
          max-width: 1012px;
        }
        .markdown-body h1 {
          font-size: 2em;
          font-weight: 600;
          border-bottom: 1px solid #d0d7de;
          padding-bottom: 0.3em;
          margin: 0 0 16px;
        }
        .markdown-body h2 {
          font-size: 1.5em;
          font-weight: 600;
          border-bottom: 1px solid #d0d7de;
          padding-bottom: 0.3em;
          margin: 24px 0 16px;
        }
        .markdown-body h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 24px 0 16px;
        }
        .markdown-body h4 {
          font-size: 1em;
          font-weight: 600;
          margin: 24px 0 16px;
        }
        .markdown-body h5 {
          font-size: 0.875em;
          font-weight: 600;
          margin: 24px 0 16px;
        }
        .markdown-body h6 {
          font-size: 0.85em;
          font-weight: 600;
          color: #57606a;
          margin: 24px 0 16px;
        }
        .markdown-body p {
          margin-bottom: 16px;
        }
        .markdown-body a {
          color: #0969da;
          text-decoration: none;
        }
        .markdown-body a:hover {
          text-decoration: underline;
        }
        .markdown-body code {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
          font-size: 85%;
          background-color: rgba(175, 184, 193, 0.2);
          border-radius: 6px;
          padding: 0.2em 0.4em;
        }
        .markdown-body pre {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
          background-color: #f6f8fa;
          border-radius: 6px;
          padding: 16px;
          overflow: auto;
          margin-bottom: 16px;
        }
        .markdown-body pre code {
          background-color: transparent;
          padding: 0;
          font-size: 100%;
          word-break: normal;
          white-space: pre;
        }
        .markdown-body blockquote {
          border-left: 4px solid #d0d7de;
          padding: 0 16px;
          color: #57606a;
          margin: 0 0 16px;
        }
        .markdown-body table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 16px;
        }
        .markdown-body th,
        .markdown-body td {
          border: 1px solid #d0d7de;
          padding: 6px 13px;
        }
        .markdown-body th {
          background-color: #f6f8fa;
          font-weight: 600;
        }
        .markdown-body tr:nth-child(2n) {
          background-color: #f6f8fa;
        }
        .markdown-body ul,
        .markdown-body ol {
          padding-left: 2em;
          margin-bottom: 16px;
        }
        .markdown-body li + li {
          margin-top: 0.25em;
        }
        .markdown-body img {
          max-width: 100%;
          box-sizing: content-box;
          background-color: #fff;
        }
        .markdown-body hr {
          height: 0.25em;
          padding: 0;
          margin: 24px 0;
          background-color: #d0d7de;
          border: 0;
        }
        .markdown-body .highlight pre {
          margin-bottom: 0;
          word-break: normal;
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          [remarkToc, { maxDepth: 3, heading: '目录' }],
        ]}
        rehypePlugins={[
          rehypeSlug,
          rehypeHighlight,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
