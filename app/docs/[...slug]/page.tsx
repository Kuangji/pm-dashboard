import { readDocument, readManifest, flattenNavTree } from '@/app/lib/content'
import { DocumentViewer } from '@/app/components/DocumentViewer'
import { notFound } from 'next/navigation'
import { Calendar, Tag, FileCode, FileText, Image, File } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string[] }>
}

// File type icons mapping
function getFileTypeIcon(fileType: string, isImage: boolean) {
  if (isImage) return <Image className="w-4 h-4" />
  if (fileType === 'markdown') return <FileText className="w-4 h-4" />
  if (fileType === 'code' || fileType === 'json' || fileType === 'yaml') return <FileCode className="w-4 h-4" />
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
    binary: 'Binary',
  }
  return labels[fileType] || fileType
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  // 将数组拼接成完整路径，如 ['00-dashboard', 'pm-dashboard-architecture'] -> '00-dashboard/pm-dashboard-architecture.md'
  const slugPath = Array.isArray(slug) ? slug.map(decodeURIComponent).join('/') : decodeURIComponent(slug)

  try {
    const doc = await readDocument(slugPath)

    return (
      <>
        <header className="mb-8 pb-4 border-b border-[#d0d7de]">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-semibold text-[#24292f]" style={{ fontSize: '2em', fontWeight: 600 }}>
              {doc.title}
            </h1>
            {/* File type badge */}
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
              {getFileTypeIcon(doc.fileType, doc.isImage)}
              {getFileTypeLabel(doc.fileType, doc.language)}
            </span>
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
            {doc.frontmatter.tags && (
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                {Array.isArray(doc.frontmatter.tags)
                  ? doc.frontmatter.tags.join(', ')
                  : doc.frontmatter.tags}
              </span>
            )}
          </div>
        </header>

        <DocumentViewer doc={doc} />
      </>
    )
  } catch {
    notFound()
  }
}

export async function generateStaticParams() {
  try {
    const manifest = await readManifest()
    const allDocs = flattenNavTree(manifest.navigation.docs)

    if (allDocs.length === 0) {
      console.warn('Warning: No documents found in manifest')
      // 返回一个占位符，避免构建失败
      return [{ slug: ['README.md'] }]
    }

    const params = allDocs
      .filter((item) => item.type === 'file' && item.slug)
      .map((item) => ({
        slug: item.slug!.split('/')
      }))

    console.log(`generateStaticParams: Generated ${params.length} paths`)
    return params
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    // 构建时如果 manifest 不存在，返回默认路径避免失败
    return [{ slug: ['README.md'] }]
  }
}
