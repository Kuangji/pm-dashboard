# Tarsight · 交互流程映射

**数据来源**：竞品A_raw.md T1-T7（截图 #1-#5 + 导出数据）
**整理日期**：2026-03-06

---

## 用户目标：用品牌词搜索相关达人/内容

**入口路径**：

```
左侧导航栏
├── Quick Search（首页）← 通用搜索入口（Post/Creator 两个 Tab，搜索框统一）
├── Posts Analytics   ← 品牌词搜索内容的专用模块（搜索框在此模块内）
└── Creators Analytics ← 品牌词搜索达人的专用模块（搜索框在此模块内）

注：Quick Search 首页与各分析模块的搜索框是两套独立入口，功能差异待后续确认
```

**核心流程（以 Posts 为例）**：

```
1. 点击左侧导航「Posts Analytics」
   → 进入 Posts 搜索页，顶部有独立搜索框

2. 在搜索框输入关键词「dreame」→ 回车/搜索
   → 页面顶部显示各平台 checkbox（TikTok/Instagram/YouTube/Snapchat/Facebook/X/Kwai/Reddit/Twitch/Website）
   → 每个 checkbox 旁标注该平台的内容数量

3. 系统默认时间范围：过去 7 天（如 2026-02-25 ~ 2026-03-03）
   ⚠️ 时间范围无显著视觉标注，用户易误认为是全量数据

4. 结果以表格列表呈现（List Tab 默认激活）
   → 每行：缩略图 / 标题 / 账号名 / 发布时间 / Views / Engagement / Sentiment

5. 可选操作：
   → 勾选平台 checkbox 过滤特定平台
   → 点击「My Saved Searches」下拉 → 保存当前搜索条件
   → 点击「Columns Setting」自定义列
   → 点击「Add Report」创建监测报告
   → 点击「Export」导出数据（xlsx，上限 10,000 条）

Creators 流程同理，操作路径：「Creators Analytics」→ 输入关键词 → 查看 Creator List Tab
差异：Creator 搜索无时间筛选，展示全量历史账号匹配
```

**设计意图假设**：

Posts 和 Creators 分离为两个独立模块，目的是让「内容分析」和「达人分析」各自保持数据维度独立，避免在同一搜索页面做两套数据的混合展示，降低 UI 复杂度。Quick Search 可能是面向轻度用户的快捷入口，而 Posts Analytics / Creators Analytics 是面向重度分析用户的专业入口。

**摩擦点**：

- **时间范围无感知陷阱**：Posts 搜索结果页默认「近 7 天」，时间范围在页面顶部但不够显著，用户看到「3K」极易误认为是全量，实际全量远高于 3K
- **Posts 与 Creators 操作路径分离**：同一品牌词需要在两个模块分别搜索，无法在单一页面横向对比
- **Quick Search 与专业模块的关系不透明**：新用户不清楚两者区别，可能在 Quick Search 入口操作后再去 Posts Analytics 重复操作

**亮点**：

- **顶部平台 checkbox + 实时数量**：搜索后立即看到各平台覆盖量（如 TikTok 1.18K / Instagram 542），点击 checkbox 可实时过滤，认知负担极低
- **My Saved Searches**：支持保存搜索条件，品牌监控重度用户可复用历史搜索，减少重复操作
- **Add Report 闭环**：从搜索结果直接跳转创建监测报告，搜索→监测的路径打通，无需离开当前页面

---

## 用户目标：查看搜索结果聚合统计

**入口路径**：

```
搜索结果页（List Tab 激活时）
├── Post Insight Tab   ← 与 Post List 同级，点击切换
└── Creator Insight Tab ← 与 Creator List 同级，点击切换
```

**核心流程（以 Post Insight 为例）**：

```
1. 在 Posts Analytics 中完成关键词搜索，停留在 Post List 结果页

2. 点击同级 Tab「Post Insight」
   → 不需要重新搜索，数据与当前搜索词/时间范围一致

3. Post Insight 页面展示三个聚合模块：

   ① Popular Hashtags Word Cloud（词云）
      → 字体大小代表该 Hashtag 在搜索结果中的出现频次
      → 直观看到最热门的关联标签（如 #dreame、#vacuumcleaner、#dreametech 等）

   ② Key Hashtag Trends Over Time（趋势折线图）
      → X 轴：时间（与搜索时间范围一致）
      → Y 轴：帖子数量
      → 多条线：Top 5 Hashtag 各自趋势对比

   ③ Trending Hashtags Analysis（数据表格）
      → 字段：Popular Tags / 关联帖数 / 总点赞 / 总播放 / 平均 ER
      → 「Performance Of」下拉可切换分析维度（当前观察到：Top Hashtags）

4. 可选操作：
   → 「Performance Of」下拉切换聚合维度
   → 「Export」导出聚合数据

Creator Insight 流程同理：
  「Creators Analytics」搜索后 → 点击「Creator Insight」Tab
  展示：品类分布双轴图（Creator 数 vs 平均 ER）+ 气泡图 + 品类数据表
```

**设计意图假设**：

List/Insight 双 Tab 设计将「明细浏览」和「聚合洞察」解耦，让用户可以自由在「看单条内容」和「看整体规律」之间切换，而不是强迫两个视图堆叠在同一页面。对于品牌监控场景，这两种需求频繁交替出现，双 Tab 是合理的分层方式。

**摩擦点**：

- **Creator Insight 因 Badcase 导致聚合失真**：「Other」品类占 94.68%（主要是 dreamer 子串匹配的噪音账号），品类分布图在数据质量问题解决前参考价值有限
- **Post Insight 时间范围与搜索绑定**：如果用户想看近 30 天的 Hashtag 趋势，需要先修改搜索时间范围再切换到 Insight，两步操作，无法在 Insight Tab 内单独调整时间

**亮点**：

- **List ↔ Insight 无缝切换**：同一搜索词下可随时在列表和聚合之间切换，不丢失搜索状态，不需要重复操作
- **「Performance Of」维度切换**：聚合分析支持多维度（当前可见 Top Hashtags / Creator Category），可扩展性强
- **三层可视化层次**：词云（感性）→ 趋势图（时间维度）→ 数据表（精确量化），从宏观到精确，满足不同深度需求
