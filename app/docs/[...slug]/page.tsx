import type { Metadata } from 'next'
import { readDocumentMetadata } from '@/app/lib/content'
import { DocumentViewer } from '@/app/components/DocumentViewer'
import { notFound } from 'next/navigation'
import { Calendar, Tag, FileCode, FileText, ImageIcon, File, Download, Table2 } from 'lucide-react'
import { getDocumentPublicUrl } from '@/app/lib/document-url'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string[] }>
}

const DEFAULT_DESCRIPTION = '产品管理系统'

// File type icons mapping
function getFileTypeIcon(fileType: string, isImage: boolean) {
  if (isImage) return <ImageIcon className="w-4 h-4" />
  if (fileType === 'markdown') return <FileText className="w-4 h-4" />
  if (fileType === 'code' || fileType === 'json' || fileType === 'yaml') return <FileCode className="w-4 h-4" />
  if (fileType === 'table') return <Table2 className="w-4 h-4" />
  return <File className="w-4 h-4" />
}

// File type labels
function getFileTypeLabel(fileType: string, language?: string) {
  if (language) return language.toUpperCase()
  const labels: Record<string, string> = {
    markdown: 'Markdown',
    text: 'Text',
    json: 'JSON',
    yaml: 'YAML',
    code: 'Code',
    image: 'Image',
    table: 'Table',
    binary: 'Binary',
  }
  return labels[fileType] || fileType
}

function formatTags(tags: unknown) {
  if (Array.isArray(tags)) {
    return tags.map(String).join(', ')
  }

  if (typeof tags === 'string') return tags

  return ''
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const slugPath = Array.isArray(slug) ? slug.map(decodeURIComponent).join('/') : decodeURIComponent(slug)

  try {
    const doc = await readDocumentMetadata(slugPath)

    return {
      title: `${doc.title} | PM Dashboard`,
      description: DEFAULT_DESCRIPTION,
    }
  } catch {
    return {
      title: 'PM Dashboard',
      description: DEFAULT_DESCRIPTION,
    }
  }
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  // 将数组拼接成完整路径，如 ['00-dashboard', 'pm-dashboard-architecture'] -> '00-dashboard/pm-dashboard-architecture.md'
  const slugPath = Array.isArray(slug) ? slug.map(decodeURIComponent).join('/') : decodeURIComponent(slug)
  const downloadUrl = getDocumentPublicUrl(slugPath)

  let doc
  try {
    doc = await readDocumentMetadata(slugPath)
  } catch {
    notFound()
  }
  const tags = formatTags(doc.frontmatter.tags)

  return (
    <>
      <header className="mb-8 pb-4 border-b border-[#d0d7de]">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-[#24292f]" style={{ fontSize: '2em', fontWeight: 600 }}>
              {doc.title}
            </h1>
            {/* File type badge */}
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
              {getFileTypeIcon(doc.fileType, doc.isImage)}
              {getFileTypeLabel(doc.fileType, doc.language)}
            </span>
          </div>
          {/* Download button */}
          <a
            href={downloadUrl}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#57606a] hover:text-[#0969da] hover:bg-[#eaeef2] rounded-md transition-colors shrink-0"
            title="下载源文件"
          >
            <Download className="w-4 h-4" />
            下载源文件
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#57606a]">
          {doc.created && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              创建于 {doc.created}
            </span>
          )}
          {doc.updated && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              更新于 {doc.updated}
            </span>
          )}
          {tags && (
            <span className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              {tags}
            </span>
          )}
        </div>
      </header>

      <DocumentViewer doc={doc} />
    </>
  )
}
