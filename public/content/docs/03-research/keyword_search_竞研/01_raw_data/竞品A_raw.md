# Tarsight 截图会话原始记录

**采集时间**：2026-03-05
**操作员**：（用户手动）
**记录员**：AI 结构化整理

---

## 会话记录

> 按任务编号记录，每条截图一个区块。

---

### T1 · 搜索功能入口

**操作指令**：打开仟传 Tarsight，截图首页/主界面，重点展示导航栏和菜单结构。

**截图**：#1（已收到，2026-03-05）

**解读**：

观察到：
- 产品名：**Tarsight**（左上角 Logo）
- 登录用户：fan.fan5 / fa***.e.com（测试账号）
- 主界面即搜索页面（Quick Search），搜索是核心功能入口
- 顶部欢迎语："Welcome fan.fan5! Start by searching for an content or check out our top picks for you."（注意：文案有拼写错误，"an content" 应为 "any content"）

左侧导航栏（从上到下）：
1. **Quick Search**（当前激活，蓝色高亮）— 核心搜索功能
2. Posts Analytics — 内容分析
3. Creators Analytics — 达人分析
4. TikFlash（New! 标签）— 新功能
5. Magic Search — 魔法搜索（另一搜索入口？）
6. My Tracked — 我的追踪
7. Plan Comparison — 方案对比
8. Report And Alert — 报告与提醒
9. Event Management — 活动管理
10. Trending — 趋势

主区域布局：
- **搜索 Tab**：Post | Creator（两个维度）
- **搜索框**：placeholder "Freely search anything using keywords match"（全宽搜索框，右侧放大镜图标）
- **Trending 板块**（过去 7 天，地区：美国）
  - Top Songs（10 条，含封面图 + 歌手名）
  - Top Hashtags（10 条）
  - Top Creators（10 条，含头像）

**关键设计洞察**：
- 搜索首页即展示 Trending 热榜，没有闲置空间，提升用户留存意图
- 搜索分 Post / Creator 两个维度，与 NoxInfluencer 类似
- 存在「Quick Search」和「Magic Search」两个搜索入口，功能差异待确认

**记录**（已归档）：
- 导航结构：10 项菜单，Quick Search 为首位
- 搜索对象：Post / Creator 双维度
- Trending 板块：Songs / Hashtags / Creators 三列
- 界面语言：英文

**追问**：无，信息已足够

**下一步 → T2：搜索交互形态 + TC：Dreame 关键词搜索（合并操作）**

---

### T2 · 关键词搜索交互形态 + TC · Posts 搜索结果（截图 #2）

**确认**：左侧导航 **Posts Analytics** 高亮 → 确认为 Posts 搜索结果页

**截图**：#2（已收到，2026-03-05）

**解读**：

观察到：
- **搜索入口**：搜索不在 Quick Search 首页，而是在左侧「Posts Analytics」/ 「Creators Analytics」各自模块内独立搜索
- 搜索框位于顶部，带 Filter 按钮（左侧漏斗图标）+ 「My Saved Searches」下拉
- 当前搜索词：`dreame`（小写，系统自动处理大小写）

平台分布（Posts，dreame，默认时间范围 2026-02-25 ~ 2026-03-03 = **过去 7 天**）：
| 平台 | 数量 |
|------|------|
| TikTok | 1.18K |
| Instagram | 542 |
| YouTube | 565 |
| Snapchat | 0 |
| Facebook | 5 |
| X（Twitter）| 329 |
| Kwai | 0 |
| Reddit | 0 |
| Twitch | 0 |
| Website | 38 |
| **合计** | **≈ 3K** |

**⚠️ 重要发现**：默认时间筛选器为「过去 7 天」（2026-02-25 ~ 2026-03-03），**3K 是近 7 天的数据，不是全量**。需后续确认去掉时间限制后的总量。

列表字段：Post（标题+缩略图）/ Publish Time / Views / Engagement / Sentiment

操作功能：Add Report / Export / Columns Setting / Post List | Post Insight 子 Tab

**前 4 条内容（Badcase 分析）**：

