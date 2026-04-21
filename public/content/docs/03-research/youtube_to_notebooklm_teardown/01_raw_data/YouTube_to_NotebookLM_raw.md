# YouTube to NotebookLM - 原始证据

## 来源总表

- Chrome Web Store：<https://chromewebstore.google.com/detail/youtube-to-notebooklm/kobncfkmjelbefaoohoblamnbackjggk>
- 扩展包下载入口：<https://clients2.google.com/service/update2/crx?response=redirect&prodversion=126.0.0.0&acceptformat=crx2,crx3&x=id%3Dkobncfkmjelbefaoohoblamnbackjggk%26installsource%3Dondemand%26uc>
- 隐私政策：<https://docs.google.com/document/d/1ZLdX8f7glJsTftlqN1IKDEQ2v5weZb2yX8kVmSdxi0k/edit?usp=sharing>
- Google 官方博客：<https://blog.google/technology/google-labs/notebooklm-audio-overviews-youtube-sources/>
- Google 官方博客（移动分享）：<https://blog.google/technology/ai/notebooklm-app/>
- Reddit 首发帖：<https://www.reddit.com/r/notebooklm/comments/1mh7la2/ive_built_a_chrome_extension_to_send_the_entire/>
- Reddit 更新帖（相关搜索结果）：`Add entire YouTube channels and playlists to NotebookLM with no more duplicate sources`

采集时间：2026-04-21

---

## 一、Chrome Web Store 官方信息

### 来源

- URL：<https://chromewebstore.google.com/detail/youtube-to-notebooklm/kobncfkmjelbefaoohoblamnbackjggk>
- 采集时间：2026-04-21
- 信息类型：官方店页 / 官方元数据 / 官方隐私声明

### 结构化事实

- 名称：`YouTube to NotebookLM`
- Slogan：`Send YouTube to NotebookLM. Save videos, sync YouTube channel to NotebookLM, and manage any NotebookLM video easily`
- 分类：`Extension > Tools`
- 用户量：`300,000 users`
- 评分：`4.9 / 5`
- 评分数：`586 ratings`
- 版本：`1.0.26`
- 更新时间：`April 21, 2026`
- 包大小：`3.98 MiB`
- 语言：`52 languages`
- Offered by：`yt.to.notebooklm`
- Developer email：`yt.to.notebooklm@gmail.com`
- 标记：`Featured`
- 隐私页声明处理的数据类型：`User activity`
- 店页声明：
  - 不向第三方出售数据
  - 不将数据用于与核心功能无关的用途
  - 不用于信用或放贷判断
- 欧盟状态：`Non-trader`

### 店页表述的能力范围

- 支持将：
  - 单个 YouTube 视频
  - 整个播放列表
  - 整个频道
  - 搜索结果页
  批量发送到 NotebookLM
- 支持：
  - 创建 notebook
  - 从现有 notebook 列表中选择目标
  - 发送任意浏览器标签页，而不仅是 YouTube

### 初步标注

- 🟢 亮点：用户量和评分都不低，说明这个需求是真需求，不是演示型小工具
- 🟢 亮点：`Featured` 说明它至少通过了 Chrome 商店的推荐实践检查
- 🔴 问题：店页文案把“整个频道”说得很满，但未解释真实上限与覆盖范围
- ❓ 待确认：实际导入上限、是否真覆盖全频道、是否依赖 NotebookLM Plus

---

## 二、NotebookLM 官方背景

### 来源 1

- URL：<https://blog.google/technology/google-labs/notebooklm-audio-overviews-youtube-sources/>
- 日期：2024-09-26
- 信息类型：Google 官方博客

### 摘要

- Google 在 2024-09-26 正式宣布 NotebookLM 支持 `YouTube URLs` 作为源。
- 这说明扩展并不是“让 NotebookLM 首次支持 YouTube”，而是在做 `批量导入与入口自动化`。

### 来源 2

- URL：<https://blog.google/technology/ai/notebooklm-app/>
- 日期：2025-05-19
- 信息类型：Google 官方博客

### 摘要

- Google 在 2025-05-19 推出 NotebookLM App，并强调移动端支持 `分享网页、PDF 和 YouTube 视频` 到 NotebookLM。
- 这说明 Google 正在补齐原生 `share into NotebookLM` 能力，但官方仍未原生解决桌面端的 `整频道 / 播放列表 / 批量搜索结果导入`。

### 初步标注

