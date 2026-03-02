import { DocsSidebar } from '@/app/components/DocsSidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <DocsSidebar />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[1012px] mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
