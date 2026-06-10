'use client'

import { useEffect, useMemo, useState } from 'react'
import { Download, Loader2, Table2 } from 'lucide-react'
import { read, utils } from 'xlsx'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { getDocumentPublicUrl } from '@/app/lib/document-url'

const MAX_PREVIEW_ROWS = 1000

interface TableViewerProps {
  slug: string
  title: string
  content?: string
  extension?: string
}

type TableRow = Record<string, string>

interface ParsedSheet {
  name: string
  headers: string[]
  rows: TableRow[]
  totalRows: number
}

type ParseState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; sheets: ParsedSheet[] }

function isDelimitedText(extension?: string) {
  return extension === '.csv' || extension === '.tsv'
}

function normalizeCell(value: unknown) {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toISOString()
  return String(value)
}

function makeUniqueHeaders(headerRow: unknown[], columnCount: number) {
  const seen = new Map<string, number>()

  return Array.from({ length: columnCount }, (_, index) => {
    const rawHeader = normalizeCell(headerRow[index]).trim()
    const baseHeader = rawHeader || `Column ${index + 1}`
    const previousCount = seen.get(baseHeader) ?? 0
    seen.set(baseHeader, previousCount + 1)

    return previousCount === 0 ? baseHeader : `${baseHeader} (${previousCount + 1})`
  })
}

function sheetToPreview(name: string, sheet: import('xlsx').WorkSheet): ParsedSheet {
  const matrix = utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    blankrows: false,
    defval: '',
    raw: false,
  })

  const columnCount = matrix.reduce((max, row) => Math.max(max, row.length), 0)
  const headers = makeUniqueHeaders(matrix[0] ?? [], columnCount)
  const bodyRows = matrix.slice(1)

  const rows = bodyRows.slice(0, MAX_PREVIEW_ROWS).map((row) => {
    return headers.reduce<TableRow>((result, header, index) => {
      result[header] = normalizeCell(row[index])
      return result
    }, {})
  })

  return {
    name,
    headers,
    rows,
    totalRows: bodyRows.length,
  }
}

function parseWorkbook(input: string | ArrayBuffer, extension?: string): ParsedSheet[] {
  const isText = typeof input === 'string'
  const workbook = read(input, {
    type: isText ? 'string' : 'array',
    FS: extension === '.tsv' ? '\t' : ',',
    cellDates: true,
  })

  return workbook.SheetNames.map((sheetName) => {
    return sheetToPreview(sheetName, workbook.Sheets[sheetName])
  }).filter((sheet) => sheet.headers.length > 0)
}

export function TableViewer({ slug, title, content, extension }: TableViewerProps) {
  const [state, setState] = useState<ParseState>({ status: 'loading' })
  const [activeSheetName, setActiveSheetName] = useState<string>('')
  const downloadUrl = getDocumentPublicUrl(slug)

  useEffect(() => {
    let cancelled = false

    async function loadWorkbook() {
      setState({ status: 'loading' })

      try {
        const input = isDelimitedText(extension)
          ? content ?? ''
          : await fetch(downloadUrl).then((response) => {
              if (!response.ok) {
                throw new Error(`文件读取失败：${response.status}`)
              }
              return response.arrayBuffer()
            })

        const sheets = parseWorkbook(input, extension)
        if (cancelled) return

        if (sheets.length === 0) {
          setState({ status: 'error', message: '没有找到可预览的表格内容。' })
          return
        }

        setState({ status: 'ready', sheets })
        setActiveSheetName((current) => current || sheets[0].name)
      } catch (error) {
        if (cancelled) return
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : '表格解析失败。',
        })
      }
    }

    loadWorkbook()

    return () => {
      cancelled = true
    }
  }, [content, downloadUrl, extension])

  if (state.status === 'loading') {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-[#d0d7de] bg-[#f6f8fa] text-sm text-[#57606a]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        正在解析表格预览...
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <div className="mb-2 flex items-center gap-2 font-medium">
          <Table2 className="h-4 w-4" />
          表格暂时无法预览
        </div>
        <p className="mb-4 text-sm leading-6">{state.message}</p>
        <a
          href={downloadUrl}
          download
          className="inline-flex items-center gap-2 rounded-full bg-amber-900 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
        >
          <Download className="h-4 w-4" />
          下载源文件
        </a>
      </div>
    )
  }

  const activeSheet = state.sheets.find((sheet) => sheet.name === activeSheetName) ?? state.sheets[0]

  return (
    <TablePreview
      title={title}
      downloadUrl={downloadUrl}
      sheets={state.sheets}
      activeSheet={activeSheet}
      onSheetChange={setActiveSheetName}
    />
  )
}

function TablePreview({
  title,
  downloadUrl,
  sheets,
  activeSheet,
  onSheetChange,
}: {
  title: string
  downloadUrl: string
  sheets: ParsedSheet[]
  activeSheet: ParsedSheet
  onSheetChange: (sheetName: string) => void
}) {
  const columns = useMemo<ColumnDef<TableRow>[]>(() => {
    return activeSheet.headers.map((header) => ({
      accessorKey: header,
      header,
      cell: (info) => String(info.getValue() ?? ''),
    }))
  }, [activeSheet.headers])

  const table = useReactTable({
    data: activeSheet.rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const isTruncated = activeSheet.totalRows > activeSheet.rows.length

  return (
    <div className="overflow-hidden rounded-xl border border-[#d0d7de] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#d0d7de] bg-[#f6f8fa] px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#24292f]">
            <Table2 className="h-4 w-4 text-[#57606a]" />
            {title}
          </div>
          <p className="mt-1 text-xs text-[#57606a]">
            {activeSheet.headers.length} 列 · {activeSheet.totalRows} 行
            {isTruncated ? ` · 当前预览前 ${MAX_PREVIEW_ROWS} 行` : ''}
          </p>
        </div>

        <a
          href={downloadUrl}
          download
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d0d7de] bg-white px-3 py-1.5 text-xs font-medium text-[#57606a] transition-colors hover:border-[#0969da] hover:text-[#0969da]"
        >
          <Download className="h-3.5 w-3.5" />
          下载源文件
        </a>
      </div>

      {sheets.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-[#d0d7de] px-3 py-2">
          {sheets.map((sheet) => (
            <button
              key={sheet.name}
              type="button"
              onClick={() => onSheetChange(sheet.name)}
              className={cn(
                'shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors',
                sheet.name === activeSheet.name
                  ? 'bg-[#0969da] text-white'
                  : 'bg-[#f6f8fa] text-[#57606a] hover:bg-[#eaeef2] hover:text-[#24292f]'
              )}
            >
              {sheet.name}
            </button>
          ))}
        </div>
      )}

      {isTruncated && (
        <div className="border-b border-[#d0d7de] bg-blue-50 px-4 py-2 text-xs text-[#0969da]">
          表格较大，为保证页面响应速度，当前只展示前 {MAX_PREVIEW_ROWS} 行；完整内容请下载源文件查看。
        </div>
      )}

      <div className="max-h-[70vh] overflow-auto">
        <table className="w-full min-w-max border-separate border-spacing-0 text-left text-sm">
          <thead className="sticky top-0 z-10 bg-[#f6f8fa]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-r border-[#d0d7de] px-3 py-2 text-xs font-semibold text-[#57606a]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-white even:bg-[#f6f8fa]">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="max-w-[360px] border-b border-r border-[#d8dee4] px-3 py-2 align-top text-[#24292f]"
                  >
                    <span className="line-clamp-4 whitespace-pre-wrap break-words">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