| # | 来源 | 标题摘要 | 账号 | Views | Badcase？ |
|---|------|---------|------|-------|----------|
| 1 | YouTube | Dreame X60 Ultra Complete... | Dreame Polska | 3M | ❌ 否（官方账号）|
| 2 | TikTok | My crush said the first look... | Xyriel Manabat（@Dreame 标签）| 1M | **✅ 是（与 Dreame 品牌无关，仅因 @Dreame 标签被收录）** |
| 3 | TikTok | Gdyby premierowy robot sprzątający Dreame X60... | Media Expert | 1M | ❌ 否（产品评测）|
| 4 | TikTok | dreame vaccume cleaner #shorts #product #review | （截断）| 433K | ❌ 否（产品内容）|

**当前可见 Badcase 率**：前 4 条中 1 条不相关 = **25%**（样本量小，待扩大统计）

**记录**（已归档）：
- Posts 近 7 天结果：**3K**（含时间筛选）
- 平台分布：TikTok 主导（1.18K / 3K ≈ 39%）
- 搜索入口：在 Posts Analytics 模块内，非 Quick Search 首页

---

### TC · Creators 搜索结果（截图 #3）

**确认**：左侧导航 **Creators Analytics** 高亮 → 确认为 Creators 搜索结果页

**截图**：#3（已收到，2026-03-05）

**解读**：

观察到：
- 搜索词：`Dreame`（大写，系统接受）
- Creator 搜索无时间筛选，直接显示全量账号匹配

平台分布（Creators，Dreame，全量）：
| 平台 | 数量 |
|------|------|
| TikTok | 39.32K |
| Instagram | **81.38K**（最多）|
| YouTube | 32.65K |
| Snapchat | 64 |
| Facebook | 2.18K |
| X（Twitter）| 8.56K |
| Kwai | 2 |
| Reddit | 1.38K |
| Twitch | 176 |
| **合计** | **165.6K** |

列表字段：Creator（头像+名称+简介）/ Country/Region / Followers / KBI / Likes / Post Count / P Cou...（截断，疑似 Price Count 或类似）

操作功能：Add Report / Export / Columns Setting / Creator List | Creator Insight 子 Tab

**前 5 条内容（Badcase 分析）**：

| # | 平台 | 账号名 | 粉丝数 | Badcase？ | 原因 |
|---|------|-------|-------|----------|------|
| 1 | YouTube | Different Dreamer shorts | 8M | **✅ 是** | 账号名含「Dreamer」但与 Dreame 品牌无关，为印度内容创作者 |
| 2 | Facebook | Dreame ♀️ | 5M | **✅ 是** | 「Dreame」小说/言情平台（西班牙语简介），非家电品牌 |
| 3 | Facebook | Dreame ♀️ | 5M | **✅ 是** | 同上（不同账号 ID，相同品牌）|
| 4 | Facebook | Dreame ♀️ | 5M | **✅ 是** | 同上 |
| 5 | Facebook | Dreame ♀️ | 5M | **✅ 是** | 同上（简介：Dreame is at the center of online romance fiction）|

**⚠️ 严重 Badcase 问题**：前 5 条中 **5 条全部是 Badcase**！
- 「Dreame」小说平台（romance fiction）的 Facebook 账号大量入库，粉丝量 5M，KBI 1.34
- 「Different Dreamer shorts」因名字近似被误收录
- 真正的 Dreame 家电品牌账号在前 5 条完全未出现

**当前可见 Badcase 率**：前 5 条中 5 条不相关 = **100%**（样本量小，但信号极强）

**记录**（已归档）：
- Creators 全量结果：**165.6K**
- Instagram 主导（81.38K / 165.6K ≈ 49%）
- Badcase 来源：同名小说平台「Dreame」账号大量污染搜索结果

---

### T3 · 搜索结果总数展示

**已在 #2、#3 中覆盖**：
- Posts（近 7 天）：3K
- Creators（全量）：165.6K

---

### T4 · 搜索结果列表

**已在 #2、#3 中覆盖**，列表视图格式：
- 表格形式，每行一条内容/账号
- 支持多选（复选框）
- 可自定义列（Columns Setting）

---

### T5 · 单条结果卡片

**已在 #2、#3 中覆盖**，字段清单：

