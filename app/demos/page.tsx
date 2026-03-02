import { readManifest } from '@/app/lib/content'
import { PlayCircle, ExternalLink, Tag } from 'lucide-react'
import Link from 'next/link'

export default async function DemosPage() {
  const manifest = await readManifest()

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Demos</h1>
        <p className="text-zinc-500 mt-2">交互式原型演示</p>
      </header>

      {manifest.navigation.demos.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
          <PlayCircle className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-500">暂无 Demo</p>
          <p className="text-sm text-zinc-400 mt-1">
            在 drafts/publish/demos/ 中添加 Demo 并在 manifest.json 中配置
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {manifest.navigation.demos.map((demo) => (
            <Link
              key={demo.id}
              href={`/demos/${demo.id}/index.html`}
              target="_blank"
              prefetch={false}
              className="group block bg-zinc-50 rounded-lg border border-zinc-100 hover:border-zinc-300 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="aspect-video bg-zinc-200 relative">
                {demo.thumbnail ? (
                  <img
                    src={demo.thumbnail}
                    alt={demo.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <PlayCircle className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900 group-hover:text-blue-600">
                  {demo.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                  {demo.description}
                </p>
                {demo.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-zinc-200 text-zinc-600 rounded"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
