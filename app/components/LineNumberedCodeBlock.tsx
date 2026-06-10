interface LineNumberedCodeBlockProps {
  content: string
  highlightedHtml: string
  languageClass?: string
  maxHeightClassName?: string
  paddingClassName?: string
}

function getLineCount(content: string) {
  return Math.max(content.split('\n').length, 1)
}

export function LineNumberedCodeBlock({
  content,
  highlightedHtml,
  languageClass = '',
  maxHeightClassName = '',
  paddingClassName = 'p-3 md:p-4',
}: LineNumberedCodeBlockProps) {
  const lineCount = getLineCount(content)

  return (
    <div className={`line-numbered-code bg-[#f6f8fa] overflow-auto ${maxHeightClassName}`}>
      <style>{`
        .line-numbered-code pre,
        .line-numbered-code code {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          background-color: transparent;
        }

        .line-numbered-code code {
          display: block;
          min-width: max-content;
        }

        .line-numbered-code-line-numbers {
          user-select: none;
        }
      `}</style>
      <div className={`grid grid-cols-[max-content_1fr] gap-4 ${paddingClassName}`}>
        <div
          aria-label="代码行号"
          className="line-numbered-code-line-numbers border-r border-gray-200 pr-3 text-right text-sm leading-relaxed text-gray-400"
        >
          {Array.from({ length: lineCount }, (_, index) => (
            <span key={index} className="block">
              {index + 1}
            </span>
          ))}
        </div>
        <pre className="m-0 text-sm leading-relaxed">
          <code
            className={`hljs ${languageClass}`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>
    </div>
  )
}