**Posts 卡片字段**：
| 字段名 | 值示例 | 备注 |
|-------|-------|------|
| 缩略图 | 视频封面 | 带平台 Logo 标识 |
| 标题 | Dreame X60 Ultra Complete... | 支持多语言 |
| 账号名 | Dreame Polska | 蓝色可点击 |
| 标签 | @Dreame（若有）| 橙色 tag |
| Publish Time | 25 Feb 2026 15:15 | 精确到分钟 |
| Views | 3M | 简写格式 |
| Engagement | 91 / 67K | 简写格式 |
| Sentiment | Neutral / Positive | 带图标 |

**Creators 卡片字段**：
| 字段名 | 值示例 | 备注 |
|-------|-------|------|
| 头像 | 圆形头像 | |
| 账号名 | Different Dreamer shorts | 含平台 Logo |
| 账号 ID | UC-abx8ArJlAFIiYXPLnngkA | 系统内部 ID |
| 简介摘要 | Dreame está en el centro... | 截断 |
| 标签 | News & Society / +1 | 类别标签 |
| Country/Region | 国旗图标 | 印度🇮🇳 |
| Followers | 8M | |
| KBI | 5.6 | 平台影响力指数 |
| Likes | - | 部分为空 |
| Post Count | 2K | |

---

### T6 · 数据聚合视图（截图 #4 Post Insight + #5 Creator Insight）

---

#### T6-A · Post Insight（截图 #4）

**确认**：左侧 Posts Analytics 高亮，Post Insight Tab 激活

**截图**：#4（已收到，2026-03-05，缩放截图）

**解读**：

Post Insight 提供三个聚合模块，"Performance Of" 下拉可切换维度（当前：Top Hashtags）：

**① Popular Hashtags Word Cloud（词云）**

热门标签（字体大小代表频次）：
- 最大词：`dreame`（明显主导）
- 次级词：`vacuumcleaner`、`tiktokshop`、`dreamerobotvacuum`、`aspiradora`
- 其他相关词：`dreamex60ultra`、`dreametech`、`smarthome`、`robot`、`cleaning`、`mattress` 等
- 出现竞品词：`dyson`（词云中可见）
- 多语言标签：泰语（ `ทำความสะอาด` 类）、波兰语（`sprzątanie`）等 → 说明内容覆盖多国市场

**② Key Hashtag Trends Over Time（趋势折线图）**

时间范围：Feb 25 - Mar 3, 2026（与 Post 列表的时间筛选一致）

图例（5 条线）：
- `#dreame`（蓝色，主导，数值约 130-160 range）
- `#aspiradora`（橙色，极低）
- `#tiktokshop`（绿色，极低）
- `#vacuumcleaner`（紫色，极低）
- `#bed`（红色，极低）

**关键观察**：`#dreame` 呈下降趋势（Feb 25 高峰 ~160，Mar 3 回落 ~120），无明显爆发事件

**③ Trending Hashtags Analysis（数据表格）**

| Popular Tags | Number of Related Posts | Total Likes | Total Views | Avg Engagement Rate |
|-------------|------------------------|-------------|-------------|---------------------|
| #dreame | **946** | 104,234 | **3,933,827** | 0.2% |
| #vacuumcleaner | 98 | 1,269 | 87,013 | 0.1% |
| #tiktokshop | 90 | 1,724 | 463,892 | 0.0% |
| #tiktokshopcreatorpicks | 84 | 1,414 | 69,584 | 0.0% |
| #dreametech | 67 | 28,301 | 336,691（估）| 0.6% |

**关键洞察**：
- `#dreame` 主标签 946 条帖子，总播放 394 万，但 Engagement Rate 仅 0.2%（偏低）
- 3K 总 Posts 中，946 条（31%）带 #dreame 标签，其余 69% 通过关键词匹配但未用品牌 tag
- `#dreametech` 的 ER 0.6% 高于主标签，说明技术向内容质量更高

**记录**（已归档）：
- Post Insight 提供：词云 / 趋势图 / 数据表格
- 聚合维度可切换（Performance Of 下拉）
- 支持单独 Export

---

#### T6-B · Creator Insight（截图 #5）

**确认**：左侧 Creators Analytics 高亮，Creator Insight Tab 激活

**截图**：#5（已收到，2026-03-05，缩放截图）

**解读**：

Creator Insight 提供三个聚合模块，"Performance Of" 当前：Creator Category：

**① Creator Count vs. Engagement Rate by Category（柱状+折线混合图）**

