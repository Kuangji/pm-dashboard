import { DocsSidebar } from '@/app/components/DocsSidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row md:h-screen bg-white md:overflow-hidden">
      <DocsSidebar />
      <main className="flex-1 min-w-0 md:h-screen md:overflow-y-auto">
        <div className="max-w-full md:max-w-[1012px] mx-auto px-4 py-4 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
