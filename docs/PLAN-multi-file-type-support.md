# PM Dashboard 多文件类型支持计划

> 来源: `.claude/plans/precious-meandering-creek.md`
> 创建时间: 2026-02-28

## 背景

当前 pm-dashboard 项目存在文档路由问题：
- `next.config.ts` 设置了 `trailingSlash: true`
- 文档使用 `[...slug]` 动态路由
- 访问 `/docs/README.md` 时会因 `trailingSlash` 与 `.md` 扩展名冲突导致无限循环

之前尝试的修复方案（去掉 `.md` 后缀）会引入新问题：同目录下 `README.md` 和 `README.txt` 会产生冲突。

## 用户真实需求

用户希望 PM Dashboard 成为一个**类似 GitHub Pages 的离线文档浏览器**，支持多种文件类型的展示：
- Markdown 文件（.md）
- 纯文本文件（.txt）
- JSON 配置文件
- 图片文件（预览）
- 其他文本格式

这样可以在本地完整地浏览项目文档，如同在 GitHub 上查看仓库一样。

## 方案概述

设计一个支持多文件类型的 GitHub Pages 风格文档浏览器：

1. **URL 设计**：保留文件扩展名在 URL 中，如 `/docs/config/settings.json/`
2. **文件识别**：支持多种文本文件类型（.md, .txt, .json, .yaml, .yml 等）
3. **渲染策略**：根据文件扩展名选择对应的渲染组件
4. **侧边栏导航**：显示所有支持的文件类型，用图标区分

## 支持文件类型

| 类型 | 扩展名 | 渲染方式 |
|------|--------|----------|
| Markdown | .md | MarkdownViewer + frontmatter |
| 文本 | .txt | 纯文本展示（代码高亮）|
| JSON | .json | 格式化 JSON + 语法高亮 |
| YAML | .yaml, .yml | 格式化 YAML + 语法高亮 |
| 图片 | .png, .jpg, .jpeg, .gif, .svg | 图片预览 |
| 代码文件 | .js, .ts, .css, .html 等 | 代码高亮展示 |

## 用户需求确认

1. **文件类型范围**：支持全部 GitHub 文件类型
2. **图片展示**：侧边栏直接预览

## 文件类型分类

基于探索结果，以下是详细的文件类型处理方案：

### 文本文件（使用 highlight.js）
| 类别 | 扩展名 | 组件 | 特殊处理 |
|------|--------|------|----------|
| Markdown | .md, .mdx | MarkdownViewer | frontmatter 解析 |
| 纯文本 | .txt | PlainTextViewer | 无 |
| JSON | .json | JsonViewer | 格式化 + 折叠 |
| YAML | .yaml, .yml | CodeViewer | highlight.js 高亮 |
| 前端代码 | .js, .jsx, .ts, .tsx, .css, .scss, .html, .vue | CodeViewer | highlight.js 高亮 |
| 后端代码 | .py, .rb, .go, .rs, .java, .php, .c, .cpp | CodeViewer | highlight.js 高亮 |
| 配置文件 | .toml, .ini, .conf, .env, .sh, .bash | CodeViewer | highlight.js 高亮 |
| 数据 | .csv, .xml, .sql | CodeViewer | highlight.js 高亮 |

### 图片文件（原生 img 标签）
| 扩展名 | 组件 | 说明 |
|--------|------|------|
| .png, .jpg, .jpeg, .gif, .svg, .webp | ImageViewer | 侧边栏预览 + 内容区展示 |

### 二进制文件（下载按钮）
| 扩展名 | 组件 | 说明 |
|--------|------|------|
| .pdf, .doc, .docx, .xls, .xlsx, .zip, .tar, .gz | DownloadButton | 提供下载链接 |

## 技术架构

### 已存在的资源
- **代码高亮**: 已安装 `rehype-highlight` + `highlight.js` v11.11.1
- **Markdown 渲染**: `MarkdownViewer.tsx` 使用 `react-markdown`
- **样式**: GitHub 风格的代码主题 (`github.css`)
- **静态导出**: `output: 'export'` 模式，使用原生 `<img>` 标签

