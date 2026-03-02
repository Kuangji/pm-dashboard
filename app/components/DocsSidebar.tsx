import { readManifest } from '@/app/lib/content'
import { DocsSidebarClient } from './DocsSidebarClient'

export async function DocsSidebar() {
  const manifest = await readManifest()
  return <DocsSidebarClient manifest={manifest} />
}
