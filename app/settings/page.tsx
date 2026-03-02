import { readManifest, flattenNavTree } from '@/app/lib/content'

export default async function SettingsPage() {
  const manifest = await readManifest()
  const allDocs = flattenNavTree(manifest.navigation.docs)

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold text-zinc-900 mb-8">设置</h1>

      <div className="space-y-6">
        <section className="bg-zinc-50 rounded-lg p-6 border border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">系统信息</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">版本</span>
              <span className="text-zinc-900">{manifest.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">更新时间</span>
              <span className="text-zinc-900">{new Date(manifest.updatedAt).toLocaleString('zh-CN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">文档数量</span>
              <span className="text-zinc-900">{allDocs.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Demo 数量</span>
              <span className="text-zinc-900">{manifest.navigation.demos.length}</span>
            </div>
          </div>
        </section>

        <section className="bg-zinc-50 rounded-lg p-6 border border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">关于</h2>
          <p className="text-sm text-zinc-600">
            PM Dashboard 是一个产品文档与原型展示系统。
          </p>
        </section>
      </div>
    </div>
  )
}
