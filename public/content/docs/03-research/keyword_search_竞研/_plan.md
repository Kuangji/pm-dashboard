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

**状态**：[ ] 进行中

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

**状态**：[-] 进行中

- [ ] `02_ux_flows/tarsight_flow.md` — 交互流程映射（待补充）
- [ ] `03_teardown/tarsight_teardown.md` — 6 维度拆解（待补充）
- [x] `04_matrix/feature_comparison.md` — 对比矩阵（Nox 侧数据待补充）
- [x] `05_insights/竞品洞察.md` — 差距分析 + 改进建议（完成）

---

## Iter 4 · 待补充项

**状态**：[ ] 待处理

- [ ] NoxInfluencer 侧「Dreame」搜索数据（同口径：近 7 天 Posts + Creators 总量）
- [ ] 完善 `tarsight_flow.md` 交互流程映射
- [ ] 完善 `tarsight_teardown.md` 6 维度拆解
- [ ] 更新 README 进度状态
