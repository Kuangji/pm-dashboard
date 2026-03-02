import { readManifest, getFirstFile } from '@/app/lib/content'
import { FileText } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function DocsPage() {
  const manifest = await readManifest()

  // 如果有文档，重定向到第一篇
  const firstDoc = getFirstFile(manifest.navigation.docs)
  if (firstDoc && firstDoc.slug) {
    // 保留 .md 后缀，对路径的每一部分分别编码
    const encodedSlug = firstDoc.slug.split('/').map(encodeURIComponent).join('/')
    redirect(`/docs/${encodedSlug}`)
  }

  // 没有文档时显示提示
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-[#24292f] mb-4">文档</h1>
      <p className="text-[#57606a] mb-8">产品规格、设计文档和研究报告</p>

      <div className="text-center py-20 bg-[#f6f8fa] rounded-lg border border-dashed border-[#d0d7de]">
        <FileText className="w-12 h-12 text-[#8c959f] mx-auto mb-4" />
        <p className="text-[#57606a]">暂无文档</p>
        <p className="text-sm text-[#8c959f] mt-1">
          在 drafts/publish/documents/ 中添加文档并在 manifest.json 中配置
        </p>
      </div>
    </div>
  )
}
