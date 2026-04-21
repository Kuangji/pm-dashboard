# YouTube to NotebookLM · 交互流程映射

## 用户目标

把一个 YouTube 频道的公开视频批量送进 NotebookLM，立刻进入可问答、可摘要的研究状态，而不是手工逐条复制 URL。

---

## Flow A：频道 -> NotebookLM

### 入口触发

- 入口位置：
  - YouTube 频道页注入按钮
  - 扩展 popup 中的 create / choose notebook
- 前置条件：
  - 用户已登录 YouTube
  - 用户已登录 NotebookLM
  - 当前频道页可解析到 canonical channel URL

### 核心操作步骤

1. 用户在频道页点击 `YouTube to NotebookLM`
   - UI 反馈：按钮进入 active 状态，弹出选择面板
   - 成功路径：展示 notebook 列表、create notebook、back、搜索框
   - 异常处理：若 NotebookLM 未登录，会提示 `Please authorize NotebookLM to continue`

2. 内容脚本解析当前 YouTube 页面上下文
   - UI 反馈：无明显前台反馈
   - 成功路径：
     - 从页面脚本抓 `ytcfg`
     - 抽取 `INNERTUBE_API_KEY`、`SESSION_INDEX`、`visitorData`、`ID_TOKEN`
     - 从 canonical URL 解析 `channelId`
   - 异常处理：若 URL 无法归一到 `/channel/...`，则无法进入后续 channel browse

3. 内容脚本调用 YouTube 前台 `youtubei/v1/browse`
   - UI 反馈：进入 `Generating...`
   - 成功路径：
     - 指向频道 `Videos` tab
     - 跟随 continuation 拉更多视频
     - 过滤 members-only
     - 若频道视频为空，回退到 `Streams` tab 再拉一轮
   - 异常处理：
     - 只会抓公开可见内容
     - 代码里有 `videos.length < 300` 的显式循环上限

4. 用户选择 `Create notebook` 或现有 notebook
   - UI 反馈：`Creating Notebook...`
   - 成功路径：
     - background script 读取 NotebookLM 页面 HTML
     - 抽取 `bl` 和 `at` token
     - 若需要则通过私有 RPC 创建 notebook
   - 异常处理：NotebookLM 页面 token 失效时直接报授权错误

5. background script 通过 NotebookLM 私有 RPC 批量写入 URL
   - UI 反馈：`Adding sources...`
   - 成功路径：
     - YouTube URL 走一套视频源写法
     - 非 YouTube URL 走另一套普通网页源写法
     - 成功后跳转到目标 notebook
   - 异常处理：
     - 若尚未 ingest 完成，会轮询 notebook 状态
     - 未完成则每秒重试

### 完成态

- 成功：打开 `https://notebooklm.google.com/notebook/<uuid>`
- 取消：返回 notebook 选择态，不在 YouTube 页做额外残留状态

### 设计意图假设

- 让“整频道进 AI 工作台”压缩为一次点击，而不是一个多步导入流程
- 尽量复用用户现有的 YouTube 与 Google 登录态，避免自建账号系统
- 用前台脚本拿最短路径的数据，再把重活交给 NotebookLM 自己做摘要和问答

### 摩擦点

- 必须同时依赖 YouTube 页面结构、YouTube 前台接口、NotebookLM 私有 RPC 三层稳定
- 宣传语中的“整个频道”与真实上限之间存在认知差
- 登录失效时错误信息偏技术化
- 对权限敏感用户来说，`<all_urls>` 很容易引发不信任

### 亮点

- 真正做到 end-to-end 一键
- 目标容器可 `create` 也可 `choose`
- 用户不需要自己理解 NotebookLM 的 source 导入细节

---

## Flow B：播放列表 -> NotebookLM

### 入口触发

- 入口位置：
  - watch 页中的 playlist panel
  - playlist 独立页
- 前置条件：
  - URL 带 `list`

### 核心操作步骤

1. 若当前是可见 playlist panel，先读 DOM 中已挂载的 `playlist-panel-video-renderer`
2. 若是标准 playlist 页，则优先改用 YouTube browse continuation 拉列表
3. 持续跟 continuation 直到：
   - continuation 为空
   - 或累计视频到达 `300`
4. 将 URL 列表交给 NotebookLM batch write

### 设计意图假设

- 比频道更容易拿到结构化列表，因此 playlist 是最适合一键批量导入的中间粒度

### 摩擦点

- 依旧不是无限量
- 对 `RD` / mix / radio 类 playlist 做了额外 fallback，但并不保证完整

### 亮点

- 相比只抓 DOM，可多翻几页 continuation，完整性高于“当前可见列表”

---

## Flow C：搜索结果 -> NotebookLM

### 入口触发

- 入口位置：YouTube 搜索结果页按钮
- 前置条件：当前页已经渲染出结果列表

### 核心操作步骤

1. 直接扫当前 DOM 中的 `#video-title`
2. 提取每个结果的 `v` 参数
3. 组装成视频 URL 数组
4. 批量写入 NotebookLM

### 设计意图假设

- 搜索结果是“快速组研究集合”的便捷入口，不追求完整爬取

### 摩擦点

- 这里只读 `当前已渲染 DOM`，没有像频道/playlist 那样走 continuation 深翻
- 因此它更像“把当前第一页 / 当前滚动范围批量发过去”，不是完整 query export

### 亮点

- 非常适合临时主题研究和快速 watchlist 建立

---

## Flow D：任意网页 -> NotebookLM

### 入口触发

- 入口位置：扩展 popup
- 前置条件：当前活动 tab 是任意网页

### 核心操作步骤

1. popup 判断当前 tab 是否为 YouTube
2. 若不是 YouTube，则把当前 URL 作为普通网页 source 写入 NotebookLM
3. notebook 选择逻辑与 YouTube 场景共用

### 设计意图假设

- 把插件从“纯 YouTube 工具”抬升为“面向 NotebookLM 的轻量采集入口”

### 摩擦点

- 这也是它申请 `<all_urls>` 的直接原因，但用户未必能一眼理解这一点

### 亮点

- 工作流完整性更强，研究用户可以顺手把网页、文章、YouTube 一起送进去