X 轴分类（从左到右）：Other / Family & Lifestyle / Comedy & Entertainment / Tech & Auto / Gaming / Sports / Travel & Outdoors / Arts & Creativity / Education

关键观察：
- **Other 类别柱子极高（约 16 万）**，远超其他分类——这与 Badcase 吻合（romance fiction 账号被归入 Other）
- Family & Lifestyle Tooltip 数据：Engagement Rate 1.65%，Number of Creators 1,172
- 折线（ER%）在 Comedy & Entertainment 附近达峰，然后回落

**② Trending Creator Category（气泡图）**

气泡大小代表创作者数量，X 轴代表数量规模（0-150K），多彩分类

**③ Creator Category Analysis（数据表格）**

| Creator Category | Number of Creators | Percentage | Avg. Followers | Avg. Engagement Rate |
|-----------------|-------------------|------------|----------------|---------------------|
| **Other** | **161,712** | **94.68%** | 1,140 | 0.68% |
| Music & Dancing | 1,211 | 0.71% | 11,631 | 1.67% |
| Family & Lifestyle | 1,172 | 0.69% | 14,510 | 1.65% |
| Drama & Film | 1,134 | 0.66% | 18,562 | 2.01% |
| Comedy & Entertainment | 820 | 0.48% | 28,059 | 1.67% |

**⚠️ 关键发现 — Badcase 的根因**：
- 165.6K 中有 161,712（**94.68%**）被归类为「Other」
- Other 类的 Avg. Followers 仅 1,140（极低），而正常品牌相关账号通常粉丝量更高
- 这强烈印证了前面观察到的 Badcase 来源：Dreame 小说平台的大量小账号（或空账号）被收录，拉低了整体质量，且系统无法识别「同名不同品牌」的噪音数据

**记录**（已归档）：
- Creator Insight 提供：品类分布图 / 气泡图 / 品类数据表
- 94.68% 账号归入 Other，高度疑似噪音数据
- 真正与 Dreame 家电品牌相关的创作者可能仅占 5% 左右（约 8K 条）

---

### T7 · Badcase 深度统计（导出数据分析）

**数据来源**：导出文件 `dreame_keywords_search_posts_report.xlsx`（2,663 条）+ `dreame_keywords_search_creators_report.xlsx`（10,000 条，系统导出上限）

**截图**：不需要，Excel 数据已覆盖全量

---

#### Posts Badcase 分析

**总量**：2,663 条（近 7 天）

平台分布（主要社交媒体）：
| 平台 | 数量 |
|------|------|
| TikTok | 1,182 |
| YouTube | 565 |
| Instagram | 544 |
| Twitter/X | 329 |
| Facebook | 5 |
| 媒体网站（Website）| 38 条（合并）|

语言分布 Top5：英语(988) / 西班牙语(212) / 日语(156) / 泰语(153) / 法语(122)

**Badcase 指标**：
- 「Brand」字段非空（系统识别为提及其他品牌）：**63 条（2.4%）**
  - 主要是 Dyson（16条，对比评测内容）、Pokemon（10条）、Amazon（8条）
  - 注：含 Dyson 的多为「Dreame vs Dyson」对比视频，实际与 Dreame 相关，不算严格 Badcase
- Sentiment：Neutral(2,350) / Positive(311) / **Negative(2)**（极少负面）
- **Posts 层面 Badcase 相对可控**，主要 Badcase 来自 Creator 层

---

#### Creators Badcase 分析（核心发现）

**总量**：UI 显示 165.6K，系统最多导出 10,000 条进行分析

**⚠️⚠️ 关键发现：Dreame 搜索结果 91.4% 是「dreamer」账号噪音**

| 类型 | 数量（/10K）| 比例 | 说明 |
|------|-----------|------|------|
| Nickname 含「dreamer」（非品牌）| **9,141** | **91.4%** | 系统把搜索「dreame」的结果扩展匹配到「dreamer」，子串匹配导致大量噪音 |
| Dreame 小说平台账号（精确匹配）| 25 | 0.25% | Nickname 为「Dreame」但 bio 是 romance fiction 平台 |
| bio 含小说平台词（fiction/novel/story）| 161 | 1.6% | Dreame 小说平台的关联账号 |
| 真正家电品牌相关（vacuum/robot/cleaner）| **23** | **0.23%** | 仅 23 条与 Dreame 家电品牌真正相关 |