- 🟢 亮点：扩展踩在 NotebookLM 官方已支持 YouTube URL 的能力之上，不需要自建视频理解模型
- 🟢 亮点：需求成立点不是“视频能不能进 NotebookLM”，而是“如何批量、低摩擦地进”
- 🔴 问题：官方原生能力在继续增强，这会逐步侵蚀“单视频分享”这类浅层护城河

---

## 三、社区信号

### 来源

- URL：<https://www.reddit.com/r/notebooklm/comments/1mh7la2/ive_built_a_chrome_extension_to_send_the_entire/>
- 采集时间：2026-04-21
- 信息类型：开发者首发帖 + 用户回复

### 结构化观察

- 开发者把卖点明确讲成：
  - 整个频道进入 NotebookLM
  - 最新视频自动导入
  - 播放列表、搜索结果也可批量导入
- 回复中出现的真实用户诉求：
  - 有人要导入 `400+` 视频
  - 有人要导入 `1000+` 视频
  - 大家关心的不是“能不能进”，而是“能进多少、会不会重复、能否稳定”
- 讨论中暴露出的疑虑：
  - 扩展不是开源
  - 申请了很宽的站点权限
  - 曾出现过重复 notebook / 重复 source 问题
- 社区中也出现了更新帖，强调：
  - duplicate 问题修复
  - channel / playlist ingest 继续强化

### 从社区与代码交叉印证出的高置信信号

- 免费 / 付费层大概率对应 `50 / 300` 的导入上限
- “整个频道”实际指向的是 `最近一段公开视频集合`，不是无限量历史归档
- 这个产品的核心价值在于 `节省手工复制 URL 的时间`，而非自有数据分析

### 初步标注

- 🟢 亮点：用户为“批量导入频道到 AI 研究容器”这件事买单
- 🟢 亮点：真实需求比“单视频分享”深得多，带有明确的研究 / watchlist 场景
- 🔴 问题：社区对闭源 + 大权限 + 隐私可信度有天然戒备
- 🔴 问题：大量用户需求已经超过 300，现有方案不是真正的 whole-channel archive

---

## 四、CRX 包与源码事实

### 来源

- URL：通过 Google Update Service 拉取的 `1.0.26` CRX 包
- 采集时间：2026-04-21
- 信息类型：可运行产物源码

### manifest 级事实

- `manifest_version = 3`
- 版本：`1.0.26`
- `content_scripts.matches = *://*/*`
- `host_permissions = <all_urls>`
- `background.service_worker = /build/background.js`
- `options_page = /ytlm-app/dist/index.html`
- 权限：
  - `tabs`
  - `storage`
  - `contextMenus`
  - `scripting`
  - `unlimitedStorage`

### 代码层可确认的外部端点

- `https://www.youtube.com/youtubei/v1/browse`
- `https://notebooklm.google.com/_/LabsTailwindUi/data/batchexecute`
- `https://accounts.google.com/ListAccounts`
- `https://api.mixpanel.com/track`
- Sentry DSN（内嵌在前端 bundle）

### 代码层未发现的东西

- 未发现自有业务后端 API
- 未发现自有数据库 / 自有内容处理服务端点
- 未发现真正的服务端中转上传链路

### 初步标注

- 🟢 亮点：核心功能几乎是纯前端完成，成本很低
- 🟢 亮点：没有自建后端，说明它的产品价值主要来自 workflow stitching
- 🔴 问题：`<all_urls>` 权限过宽，和用户看到的“只是 YouTube 工具”存在认知落差
- 🔴 问题：NotebookLM 与 YouTube 都依赖私有前台接口，稳定性风险高

---

## 五、隐私政策文本观察

### 来源

- URL：<https://docs.google.com/document/d/1ZLdX8f7glJsTftlqN1IKDEQ2v5weZb2yX8kVmSdxi0k/export?format=txt>
- 日期：`Last Updated: 29.07.2025`
- 信息类型：开发者隐私政策

### 观察

- 文本是一个非常通用的隐私政策模板，出现了不少与当前扩展并不贴合的表述：
  - account creation
  - donation or purchase
  - newsletter
  - phone number / mailing address / payment information
  - 多处出现 `Creative Commons`
- 与实际代码对比，当前扩展并未显式体现：
  - 自有注册体系
  - 购买流程
  - 邮件订阅
  - 自有支付链路

### 推断

- 这份隐私政策大概率是模板化复制后轻改得到，不是严格对齐当前实现的工程文档。
- 这会放大用户对 `广泛权限 + 闭源实现` 的不信任。

### 初步标注

- 🔴 问题：政策文本与实现明显不完全对齐，属于信任层弱点
- ❓ 待确认：后续版本是否会接入真正的账户 / 订阅 / 支付体系
