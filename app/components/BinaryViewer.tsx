import { Download, File } from 'lucide-react'

interface BinaryViewerProps {
  slug: string
  title: string
  mimeType: string
  extension?: string
}

function formatExtensionLabel(title: string, extension?: string) {
  const titleExtensionIndex = title.lastIndexOf('.')
  const rawExtension = extension || (titleExtensionIndex >= 0 ? title.slice(titleExtensionIndex) : '')
  const normalized = rawExtension.startsWith('.') ? rawExtension.slice(1) : rawExtension

  return normalized ? normalized.toUpperCase() : 'FILE'
}

export function BinaryViewer({ slug, title, mimeType, extension }: BinaryViewerProps) {
  const encodedSlug = slug.split('/').map(encodeURIComponent).join('/')
  const downloadUrl = `/api/download/${encodedSlug}`
  const extensionLabel = formatExtensionLabel(title, extension)

  return (
    <div className="overflow-hidden rounded-xl border border-[#d0d7de] bg-white">
      <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(9,105,218,0.08),_transparent_52%),linear-gradient(135deg,_#f6f8fa_0%,_#eef2f6_100%)] px-6 py-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(208,215,222,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(208,215,222,0.28)_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/70 bg-white/92 p-8 text-center shadow-[0_28px_70px_rgba(31,35,40,0.12)] backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#57606a]">
              {extensionLabel}
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaeef2] text-[#57606a]">
              <File className="h-6 w-6" />
            </div>
          </div>

          <h3 className="mb-3 text-xl font-semibold text-[#24292f]">{title}</h3>

          <p className="mb-2 text-sm leading-6 text-[#57606a]">
            当前文件暂不支持在线预览，已改为占位图展示。
          </p>
          <p className="mb-6 text-sm leading-6 text-[#57606a]">
            这类文件当前无法预览，你可以直接下载后使用本地应用打开。
          </p>

          <div className="mb-6 rounded-2xl border border-[#d8dee4] bg-[#f6f8fa] px-4 py-3 text-left text-sm text-[#57606a]">
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium text-[#24292f]">文件类型</span>
              <span>{extensionLabel}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="font-medium text-[#24292f]">MIME</span>
              <span className="truncate text-right">{mimeType}</span>
            </div>
          </div>

          <a
            href={downloadUrl}
            download
            className="inline-flex items-center gap-2 rounded-full bg-[#0969da] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0858ba]"
          >
            <Download className="h-4 w-4" />
            下载文件
          </a>
        </div>
      </div>
    </div>
  )
}
