# 内容监控二期（v7.6.1）需求工作区

> 状态：`design_v1_done/prd_ready`  
> 说明：`input_v1.md` 已由 pre-input 讨论、线上事实、代码事实和用户反馈池收口生成；`spec_v1.md` 已完成业务规格拆解；`design_v1.md` 已按 A+D 基准方案收口。  
> 用途：继续推进 `prd`，同时保留 pre-input / spec / design 过程材料以便追溯。

## 当前阶段

761 已完成 input 收口、spec 拆解和 design v1 收口，核心取舍包括：

- 数据观察时间区间进入 Must，作为 dashboard、变化榜、项目列表速览的核心统计口径。
- 达人/频道贡献分析进入 Must，但限定为项目内、所选观察区间内的聚合。
- 页面结构明确为三个主要实体页面：项目列表、单项目工作台、多项目工作台。
- 原总监控列表降级为多项目工作台，作为单项目工作台的独立页面变体，并保留默认全部项目入口。
- 评论、短链、预算只做状态解释和可信度解释，不做能力扩展。
- Design 阶段以项目列表 + A 单项目工作台型 + D 多项目工作台型为基准；D 是 A 的多项目变体，B/C 归档。

## 文档导航

```
01_Product_Specs/monitor_761/
├── README.md               ← 本文档
├── evidence_brief.md       ← 已掌握事实与证据边界
├── current_state_facts_v0.md ← 综合 kol_brain + kol-next 的当前功能现状
├── pre_input_v0.md         ← 输入前讨论底稿，不是正式 input
├── pre_input_decisions_v0.md ← 2026-05-07 讨论后的 pre-input 决策记录
├── dashboard_metric_planning_v0.md ← dashboard 与项目列表速览指标规划
├── feedback_analysis_v0.md ← 用户反馈池逐条核验与 761 影响分析
├── feedback_screenshots/  ← Excel 内反馈截图抽取结果
├── input_v1_draft.md       ← input 过程稿
├── input_v1.md             ← 正式 input，后续 spec 的上游
├── spec_v1.md              ← 业务规格，后续 design 的上游
├── design_options_v0.md    ← design 阶段布局方案对比与 Demo 索引
├── design_v1.md            ← design 正式收口，A+D 基准方案
└── discussion_questions.md ← 后续与 PM 讨论的问题清单
```

## 与 M08 的关系

- `M08_效果监控`：记录到 760 / 7601 为止的线上事实。
- `monitor_761`：记录 761 的讨论过程和候选方向。
- `input_v1.md` 是当前 761 后续 `spec -> design -> prd` 的正式 input 上游。
- `spec_v1.md` 是当前 761 后续 `design -> prd` 的业务规格上游。
- `design_v1.md` 是当前 761 后续 `prd` 的正式设计上游。

## 当前使用方式

1. 以 `input_v1.md` 作为 761 后续 spec/design/prd 的唯一 input 上游。
2. 用 `feedback_analysis_v0.md` 追溯用户反馈分流，不直接以 Excel 原始状态作为排期依据。
3. 用 `current_state_facts_v0.md` 和 M08 知识库输入追溯当前线上事实。
4. 以 `spec_v1.md` 作为 design 阶段的业务规格上游。
5. 用 `design_options_v0.md` 和 [Demo 首页](../../../demos/monitor_761_layout_demos/index.html) 对比布局方向。
6. 以 `design_v1.md` 作为 PRD 阶段的设计上游。
