import { readManifest, flattenNavTree } from './lib/content'
import { FileText, PlayCircle, FolderOpen } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const manifest = await readManifest()

  const allDocs = flattenNavTree(manifest.navigation.docs)
  const docCount = allDocs.length
  const demoCount = manifest.navigation.demos.length
  const categoryCount = manifest.navigation.docs.length

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 md:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900">仪表盘</h1>
        <p className="text-zinc-500 mt-2">产品文档与原型管理中心</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link
          href="/docs"
          className="p-6 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-300 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">{docCount}</p>
              <p className="text-sm text-zinc-500">文档</p>
            </div>
          </div>
        </Link>

        <Link
          href="/demos"
          className="p-6 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-300 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">{demoCount}</p>
              <p className="text-sm text-zinc-500">Demos</p>
            </div>
          </div>
        </Link>

        <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">{categoryCount}</p>
              <p className="text-sm text-zinc-500">分类</p>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">快速开始</h2>
        <div className="bg-zinc-50 rounded-xl border border-zinc-100 p-6">
          <ol className="space-y-3 text-sm text-zinc-600 list-decimal list-inside">
            <li>
              在 <code className="bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-800">drafts/publish/documents/</code> 添加 Markdown 文档
            </li>
            <li>
              编辑 <code className="bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-800">drafts/publish/manifest.json</code> 配置导航
            </li>
            <li>
              运行 <code className="bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-800">npm run sync</code> 同步内容
            </li>
            <li>
              运行 <code className="bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-800">npm run dev</code> 预览
            </li>
          </ol>
        </div>
      </section>
    </div>
  )
}
