'use client'

import { useEffect, useId, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const reactId = useId()
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function renderChart() {
      try {
        const mermaid = (await import('mermaid')).default
        const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'default',
        })

        const result = await mermaid.render(id, chart)
        if (!isMounted) return

        setSvg(result.svg)
        setError(null)
      } catch (renderError) {
        if (!isMounted) return

        setSvg('')
        setError(renderError instanceof Error ? renderError.message : 'Mermaid render failed')
      }
    }

    void renderChart()

    return () => {
      isMounted = false
    }
  }, [chart, reactId])

  if (error) {
    return (
      <div className="mermaid-diagram mermaid-diagram-error">
        <p>图形渲染失败，已保留原始 Mermaid 代码。</p>
        <pre>
          <code>{chart}</code>
        </pre>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="mermaid-diagram mermaid-diagram-loading">
        正在渲染图形...
      </div>
    )
  }

  return (
    <div
      className="mermaid-diagram"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
