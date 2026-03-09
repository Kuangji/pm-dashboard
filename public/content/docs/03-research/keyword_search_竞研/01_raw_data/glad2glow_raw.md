# Tarsight · Glad2Glow 关键词搜索 原始记录

**采集时间**：2026-03-09
**操作员**：用户手动截图
**记录员**：AI 结构化整理
**研究定位**：第三验证案例（品牌名唯一、无歧义，验证召回端的失效模式）

---

## 数据汇总

| 维度 | Glad2Glow | Uwell | Dreame |
|------|-----------|-------|--------|
| Creators 总量（Tarsight）| **219** | 9.1K | 165.6K |
| **Creators 总量（Nox）** | **1.73万** | ❓ 待补 | ~7,366（2月口径）|
| **Nox vs Tarsight（Creators）** | **Nox 领先 79×** | — | Nox 领先 59×（有效口径）|
| Posts（近 7 天，Tarsight）| 58K | 98 | 3K |
| **Posts（近 7 天，Nox）** | **6.4万** | ❓ 待补 | ~17,677（2月口径）|
| Creator Other% | 68.55% | 95.67% | 94.68% |
| 前 10 Creator Badcase 率 | 0% | 90% | 100% |
| 主要失效模式 | **召回差** | 精度差（复合词）| 精度差（子串）|

### ⚠️ 口径说明

| 口径 | Tarsight Creators | Nox Creators |
|------|-----------------|-------------|
| 统计逻辑 | 账号名含「glad2glow」的全量账号（静态索引，无时间限制）| 在统计周期内实际发布过相关内容的创作者数量 |
| 时间维度 | ∞（全量历史）| 由查询时间范围决定 |

### Nox vs Tarsight 数据量对比

| 维度 | Tarsight（全量）| Nox 7 天（0226-0304）| Nox 近 2 年（20240310-20260309）| 说明 |
|------|----------------|---------------------|-------------------------------|------|
| Creators | **219** | 1.73万（17,300）| **28.28万（282,800）** | Nox 领先 **1,292×** |
| Posts | **58K（7 天）** | **6.4万（64K，7 天）** | — | 7 天口径可直接对比，基本持平 |

**近 2 年 Nox Creators 平台明细（20240310-20260309）**：

| 平台 | 相关网红 | 占比 |
|------|---------|------|
| TikTok | 27.44万 | 97.02% |
| Instagram | 7,441 | 2.63% |
| YouTube | 824 | 0.29% |
| **合计** | **28.28万** | |

**关键洞察**：Glad2Glow 是典型的 TikTok 爆发品牌（97% 集中在 TikTok）。Tarsight 仅能找到 219 个官方账号，而 Nox 在近 2 年内识别了 28.28 万个真实创作者——1,292× 的差距直接印证了 Creator 搜索召回失效的严重程度。

### Nox · Glad2Glow 平台明细（2026-02-26 ~ 2026-03-04）

| 维度 | YouTube | TikTok | Instagram | 合计 |
|------|---------|--------|-----------|------|
| 提及视频 | 52 (0.08%) | 6.36万 (99.43%) | 307 (0.47%) | **6.4万** |
| 相关网红 | 33 (0.19%) | 1.71万 (98.44%) | 237 (1.36%) | **1.73万** |

---

## TG1/TG2 · Creator List（截图 #12，2026-03-09）

**总量**：219 Accounts Match Your Criteria

**平台分布**：
| 平台 | 数量 |
|------|------|
| TikTok | 143 |
| Instagram | 55 |
| Facebook | 18 |
| YouTube | 2 |
| X | 1 |
| 其余 | 0 |
| **合计** | **219** |

**前 10 条 Badcase 分析**：

| # | 账号名 | 地区 | 粉丝 | 判断 | 说明 |
|---|-------|------|------|------|------|
| 1 | glad2glow.indo | 🇮🇩 | 3M | ✅ | 印尼官方主号，KBI 5.49，ER 1.19% |
| 2 | Glad2Glow_Official | — | 835K | ✅ | 官方总账号，ER 7.2% |
| 3 | Glad2Glow.my | 🇲🇾 | 775K | ✅ | 马来西亚官方，ER 3.56% |
| 4 | Glad2Glow Indonesia | 🇮🇩 | 723K | ✅ | 印尼官方（不同账号），ER 8.21% |
| 5 | Glad2Glow.Cosmetic | 🇮🇩 | 566K | ✅ | G2G 旗舰店，ER **40.75%**（极高）|
| 6 | Glad2Glow.ph | 🇵🇭 | 289K | ✅ | 菲律宾官方，ER 2% |
| 7 | glad2glow_exfo | 🇮🇩 | 262K | ✅ | 官方商店（去角质产品线）|
| 8 | Glad2GlowThai | 🇹🇭 | 241K | ✅ | 泰国官方，ER 6.14% |
| 9 | Glad2Glow Retinol | 🇮🇩 | 193K | ✅ | 产品线子账号（视黄醇系列）|
| 10 | Glad2glow | 🇮🇩 | 163K | ✅ | 联盟营销账号，@glad2glow_id 关联 |