**Follower 质量分析**：
- 中位数 Followers：**4,617**（极低，说明大量小/空账号）
- 均值 Followers：21,633
- >100K followers：316 条（3.2%）
- >1M followers：仅 19 条（0.19%）

**根因定位**：
1. **子串匹配**：搜索「dreame」触发了「dreamer」的结果（91.4% 的主要噪音来源）
2. **同名品牌混淆**：「Dreame」同时是一个 romance fiction 平台，账号数量庞大
3. 两类噪音叠加，导致 165.6K 结果中真正相关的估计不超过 **1,000 条**

**典型 Badcase 样本**：
| Nickname | Followers | 为何是 Badcase |
|---------|---------|--------------|
| Different Dreamer shorts | 8M | 「dreamer」子串匹配，印度内容创作者 |
| Dreame（×25 账号）| 5M | romance fiction 平台官号 |
| PopCulture_Dreamer | 387K | 「dreamer」噪音 |
| BUILT BY DREAMERS | （不详）| 「dreamers」子串噪音 |

---

### T8 · 筛选/过滤面板（截图 #6，2026-03-09）

**确认**：点击搜索结果页左上角「Filter」漏斗图标后，右侧抽屉面板弹出

**截图**：#6（已收到，2026-03-09）

**解读**：

观察到：
- Filter 作为**右侧抽屉面板**展开，背景主界面依然可见（无遮罩），**低打扰设计**
- 搜索词：`uwell`（与 Dreame 是同一套筛选体系，功能与关键词无关）
- 匹配结果：98 Posts

**Post 筛选维度（共 15 个）**：

| 维度 | 类型 | 备注 |
|------|------|------|
| 日期范围 | 日期选择器（from~to）| 2026-02-26 → 2026-03-04 |
| Video Duration | 下拉 | |
| Likes | 下拉（范围）| |
| Shares | 下拉 | |
| Comments | 下拉 | |
| Engagements | 下拉 | |
| Sentiment | 下拉 | Neutral / Positive / Negative |
| Post Type | 下拉 | |
| Language | 下拉 | |
| Category | 下拉 | |
| Tag | 下拉 | |
| **Loreal Brands** | 下拉 | ⚠️ 疑似企业定制字段，可能是 L'Oréal 客户专属 |
| Business Video Type | 下拉 | |
| Brand | 下拉 | |
| Brand Type | 下拉 | |

**Creator 筛选维度（2 个）**：

| 维度 | 类型 | 备注 |
|------|------|------|
| Fans | 下拉（粉丝数范围）| |
| Country/Region | 下拉 | 默认 Global |

操作按钮：Close / **Search**（蓝底）

**关键设计洞察**：
- 右侧抽屉模式无上下文切换，用户可边看结果边调整筛选，体验优于全屏 Modal
- Post/Creator 筛选在同一面板内并列，适合搜索结果切 Tab 后无需重新打开
- **Loreal Brands** 字段强烈暗示系统存在企业定制能力，可能对 Loreal 客户提供品牌专属字段

**记录**（已归档）：
- Post 筛选维度：15 个（含 Loreal Brands 企业定制字段）
- Creator 筛选维度：2 个（Fans / Country）
- 筛选面板交互：右侧抽屉，点击 Filter 图标弹出，Close 关闭

---

### Columns Setting · 列显示设置（截图 #7，2026-03-09）

> **⚠️ 澄清记录**：原 T9 任务（排序）理解有误。
> - **排序** = 通过**表头点击**实现，升序/降序切换，无独立 UI 入口
> - **Columns Setting** = 控制列的显示/隐藏，是独立功能，与排序无关

**截图**：#7（已收到，2026-03-09）

**解读**：

弹窗标题：「Select The Columns You Want To Appear」

**可选列清单（Posts，共 11 列，全部默认勾选）**：

| 列名 | 默认展示 | 备注 |
|------|---------|------|
| Publish Time | ✅ | |
| Views | ✅ | |
| Engagement | ✅ | |
| Sentiment | ✅ | |
| Likes | ✅ | |
| Shares | ✅ | |
| Comments | ✅ | |
| Duration | ✅ | 视频时长 |
| Brand | ✅ | |
| Category | ✅ | |
| Video Type | ✅ | |

