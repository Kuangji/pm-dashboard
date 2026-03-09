# 执行计划：关键词搜索竞品调研

## Iter 1 · Phase 0 决策锚定

**状态**：[x] 已完成

- [x] 确认竞品：仟传 Tarsight
- [x] 确认功能域：达人/内容关键词搜索 + 数据聚合分析
- [x] 确认对比关键词：Dreame
- [x] 确认产出用途：独立调研报告（暂不对接 VDR）
- [x] 创建调研目录结构

---

## Iter 2 · Phase 1 截图采集

**状态**：[x] 完成（2026-03-09，T8/T9/T10 补充完毕）

**探索任务清单（按优先级）**：

必须覆盖：
- [x] T1：搜索功能入口（导航栏/菜单路径截图）— 左侧 10 项菜单，Quick Search 为主入口
- [x] T2：关键词搜索的交互形态（搜索框 UI、输入方式）— Filter 按钮 + My Saved Searches
- [x] T3：搜索结果总数展示 — Posts 近 7 天 3K / Creators 全量 165.6K
- [x] T4：搜索结果列表（表格视图，支持多选和自定义列）
- [x] T5：单条结果卡片（Posts 8 字段 / Creators 9 字段）
- [x] T6：数据聚合视图 — Post Insight（词云+趋势图+Hashtag表）/ Creator Insight（品类分布+气泡图+数据表）
- [x] T7：Badcase 统计（导出数据分析）— Posts Badcase ~2.4% / Creators Badcase **99.77%**（91.4% 来自子串匹配噪音）

对比专用：
- [x] TC：Dreame 搜索 — Posts 3K（近 7 天）/ Creators 165.6K（全量）

按需覆盖：
- [ ] T8：筛选/过滤选项
- [ ] T9：排序选项
- [ ] T10：导出能力

**截图记录**：`01_raw_data/竞品A_raw.md`

---

## Iter 3 · Phase 2-5 产出整合

**状态**：[x] 已完成（2026-03-06）

- [x] `02_ux_flows/tarsight_flow.md` — 交互流程映射（基于 T1-T7 raw data，2026-03-06）
- [x] `03_teardown/tarsight_teardown.md` — 6 维度拆解（2026-03-06）
- [x] `04_matrix/feature_comparison.md` — 对比矩阵（Tarsight 侧已填，Nox 侧数据 ❓ 待 Iter 4 补充）
- [x] `05_insights/竞品洞察.md` — 差距分析 + 改进建议（完成）
- [x] README 进度状态更新（2026-03-06）

---

## Iter 4 · 收尾（用户配合）

**状态**：[x] 已完成（2026-03-09，B1/B2/B3 全线完成）

### 线 B1：T8/Columns/T10 截图采集

- [x] T8：筛选/过滤面板截图（右侧抽屉，15 Post 维度 + 2 Creator 维度）
- [x] T9（修正）：**排序通过表头点击实现，无独立 UI**；截图 #7 为 Columns Setting（列显示控制，11列全默认开启）
- [x] T10：导出弹窗（Range 勾选/全量 top 10k；含 OCR/ASR 字段；文件名必填）

已归档：`竞品A_raw.md` T8/Columns Setting/T10 区块；`feature_comparison.md` 已更新；`竞品洞察.md` 新增发现 7（OCR/ASR）和发现 8（Loreal Brands 企业定制）。

### 线 B2：Nox 侧数据补充

- [x] Posts 结果数（Dreame 近 2 年：**2,434 条**）
- [x] Creators 结果数（Dreame 近 2 年：**1,358 位**）
- [x] 平台覆盖数量（Nox 支持 YouTube / Instagram / TikTok）
- [x] 是否有 Hashtag 趋势/聚合分析（暂无独立聚合视图）
- [x] 是否有情感分析（暂无 Sentiment 字段）

已更新：`feature_comparison.md` 补齐 Nox 侧数据（2026-03-09）；近 2 年口径数据已写入 `调研报告_v1.md`（Posts 2,434 / Creators 1,358 / 近2年 41,300）。

