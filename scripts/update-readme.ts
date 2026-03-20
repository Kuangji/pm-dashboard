#!/usr/bin/env tsx
/**
 * 根据 manifest.json 自动更新 README.md 中的内容目录树
 *
 * 仅展示目录节点（不展示文件），最多 2 层深度。
 * 注释文本由 scripts/readme-tree-comments.json 维护，
 * 遇到没有注释的新目录时自动调用 kimi CLI 生成。
 */

import { promises as fs } from 'fs'
import path from 'path'
import { invokeAiJson } from './lib/ai-cli'

const DASHBOARD_ROOT = process.cwd()
const MANIFEST_PATH = path.join(DASHBOARD_ROOT, 'public/content/manifest.json')
const COMMENTS_PATH = path.join(DASHBOARD_ROOT, 'scripts/readme-tree-comments.json')
const README_PATH = path.join(DASHBOARD_ROOT, 'public/content/docs/README.md')

const TREE_START = '<!-- CONTENT-TREE-START -->'
const TREE_END = '<!-- CONTENT-TREE-END -->'

interface NavItem {
  type: 'file' | 'directory'
  name: string
  path: string
  children?: NavItem[]
}

/** 收集所有需要展示的目录路径（最多 2 层） */
function collectDirPaths(
  items: NavItem[],
  parentPath: string = '',
  depth: number = 0
): string[] {
  const dirs = items.filter((item) => item.type === 'directory')
  const paths: string[] = []

  for (const dir of dirs) {
    const fullPath = parentPath ? `${parentPath}/${dir.name}` : dir.name
    paths.push(fullPath)
    if (depth < 1 && dir.children) {
      paths.push(...collectDirPaths(dir.children, fullPath, depth + 1))
    }
  }

  return paths
}

/** 调用 kimi CLI 为缺失注释的目录批量生成注释 */
async function fillMissingComments(
  missingPaths: string[],
  comments: Record<string, string>
): Promise<void> {
  const list = missingPaths.map((p) => `- ${p}`).join('\n')
  const prompt = `以下是一个产品管理文档站点的目录路径列表，请为每个路径生成简短的中文说明（4-8 个字，直接描述内容主题）。

目录列表：
${list}

严格按以下 JSON 格式返回，不要添加任何其他文字或代码块标记：
{
  "路径": "说明"
}`

  console.log(`🤖 调用 kimi 为 ${missingPaths.length} 个新目录生成注释...`)

  try {
    const generated = await invokeAiJson<Record<string, string>>({
      prompt,
      purpose: 'update-readme-comments',
    })
    Object.assign(comments, generated)
    console.log(`   生成完成: ${Object.keys(generated).join(', ')}`)
  } catch (err) {
    console.warn('⚠️  kimi 调用失败，跳过注释生成:', (err as Error).message)
  }
}

function buildTree(
  items: NavItem[],
  comments: Record<string, string>,
  depth: number = 0,
  parentPath: string = '',
  indent: string = ''
): string[] {
  const dirs = items.filter((item) => item.type === 'directory')
  const lines: string[] = []

  dirs.forEach((dir, index) => {
    const isLast = index === dirs.length - 1
    const connector = isLast ? '└── ' : '├── '
    const fullPath = parentPath ? `${parentPath}/${dir.name}` : dir.name
    const comment = comments[fullPath]
    const commentStr = comment ? `  # ${comment}` : ''

    lines.push(`${indent}${connector}${dir.name}/${commentStr}`)

    if (depth < 1 && dir.children) {
      const childIndent = indent + (isLast ? '    ' : '│   ')
      lines.push(...buildTree(dir.children, comments, depth + 1, fullPath, childIndent))
    }
  })

  return lines
}

async function updateReadme() {
  const manifestContent = await fs.readFile(MANIFEST_PATH, 'utf-8')
  const manifest = JSON.parse(manifestContent)
  const docs: NavItem[] = manifest.navigation.docs

  const commentsContent = await fs.readFile(COMMENTS_PATH, 'utf-8')
  const comments: Record<string, string> = JSON.parse(commentsContent)

  // 找出没有注释的目录，调用 claude 补全
  const allDirPaths = collectDirPaths(docs)
  const missingPaths = allDirPaths.filter((p) => !comments[p])

  if (missingPaths.length > 0) {
    await fillMissingComments(missingPaths, comments)
    await fs.writeFile(COMMENTS_PATH, JSON.stringify(comments, null, 2) + '\n', 'utf-8')
  }

  const treeLines = buildTree(docs, comments)
  const treeBlock = '```\n' + treeLines.join('\n') + '\n```'
  const newSection = `${TREE_START}\n${treeBlock}\n${TREE_END}`

  const readme = await fs.readFile(README_PATH, 'utf-8')
  const startIdx = readme.indexOf(TREE_START)
  const endIdx = readme.indexOf(TREE_END)

  if (startIdx === -1 || endIdx === -1) {
    console.error('❌ README.md 中未找到 CONTENT-TREE 标记')
    process.exit(1)
  }

  const updated = readme.slice(0, startIdx) + newSection + readme.slice(endIdx + TREE_END.length)
  await fs.writeFile(README_PATH, updated, 'utf-8')
  console.log('✅ README.md 内容目录已更新')
}

updateReadme().catch((error) => {
  console.error('❌ 更新失败:', error)
  process.exit(1)
})
