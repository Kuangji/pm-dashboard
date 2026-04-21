# YouTube to NotebookLM · 功能拆解

## 一、功能定义

### 用 JTBD 表达

当我在 YouTube 上研究一个主题、频道或播放列表时，我想把一批公开视频一次性送进 AI 研究容器，这样我不用手工复制几十到几百条 URL，就能马上开始摘要、问答和知识整理。

### 它真正解决的问题

- 不是“让 NotebookLM 支持 YouTube”
- 而是“让批量 YouTube 资源进入 NotebookLM 的摩擦足够低”

### 对用户的真实承诺

- 单视频一键发送
- 播放列表批量发送
- 频道公开视频批量发送
- 搜索结果页批量发送
- create / choose notebook

### 它没有解决的问题

- 不是无限量 whole-channel archive
- 不负责视频转写、摘要和 QA 本身
- 不负责频道分析、标签分析、品牌匹配或内容结构化理解

---

## 二、交互实现

### UI 结构

- 注入式入口：
  - YouTube 页面内按钮
- 容器选择层：
  - `Create notebook`
  - `Choose notebook`
  - notebook 搜索 / 筛选
- 反馈状态：
  - `Generating...`
  - `Creating Notebook...`
  - `Adding sources...`
- 承载形态：
  - 内容脚本 + popup + background service worker

### 关键实现链路

1. 内容脚本在 YouTube 页面解析 `ytcfg`
2. 拿到 `INNERTUBE_API_KEY`、session 相关 token
3. 对频道 / 播放列表调用 `youtubei/v1/browse` + continuation
4. 汇总 URL 数组
5. background script 打开 NotebookLM 页面，抓 `bl` 与 `at`
6. 调 NotebookLM `batchexecute`
7. 批量塞 source
8. 轮询 ingest 完成
9. 打开目标 notebook

### 关键推断

- `CCqFvf`：高置信推断为 `创建 notebook`
  - 证据：传入标题，返回 UUID
- `izAoDd`：高置信推断为 `批量添加 sources`
  - 证据：传入 URL 数组与 notebook UUID
- `rLM1Ne`：高置信推断为 `轮询 notebook ingest 状态`
  - 证据：反复请求同一 notebook path，直到文本中出现目标标记
- `ozz5Z`：中高置信推断为 `读取当前账号层级并决定 source cap`
  - 证据：返回值只落到 `50` 或 `300`，后续直接用于 `slice(0, cap)`；并通过是否含 `notebooklm_plus_icon` 做判断

---

## 三、边界处理

### 已确认的限制

- 频道 / playlist continuation 循环存在显式上限：`videos.length < 300`
- 最终写入前会再按 `50` 或 `300` 做 `slice`
- 搜索结果页只扫当前 DOM，不做 continuation 深翻
- channel 流程优先拉 `Videos` tab，空了才回退 `Streams` tab
- members-only 视频会被过滤
- 未看到 Shorts、Community、Pods、全部历史归档的专门覆盖逻辑
- 必须依赖用户本地 Google / NotebookLM 登录态

### 失败与降级

- NotebookLM token 取不到：
  - 直接报 `Please authorize NotebookLM to continue`
- channel URL 不规范：
  - 先 fetch 页面 HTML，再从 canonical URL 解析真实 `/channel/<id>`
- playlist 特殊场景：
  - 对 `RD` 等 mix 类列表做 DOM fallback

### 真实能力边界

- 所谓“整个频道”更准确的说法应是：
  - `频道公开视频列表中的最近一批内容`
- 更不准确但市场上更好卖的说法是：
  - `entire channel`

### 对 Nox 的启发

- 用户真正要的是 `高完成度批量导入`
- 但 Nox 不能把“300 上限 + 私有接口 + 全站权限”当成核心方案

---

## 四、业务信号

### 产品信号

- `300,000 users`
- `4.9 / 5`
- `586 ratings`
- `Featured`
- 2026-04-21 仍在更新

### 这说明什么

- NotebookLM 的批量采集入口是一个真实需求，不是一次性热点
- 用户愿意为“把公开视频批量变成 AI 可问答资料”安装扩展
- 用户要的是 workflow convenience，而不是复杂分析面板

### 它的商业与分发策略

- 主要靠 Chrome Web Store SEO：
  - storeDesc 中大量围绕 `playlist`、`channel`、`search result`、`NotebookLM`
- 不靠复杂账号体系起步
- 用低成本前端拼装快速验证需求

### 它的信任短板

- 闭源
- `host_permissions = <all_urls>`
- 隐私政策高度模板化，和当前实现不完全贴合

---

## 五、设计令牌与前端风格

### 可观测特征

- 注入式 UI 尽量贴近 YouTube 原生环境
- 选择项与 checkbox 结构借用 YouTube/Paper 风格 DOM
- popup 端是独立 SPA，技术栈上可见 Vue 3 + Vuetify 痕迹
- 状态反馈非常直接：
  - `Generating...`
  - `Creating Notebook...`
  - `Adding sources...`

### 设计意图

- 不重构 YouTube 页面
- 只做一个足够短的 capture flow
- 把主要复杂度藏到后台 RPC

### 对 Nox 的借鉴

- 若做浏览器轻入口，不需要“大插件套大面板”
- 真正重要的是：
  - 入口够近
  - 目标容器可选
  - 状态反馈明确
  - 异常不要黑盒

---

## 六、学习与避坑

## 可复用模式

| 模式 | 为什么有效 | 对 Nox 的可迁移性 |
|---|---|---|
| `Create / Choose destination` | 用户不被迫每次新建容器 | 很高 |
| `频道 / playlist / search result 三种批量入口` | 研究入口覆盖完整 | 很高 |
| `前台枚举 + 后台写入` 分层 | 采集与导入职责清晰 | 高 |
| `轮询 ingest 完成后再跳转` | 用户不会掉进空 notebook | 高 |
| `最新公开视频集合` 而不是抽象“全量数据” | 先满足 80% 研究需求 | 高 |

## 反模式

| 反模式 | 问题所在 | Nox 是否应避免 |
|---|---|---|
| 用 `entire channel` 过度承诺 | 容易与 50/300 上限冲突 | 必须避免 |
| 依赖双私有接口 | YouTube 和 NotebookLM 任一改动都可能失效 | 必须避免作为主方案 |
| `host_permissions = <all_urls>` | 用户信任门槛高 | 应缩窄到最小域名范围 |
| 隐私政策模板化 | 风险感知被放大 | 必须避免 |
| 把摘要能力完全外包 | 自身没有数据/分析资产积累 | Nox 不应照搬 |

## 一句话判断

这是一个 `workflow glue product`，不是一个 `data moat product`。  
Nox 应借它的 `入口与链路设计`，但不应借它的 `私有接口依赖与能力上限`。
