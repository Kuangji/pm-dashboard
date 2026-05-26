import { DocsSidebar } from '@/app/components/DocsSidebar'
import { ResizableDocsLayout } from '@/app/components/ResizableDocsLayout'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ResizableDocsLayout sidebar={<DocsSidebar />}>
      {children}
    </ResizableDocsLayout>
  )
}