操作按钮：Cancel / **Done**（黑底）

**关键洞察**：
- 默认全部展示，让用户按需隐藏（而非按需启用），减少首次使用的配置负担
- 11 列包含 Sentiment / Brand / Category 三个分析型字段，说明 Tarsight 把数据标注字段作为核心展示层

**记录**（已归档）：
- Columns Setting 入口：右上角（Export 右侧）
- 可配置列：11 列，全部默认开启
- 排序方式：通过**列表表头点击**实现，升/降序切换

---

### T10 · 导出能力（截图 #8，2026-03-09）

**截图**：#8（已收到，2026-03-09）

**解读**：

弹窗标题：「Export」

| 配置项 | 选项 | 备注 |
|--------|------|------|
| File Name | 文本输入（必填*）| 用户自定义文件名 |
| Range | ● Checked / ○ All (top 10k) | 当前 0 posts（未勾选行）|
| Count | 0 posts（蓝色链接）| 实时反映勾选数量 |
| Data | 全选「All」，可单独反选 | — |

**可导出字段（共 20 项）**：

| 左列 | 右列 |
|------|------|
| All（全选）| — |
| Title | Content |
| Post url | Creator nickname |
| Video type | Video category |
| Post category | Video durtion（⚠️ 拼写错误：应为 duration）|
| **OCR** | **ASR** |
| Engagement | Views |
| Share | Like |
| Comment | Platform |
| Brand | Publish time |
| Sentiment | Hashtags |
| Language | — |

**⚠️⚠️ 重要发现 — OCR + ASR 字段**：
- **OCR（Optical Character Recognition）**：视频画面中的文字识别结果，说明 Tarsight 对视频帧做了图像文字提取
- **ASR（Automatic Speech Recognition）**：视频语音转文字，说明 Tarsight 对视频音轨做了语音识别
- 这意味着 Tarsight 不仅收录帖子元数据，还对**视频内容本身**进行了深度结构化——这是 Content Intelligence 层级的能力

**关键设计洞察**：
- Range 支持「仅已勾选」和「全量 top 10k」两种模式，灵活性较好
- Count 字段实时显示将要导出的数量，防止用户误操作
- 导出前提供完整的字段勾选，不同角色可按需取所需字段（如数据分析师只要 Engagement 指标，内容分析师还要 OCR/ASR）

**记录**（已归档）：
- 导出格式：xlsx（已确认）
- 导出上限：10,000 条（All 模式）
- 字段数量：20 项（含 OCR / ASR 内容理解字段）
- 文件名：用户自定义（必填）

---

## 数据汇总（待完成后填写）

| 对比维度 | Tarsight | NoxInfluencer | 差距 |
|---------|---------|--------------|------|
| Dreame 搜索结果数 | — | — | — |
| 每页展示数量 | — | — | — |
| Badcase 数（前20条）| — | — | — |
| 聚合视图 | — | — | — |
| 筛选维度数量 | — | — | — |

---

## Dreame 品牌监控数据记录（B2 线，待采集）

**采集目标**：Nox Creator 品牌监控，搜索关键词「Dreame」
**采集目的**：与 Uwell / Glad2Glow 统一品牌监控口径，完成三品牌一致对比

**截图清单**：

| 编号 | 时间范围 | 需要数据 | 状态 |
|------|---------|---------|------|
| ① | 近 7 天（20260226-20260304）| Posts 总数 + Creators 总数（含平台气泡分布）| ✅ 已完成（2026-03-09）|
| ② | 近 2 年（20240310-20260309）| Creators 总数（含平台气泡分布，Posts 不用）| ✅ 已完成（2026-03-09）|

**数据记录表**：

| 维度 | 时间范围 | 总数 | TikTok | Instagram | YouTube | 其他 |
|------|---------|------|--------|-----------|---------|------|
| Posts | 近 7 天（20260226-20260304）| **2,434** | 1,519（62.40%）| 603（24.77%）| 312（12.81%）| — |
| Creators | 近 7 天（20260226-20260304）| **1,358** | 834（61.41%）| 311（22.90%）| 213（15.68%）| — |
| Creators | 近 2 年（20240310-20260309）| **41,300（4.13万）** | 22,100（53.52%）| 12,100（29.19%）| 7,132（17.27%）| — |