### 需要新增的文件
1. `PlainTextViewer.tsx` - 纯文本展示
2. `JsonViewer.tsx` - JSON 格式化展示
3. `CodeViewer.tsx` - 通用代码高亮
4. `ImageViewer.tsx` - 图片展示
5. `DownloadButton.tsx` - 下载按钮
6. `DocumentViewer.tsx` - 统一调度组件（替代 MarkdownViewer）
7. `file-types.ts` - 文件类型定义和工具函数

## 详细修改方案

### Phase 1: 基础类型系统（必须）

#### 1. 创建 `app/lib/file-types.ts`

```typescript
// 文件类型定义和检测函数
export type FileCategory = 'markdown' | 'text' | 'json' | 'code' | 'image' | 'binary'

export interface FileTypeInfo {
  category: FileCategory
  mimeType: string
  language?: string  // highlight.js 语言标识
}

// 扩展名到文件类型的映射
const FILE_TYPE_MAP: Record<string, FileTypeInfo> = {
  '.md': { category: 'markdown', mimeType: 'text/markdown' },
  '.mdx': { category: 'markdown', mimeType: 'text/mdx' },
  '.txt': { category: 'text', mimeType: 'text/plain' },
  '.json': { category: 'json', mimeType: 'application/json', language: 'json' },
  '.yaml': { category: 'code', mimeType: 'text/yaml', language: 'yaml' },
  '.yml': { category: 'code', mimeType: 'text/yaml', language: 'yaml' },
  '.js': { category: 'code', mimeType: 'text/javascript', language: 'javascript' },
  '.jsx': { category: 'code', mimeType: 'text/javascript', language: 'jsx' },
  '.ts': { category: 'code', mimeType: 'text/typescript', language: 'typescript' },
  '.tsx': { category: 'code', mimeType: 'text/typescript', language: 'tsx' },
  '.css': { category: 'code', mimeType: 'text/css', language: 'css' },
  '.scss': { category: 'code', mimeType: 'text/scss', language: 'scss' },
  '.html': { category: 'code', mimeType: 'text/html', language: 'html' },
  '.vue': { category: 'code', mimeType: 'text/vue', language: 'vue' },
  '.py': { category: 'code', mimeType: 'text/x-python', language: 'python' },
  '.rb': { category: 'code', mimeType: 'text/x-ruby', language: 'ruby' },
  '.go': { category: 'code', mimeType: 'text/x-go', language: 'go' },
  '.rs': { category: 'code', mimeType: 'text/x-rust', language: 'rust' },
  '.java': { category: 'code', mimeType: 'text/x-java', language: 'java' },
  '.php': { category: 'code', mimeType: 'text/x-php', language: 'php' },
  '.c': { category: 'code', mimeType: 'text/x-c', language: 'c' },
  '.cpp': { category: 'code', mimeType: 'text/x-c++', language: 'cpp' },
  '.toml': { category: 'code', mimeType: 'text/x-toml', language: 'toml' },
  '.ini': { category: 'code', mimeType: 'text/x-ini', language: 'ini' },
  '.conf': { category: 'code', mimeType: 'text/x-conf', language: 'nginx' },
  '.sh': { category: 'code', mimeType: 'text/x-shellscript', language: 'bash' },
  '.bash': { category: 'code', mimeType: 'text/x-shellscript', language: 'bash' },
  '.csv': { category: 'code', mimeType: 'text/csv', language: 'csv' },
  '.xml': { category: 'code', mimeType: 'text/xml', language: 'xml' },
  '.sql': { category: 'code', mimeType: 'text/x-sql', language: 'sql' },
  '.png': { category: 'image', mimeType: 'image/png' },
  '.jpg': { category: 'image', mimeType: 'image/jpeg' },
  '.jpeg': { category: 'image', mimeType: 'image/jpeg' },
  '.gif': { category: 'image', mimeType: 'image/gif' },
  '.svg': { category: 'image', mimeType: 'image/svg+xml' },
  '.webp': { category: 'image', mimeType: 'image/webp' },
}

export function detectFileType(filename: string): FileTypeInfo {
  const ext = path.extname(filename).toLowerCase()
  return FILE_TYPE_MAP[ext] || { category: 'binary', mimeType: 'application/octet-stream' }
}

export function isTextFile(filename: string): boolean {
  const info = detectFileType(filename)
  return ['markdown', 'text', 'json', 'code'].includes(info.category)
}

export function isImageFile(filename: string): boolean {
  return detectFileType(filename).category === 'image'
}

export function getLanguage(filename: string): string | undefined {
  return detectFileType(filename).language
}
```

