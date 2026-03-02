# Demo 构建规范

## 目录结构

```
demos/
├── [demo-name]/
│   ├── index.html      # 入口文件（必须）
│   ├── demo.json       # 配置信息（必须）
│   └── ...             # 其他资源文件
```

## demo.json 配置

```json
{
  "title": "Demo 标题",
  "description": "简短描述",
  "thumbnail": "preview.png",
  "tags": ["标签1", "标签2"]
}
```

## 技术栈支持

### 1. 原生 HTML/CSS/JS
直接放入即可，无需构建。

### 2. Next.js 项目
需要配置静态导出和相对路径：

**next.config.ts**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  // ⚠️ 关键：使用相对路径，确保资源正确加载
  assetPrefix: '.',
  // 如果 demo 有子路由，需要配置 trailingSlash
  trailingSlash: true,
}

export default nextConfig
```

**路径规则**
- `assetPrefix: '.'` - 资源使用相对路径（如 `./_next/static/...`）
- 这样在 `/demos-raw/my-demo/` 路径下资源才能正确加载
- 绝对路径 `/_next/...` 会导致 404

**构建命令**
```bash
npm run build
```

**输出目录**
将 `dist/` 目录内容复制到 `drafts/publish/demos/[demo-name]/`

### 3. React/Vite 项目

**vite.config.ts**
```typescript
export default {
  base: './',
  build: {
    outDir: 'dist',
  },
}
```

### 4. Vue 项目

**vite.config.ts**
```typescript
export default {
  base: './',
  build: {
    outDir: 'dist',
  },
}
```

## 注意事项

### 路径规则（关键）

| 场景 | 配置 | 示例 |
|------|------|------|
| Next.js | `assetPrefix: '.'` | `/_next/static/` → `./_next/static/` |
| Vite | `base: './'` | 自动处理为相对路径 |
| 原生 HTML | 手动写相对路径 | `./assets/` 或 `./image.png` |

### 检查清单

- [ ] 构建后检查 `index.html` 中的资源路径是相对路径（以 `./` 开头）
- [ ] 所有资源（JS、CSS、图片）都在 demo 目录内
- [ ] demo 目录名使用 kebab-case（如 `monitor-760`）
- [ ] 包含 `demo.json` 配置文件

### 常见问题

**Q: 资源 404**
A: 检查 `assetPrefix` 是否正确设置为 `.`，确保资源路径是相对路径。

**Q: 子路由刷新 404**
A: 对于多页面 demo，确保配置了 `trailingSlash: true`。

## 示例

### Next.js Demo

```bash
# 在 Next.js 项目中
cd my-next-demo

# 配置 next.config.ts 为静态导出
# 构建
npm run build

# 复制到 dashboard
cp -r dist/* ../../drafts/publish/demos/my-next-demo/

# 创建 demo.json
echo '{
  "title": "My Next Demo",
  "description": "描述",
  "tags": ["nextjs"]
}' > ../../drafts/publish/demos/my-next-demo/demo.json
```

### 原生 Demo

```bash
# 直接创建目录
mkdir drafts/publish/demos/my-html-demo

# 放入 HTML 文件
cp index.html demo.json drafts/publish/demos/my-html-demo/
```

## 同步

添加或修改 demo 后运行：

```bash
cd pm-dashboard
npm run sync
```