**前 10 Badcase 率：0/10 = 0%**

**关键观察**：
- 219 个结果几乎全为品牌官方账号、区域分账号、产品线子账号、官方联盟号
- Brand 字段全部显示「Glad2Glow」，说明 Tarsight 正确识别了品牌关联
- ⚠️ 但这 219 个账号仅代表「账号名含 glad2glow 的账号集合」，**不代表真实的 KOL 生态**

---

## TG3 · Creator Insight（截图 #13，2026-03-09）

**Creator Category Analysis 完整数据**：

| Creator Category | Number of Creators | Percentage (%) | Avg. Followers | Avg. Engagement Rate (%) |
|-----------------|-------------------|----------------|----------------|--------------------------|
| **Other** | **170** | **68.55%** | 7,944 | 0.67 |
| Beauty & Personal Care | 50 | 20.16 | 170,356 | 0.94 |
| Fashion | 8 | 3.23 | 445,769 | 0.63 |
| Drama & Film | 5 | 2.02 | 728,509 | 2.01 |
| Comedy & Entertainment | 4 | 1.61 | 89,372 | 1.67 |
| Tech & Auto | 3 | 1.21 | 264,165 | 1.11 |
| Family & Lifestyle | 2 | 0.81 | 45,894 | 1.65 |
| News & Society | 2 | 0.81 | 164,300 | 0.17 |
| Food & Drink | 1 | 0.40 | 241,100 | 1.36 |
| Gaming | 1 | 0.40 | 241,100 | 1.74 |
| Pets | 1 | 0.40 | 47,500 | 2.11 |
| Travel & Outdoors | 1 | 0.40 | 33,598 | 1.02 |

**关键观察**：
- Other = 68.55%（vs Dreame 94.68%，Uwell 95.67%）——大幅下降
- 但降低原因不是「搜索质量提升」，而是「搜索结果本身是品牌官号集合」——官号天然被系统分类到 Beauty & Personal Care
- Other 均值粉丝 7,944（远高于 Dreame 1,140、Uwell 635），说明 Other 里是真实账号而非噪音空账号
- Beauty & Personal Care = 20.16% ← 正确分类的品牌相关账号

---

## TG4 · Posts Analytics（截图 #14，2026-03-09）

**总量**：**58K Posts（近 7 天，2026-02-26 ~ 2026-03-04）**

**平台分布**：
| 平台 | 数量 | 占比 |
|------|------|------|
| TikTok | **56.6K** | **97.6%** |
| Instagram | 693 | 1.2% |
| X | 383 | 0.7% |
| YouTube | 109 | 0.2% |
| Facebook | 4 | 0.0% |
| 其余 | 0 | — |
| **合计** | **~58K** | |

**前 10 条内容分析**：

| # | 内容摘要 | 语言 | 来源 | 判断 |
|---|---------|------|------|------|
| 1 | "We love Glad2Glow 😍 #GLAD2GLOW" Ramadan routine | 英语/印尼语 | UGC @rahiwen | ✅ 品牌 UGC，2M 播放 |
| 2 | "#glad2glow #glad2glowpowderfoundation" | 印尼语 | UGC @Faaaaz | ✅ 产品测评，1M 播放 |
| 3 | "ini bisa dipake dari umur 13 tahun #glad2glow" | 印尼语 | EC @Racombyanumi | ✅ 护肤测评 |
| 4 | "G2G 3.3 BIG SALE! #glad2glow" | 印尼语 | UGC @Glad2Glow.Cosmetic | ✅ 官方促销 |
| 5 | "#glad2glow" by @Nyafashion | — | EC | ✅ 时尚博主 |
| 6 | "Your Glow Cushion just got an UPGRADE" | 英语 | UGC @Glad2Glow.my | ✅ 官方马来西亚 |
| 7 | "GO Baby Blubii 🫐 Ceramide Moisturizer" | 英语 | UGC @Glad2Glow.my | ✅ 官方新品 |
| 8 | "G2G Baby Peach" | 英语 | UGC @Glad2Glow.my | ✅ 官方新品 |
| 9 | "Meet our newest obsession... GO BABY!" | 英语 | UGC @Glad2Glow.my | ✅ 官方 |
| 10 | "#glad2glow combo glowing set time raya" | 马来语 | EC @Deemlyana | ✅ 斋戒节促销 UGC |

**前 10 Posts Badcase 率：0/10 = 0%**

**重要发现 — Posts vs Creators 的割裂**：
- Posts 搜索（基于 Hashtag/内容文本）找到 58K 条真实内容
- Creator 搜索（基于账号名）只找到 219 个账号
- 58K 条内容背后的真实 KOL，在 Creator 搜索里**完全不存在**
- 品牌若要通过 Tarsight 建立 KOL 合作列表，只能看到 219 个官方账号，而看不到创作了绝大多数内容的几千名真实创作者
