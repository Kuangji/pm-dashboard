import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

const DOCS_DIR = path.resolve('./public/content/docs')

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const slugPath = slug.map(decodeURIComponent).join('/')
  const filePath = path.resolve(DOCS_DIR, slugPath)

  // 防止路径穿越攻击
  if (!filePath.startsWith(DOCS_DIR + path.sep)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  try {
    const file = await readFile(filePath)
    const fileName = path.basename(slugPath)

    return new NextResponse(file, {
      headers: {
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        'Content-Type': 'application/octet-stream',
      },
    })
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
