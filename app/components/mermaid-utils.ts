export const MERMAID_LANGUAGES = new Set(['mermaid', 'mmd'])

const MERMAID_START_PATTERNS = [
  /^flowchart\s+(?:TB|TD|BT|RL|LR)\b/i,
  /^graph\s+(?:TB|TD|BT|RL|LR)\b/i,
  /^sequenceDiagram\b/i,
  /^classDiagram\b/i,
  /^stateDiagram(?:-v2)?\b/i,
  /^erDiagram\b/i,
  /^journey\b/i,
  /^gantt\b/i,
  /^pie\b/i,
  /^mindmap\b/i,
  /^timeline\b/i,
  /^quadrantChart\b/i,
  /^requirementDiagram\b/i,
  /^gitGraph\b/i,
  /^C4Context\b/i,
]

export function getCodeLanguage(className?: string) {
  return className?.match(/language-([^\s]+)/)?.[1]?.toLowerCase()
}

export function isMermaidCodeBlock(code: string, language?: string) {
  if (language && MERMAID_LANGUAGES.has(language.toLowerCase())) return true

  const firstMeaningfulLine = code
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('%%'))

  if (!firstMeaningfulLine) return false

  return MERMAID_START_PATTERNS.some((pattern) => pattern.test(firstMeaningfulLine))
}
