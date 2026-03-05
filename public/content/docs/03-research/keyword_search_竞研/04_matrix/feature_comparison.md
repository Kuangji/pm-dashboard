# 功能对比矩阵：关键词搜索

> NoxInfluencer vs 仟传 Tarsight | 基准词：Dreame
> 数据日期：2026-03-05

图例：✅ 完整支持　⚠️ 部分支持　❌ 不支持　❓ 未能观察

---

## 核心数据对比

| 对比维度 | NoxInfluencer | Tarsight | 差距说明 |
|---------|--------------|---------|---------|
| Posts 结果数（近 7 天）| ❓ 待补充 | **3K** | 需 Nox 侧同口径数据 |
| Creators 结果总数 | ❓ 待补充 | **165.6K**（含大量噪音）| — |
| Creators 有效结果（估）| ❓ 待补充 | **~2,700 条（1.64%）** | 区间 1.6%-3%，余为噪音 |
| Posts Badcase 率（前 20）| ❓ 待补充 | ~25%（截图估算）| — |
| Creators Badcase 率 | ❓ 待补充 | **~98.4%**（多语言分析修正）| 严重 |
| 平台覆盖 | ❓ 待补充 | TikTok/IG/YouTube/X/FB/Snapchat/Reddit/Twitch/Website | 9 平台 |

---

## 功能能力对比

| 功能维度 | NoxInfluencer | Tarsight | 备注 |
|---------|--------------|---------|------|
| **搜索入口** | | | |
| 关键词搜索（达人）| ❓ | ✅ | Creators Analytics 模块内 |
| 关键词搜索（内容/帖子）| ❓ | ✅ | Posts Analytics 模块内 |
| 统一搜索入口（Quick Search）| ❓ | ✅ | 首页 Post/Creator 双 Tab |
| 已保存搜索（My Saved Searches）| ❓ | ✅ | 搜索框右侧下拉 |
| **结果展示** | | | |
| 结果总数显示 | ❓ | ✅ | 「3K Posts / 165.6K Accounts Match」|
| 平台分布明细（带数字）| ❓ | ✅ | 顶部各平台 checkbox + 数量 |
| 列表视图（表格）| ❓ | ✅ | 支持多选 + 自定义列 |
| 情感分析（Sentiment）| ❓ | ✅ | Neutral/Positive/Negative |
| KBI 影响力指数 | ❓ | ✅ | 独有综合指标 |
| **聚合分析（Insight Tab）** | | | |
| Hashtag 词云 | ❓ | ✅ | Post Insight 内 |
| Hashtag 趋势折线图 | ❓ | ✅ | 时间范围可调 |
| Hashtag 数据表（关联帖数/点赞/播放/ER）| ❓ | ✅ | 可 Export |
| Creator 品类分布图 | ❓ | ✅ | Creator Insight 内 |
| Creator 品类数据表（ER/均值粉丝数）| ❓ | ✅ | 可 Export |
| **搜索质量** | | | |
| 精确词匹配 | ❓ | ❌ | Tarsight 使用子串匹配，dreame→dreamer 大量噪音 |
| 同名品牌消歧义 | ❓ | ❌ | 无法区分「Dreame 家电」vs「Dreame 小说平台」|
| **操作功能** | | | |
| 多选 + 批量操作 | ❓ | ✅ | 列表行级 checkbox |
| 导出（Export）| ❓ | ✅ | xlsx 格式，10,000 条上限 |
| 自定义列（Columns Setting）| ❓ | ✅ | |
| 添加监控报告（Add Report）| ❓ | ✅ | |
| 时间范围筛选（Posts）| ❓ | ✅ | 默认近 7 天 |
| 平台筛选 | ❓ | ✅ | 可多选平台 checkbox |

---

## 象限分析

**Tarsight 有、Nox 待确认的功能**（调研重点）：
- Hashtag 词云 + 趋势图（Post Insight）
- Creator 品类聚合分析（Creator Insight）
- 情感分析（Sentiment 字段）
- KBI 综合影响力指数
- My Saved Searches（搜索记录保存）

**Tarsight 的明显弱点（Nox 可超越的方向）**：
- **搜索质量极差**：子串匹配导致 Creators 结果 99.77% 为噪音
- **同名品牌无消歧义**：Dreame 小说平台大量污染家电品牌搜索
- **导出上限 10,000 条**：但 UI 显示 165.6K，大量数据无法导出
- Posts 默认时间筛选（近 7 天）对用户来说可能无感知，误导数据量认知

**空白机会（两者都未解决）**：
- 品牌词搜索的「消歧义」能力（区分同名不同品牌）
- 跨平台账号合并去重（同一品牌在各平台的账号统一视图）