### 线 B3：Uwell + Glad2Glow Nox 侧数据补充（截图）

> 平行于 B2，与 Dreame 的对比方式相同（品牌监控截图），补充另外两个品牌的同口径数据量对比。

**Uwell**：
- [x] Nox 品牌监控「Uwell」Posts：**37**（YouTube 15 / IG 21 / TikTok 1，2026-02-26 ~ 2026-03-04）
- [x] Nox 品牌监控「Uwell」Creators：**21**（YouTube 12 / IG 8 / TikTok 1）
- 结论：Tarsight 虚增 **434×**（9,100 vs 21）；平台分布被严重扭曲（TikTok Tarsight 3,760 vs Nox 1）

**Glad2Glow**：
- [x] Nox 品牌监控「Glad2Glow」Posts：**6.4万**（TikTok 6.36万 / YT 52 / IG 307，2026-02-26 ~ 2026-03-04）
- [x] Nox 品牌监控「Glad2Glow」Creators：**1.73万**（TikTok 1.71万 / YT 33 / IG 237）
- 结论：Nox Creators 领先 **79×**（17,300 vs 219），Posts 基本持平（64K vs 58K）

**近 2 年口径补充（B3 线续集）**：

- [x] Nox 品牌监控「Uwell」近 2 年（20240310-20260309）→ 相关网红 **1,180**（YT 271 / IG 794 / TK 115）；提及视频 **7,953**
- [x] Nox 品牌监控「Glad2Glow」近 2 年（20240310-20260309）→ 相关网红 **28.28万（282,800）**（TK 27.44万 / IG 7441 / YT 824）；Nox 领先 Tarsight **1,292×**

> 说明：Tarsight Creator 搜索是全量静态索引（无时间限制），Nox 的 7 天口径无法直接对比；近 2 年口径更接近「有过真实内容行为的全量网红」，对比更有说服力。

已更新：`调研报告_v1.md` 含完整 Nox 近 2 年数据（未再升 v2 版本号）。

---

## Iter 7 · 总结层文档生成

**状态**：[x] 已完成（2026-03-09）

- [x] `调研报告_综合版.md` — 整合所有发现的完整版报告（含三品牌 B2/B3 数据），可独立分发
- [x] `调研速览.md` — 5 分钟速读版（3 大结论 + 核心数字 + 立即行动建议）
- [x] README.md 阶段状态更新为 Phase 6 完成

**说明**：`调研报告_v1.md` 为中间稿，已被 `调研报告_综合版.md` 完全取代；Iter 4 计划中「升版为 `调研报告_v2.md`」实际执行时改以综合版命名。

---

## Iter 5 · Uwell 验证案例

**状态**：[x] 完成（2026-03-09）

- [x] TU1/TU4：Uwell Creator List（9.1K，前 10 条 Badcase 分析，90% Badcase）
- [x] TU2：Creator Insight（Other% 95.67%，Tech & Auto 仅 20 条）
- [x] TU3：Post List（98 条，同名概念混淆 "UWELL wellness"）
- [x] `01_raw_data/uwell_raw.md` 创建
- [x] `05_insights/竞品洞察.md` 追加「Uwell 验证案例」章节

**验证结论**：研究假设成立。Tarsight 搜索质量问题与子串类型无关，是系统性底层缺陷。

---

## Iter 6 · Glad2Glow 验证案例

**状态**：[x] 完成（2026-03-09）

- [x] TG1/TG2：Creator List（219 账号，前 10 全部 ✅，0% Badcase）
- [x] TG3：Creator Insight（Other% 68.55%，Beauty & Personal Care 20.16%）
- [x] TG4：Posts Analytics（58K 条，TikTok 占 97.6%，前 10 全部 ✅）
- [x] `01_raw_data/glad2glow_raw.md` 创建
- [x] `05_insights/竞品洞察.md` 追加「Glad2Glow 验证案例」章节

**验证结论**：揭示第三种失效模式——召回崩溃（58K Posts vs 219 Creator 账号名匹配）。三案例共同完成 Tarsight Creator 搜索失效模式图谱。