#### 2. 修改 `scripts/generate-manifest.ts`

**关键修改点 1: 扩展支持的文件类型（第 74 行）**
```typescript
// 修改为
const SUPPORTED_EXTENSIONS = [
  // 文档
  '.md', '.mdx', '.txt',
  // 配置/数据
  '.json', '.yaml', '.yml', '.toml', '.ini', '.conf', '.env',
  // 前端代码
  '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.html', '.vue',
  // 后端代码
  '.py', '.rb', '.go', '.rs', '.java', '.php', '.c', '.cpp',
  // 脚本
  '.sh', '.bash',
  // 数据
  '.csv', '.xml', '.sql',
  // 图片
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp',
]

const files = entries.filter((e) =>
  e.isFile() && SUPPORTED_EXTENSIONS.some(ext =>
    e.name.toLowerCase().endsWith(ext)
  )
)
```

**关键修改点 2: 修改文件名处理（第 81 行）**
```typescript
const ext = path.extname(file.name)
const baseName = path.basename(file.name, ext)
```

**关键修改点 3: 添加文件类型到 NavItem**
```typescript
const fileType = detectFileType(file.name)
items.push({
  type: 'file',
  name: file.name,
  path: relPath,
  slug: relPath,
  order: itemOrder,
  fileType: fileType.category,
  language: fileType.language,
})
```

### Phase 2: 修改数据层

#### 3. 修改 `app/lib/content.ts`

**关键修改点 1: 扩展 NavItem 接口**
```typescript
export interface NavItem {
  type: 'file' | 'directory'
  name: string
  path: string
  slug?: string
  order?: number
  fileType?: string
  language?: string
  children?: NavItem[]
}
```

**关键修改点 2: 扩展 Document 接口**
```typescript
export interface Document {
  slug: string
  title: string
  content: string
  rawContent?: Buffer
  frontmatter: Record<string, any>
  fileType: string
  mimeType: string
  extension: string
  language?: string
  isText: boolean
  isImage: boolean
  created?: string
  updated?: string
}
```

### Phase 3: 创建展示组件

需要创建以下组件：

1. **PlainTextViewer.tsx** - 纯文本展示（灰色背景代码块）
2. **JsonViewer.tsx** - JSON 格式化（可折叠节点 + 复制按钮）
3. **CodeViewer.tsx** - 通用代码高亮（highlight.js + 语言标签）
4. **ImageViewer.tsx** - 图片展示（缩放、下载）
5. **DownloadButton.tsx** - 二进制文件下载
6. **DocumentViewer.tsx** - 统一调度组件

### Phase 4: 修改路由和侧边栏

#### 修改 `app/docs/[...slug]/page.tsx`
- 使用 `DocumentViewer` 替代 `MarkdownViewer`
- 显示文件类型标签和语言标签

#### 修改 `app/components/DocsSidebarClient.tsx`
- 根据 fileType 显示不同图标

## 实施顺序建议

由于改动较大，建议分阶段实施：

### Stage 1: 基础框架（MVP）
1. 创建 `file-types.ts` 类型系统
2. 修改 `generate-manifest.ts` 支持多类型扫描
3. 修改 `content.ts` 支持多类型读取
4. 创建 `DocumentViewer.tsx` 调度组件
5. 修改 `[...slug]/page.tsx` 使用新组件

### Stage 2: 文件查看器
6. `PlainTextViewer.tsx`
7. `JsonViewer.tsx`
8. `CodeViewer.tsx`

### Stage 3: 媒体文件
9. `ImageViewer.tsx`
10. `DownloadButton.tsx`

### Stage 4: 侧边栏优化
11. 修改 `DocsSidebarClient.tsx` 显示文件类型图标

每个 Stage 完成后都进行构建验证，确保功能正常。

## 状态

- [ ] Stage 1: 基础框架
- [ ] Stage 2: 文件查看器
- [ ] Stage 3: 媒体文件
- [ ] Stage 4: 侧边栏优化
