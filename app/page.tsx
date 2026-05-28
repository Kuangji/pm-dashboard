import { readManifest, flattenNavTree } from './lib/content'
import { readRecentContentActivity, type ContentActivity } from './lib/git-activity'
import { FileText, PlayCircle, FolderOpen, Clock3, Sparkles } from 'lucide-react'
import Link from 'next/link'

function formatActivityDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '未知时间'

  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function getChangeLabel(changeType: ContentActivity['changeType']) {
  const labels: Record<ContentActivity['changeType'], string> = {
    added: '新增',
    modified: '更新',
    deleted: '删除',
    renamed: '重命名',
  }

  return labels[changeType]
}

function ActivityItem({ activity }: { activity: ContentActivity }) {
  const itemTypeLabel = activity.type === 'demo' ? 'Demo' : '项目'
  const changeLabel = getChangeLabel(activity.changeType)
  const changeSummary = activity.type === 'demo'
    ? `${changeLabel}了 Demo`
    : `${changeLabel}了 ${activity.context} 下的${itemTypeLabel}`
  const content = (
    <div className="group rounded-xl border border-zinc-100 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
              {changeLabel}
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
              {itemTypeLabel}
            </span>
            <span className="text-xs text-zinc-400">{activity.context}</span>
          </div>
          <h3 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-700">
            {activity.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            {changeSummary}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-xs text-zinc-400 md:items-start">
          <Clock3 className="mt-0.5 h-3.5 w-3.5" />
          <span>{formatActivityDate(activity.committedAt)}</span>
        </div>
      </div>
    </div>
  )

  if (!activity.href) return content

  return (
    <Link href={activity.href} className="block">
      {content}
    </Link>
  )
}

function ActivityTimeline({ activities }: { activities: ContentActivity[] }) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity) => (
            <ActivityItem
              key={`${activity.type}-${activity.path}-${activity.shortCommit}`}
              activity={activity}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          最近提交里没有找到项目或 Demo 更新。
        </div>
      )}
    </div>
  )
}

export default async function Home() {
  const manifest = await readManifest()
  const activity = await readRecentContentActivity(
    manifest.navigation.docs,
    manifest.navigation.demos
  )

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

      <section className="mb-10">
        <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <Sparkles className="h-4 w-4" />
              内容更新
            </div>
            <h2 className="text-lg font-semibold text-zinc-900">更新日志</h2>
            <p className="mt-1 text-sm text-zinc-500">
              按项目和 Demo 自动归并最近发布变更。
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              最近发布
            </span>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-2 text-xs text-zinc-500">
          <span className="rounded-full bg-zinc-100 px-2.5 py-1">
            项目 {activity.docCount}
          </span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1">
            Demo {activity.demoCount}
          </span>
        </div>

        <ActivityTimeline activities={activity.items} />
      </section>

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
