# Decision Memo

## Recommendation

Q3 建议把当前 7 个 topic 收敛为：

1. **P0：视频情报工作台 v0**  
   基于现有内容监控和自动追踪，做 AI 分析、爆款动态发现、内容变化榜、数据可信度提示和复投候选。

2. **P0/P1：频道风险和质量 Gate**  
   接到搜索/智能精选/6311 候选名单/频道详情，服务“是否加入待邀约池”和“是否需要人工复核”。

3. **P1：弱 ROI 复盘 + 素材复投**  
   用短链、折扣码、成本输入、订单导入和内容表现做可解释复盘，不承诺全平台精准归因。

4. **P2：AI 产品演示视频生成**  
   暂不自研完整生成能力，先做素材 brief、脚本变体和第三方工具输入。

## Decision Context

- Decision question: 频道风险、视频监控 AI 分析、ROI 归因、素材复投、创意库/榜单、爆款动态发现、AI 视频生成，哪些应进入 Q3 主线？
- Time horizon: 2026 Q3-Q4。
- Scope: NoxInfluencer 产品机会、MVP 方向、竞品与平台成熟度。
- Main constraints: 不承诺精准归因；不做黑盒风控；优先复用内容监控、自动追踪、短链、智能营销计划和 CRM。

## Options Considered

| Option | Summary | Upside | Downside | Evidence strength | Reversibility |
| --- | --- | --- | --- | --- | --- |
| A | 7 个 topic 分别立项 | 覆盖完整 | 路线碎片化，研发和用户心智分散 | Medium | Low |
| B | 只做频道风险质量 | 与 6311 衔接强 | 缺少发布后监控和复盘闭环 | High | Medium |
| C | 只做 ROI 归因中心 | 商业价值强 | 数据依赖重，容易假精确 | Medium | Medium |
| D | 做视频情报工作台，并嵌入风险/复投/弱 ROI | 复用现有内容监控，闭环最强 | 需要严格控范围 | High | High |
| E | 做 AI 产品演示视频生成 | 热点明显，外部工具成熟 | 与 Nox 主链路弱，竞争拥挤 | Medium | High |

## Evidence Summary

| Claim | Evidence IDs | Strength | Notes |
| --- | --- | --- | --- |
| Nox 已有内容监控、自动追踪、短链、评论洞察入口 | E-001,E-002 | High | 适合叠加视频情报而非另起产品 |
| 风险质量是成熟竞品卖点 | E-004,E-005,E-006 | High | 需做可解释 Gate |
| 创作者电商归因基础设施成熟 | E-007,E-008,E-009,E-010 | Medium-high | 适合弱归因，不能承诺全平台精准 ROI |
| 素材复投/Creative Analytics 成熟 | E-011,E-012,E-014 | High | Nox 差异化来自合作/监控/归因上下文 |
| AI 视频生成成熟但非主链路 | E-015,E-016 | Medium | 先做 brief 和第三方输入 |

## Key Risks and Counterarguments

- ROI 归因可能被误读为精确因果。
- AI 分析可能幻觉或过度解释。
- 风险标签可能对创作者产生黑盒负面判断。
- 爆款预警可能噪音过高。
- 视频情报工作台可能范围膨胀。

## Assumptions to Validate

| Assumption | Validation method | Owner | Deadline | Kill criteria |
| --- | --- | --- | --- | --- |
| 用户愿意在内容监控里使用视频情报摘要 | 原型访谈 | PM/设计 | Q3 input 前 | 用户仍只想看表格，不需要摘要/变化榜 |
| 候选名单质量 Gate 能提升信任 | 6311 候选名单样本评审 | PM/算法 | Q3 input 前 | 用户不理解标签，或认为风险判断不可采信 |
| 用户愿意配置短链/成本/折扣码换取复盘 | Concierge 测试 | PM/业务 | Q3 input 前 | 用户不愿补数据，ROI 报表无足够输入 |

## Next Experiments

1. 视频情报工作台 v0 原型。
2. 6311 候选名单质量 Gate 原型。
3. 弱 ROI + 复投报表 concierge 测试。

## Appendix

- Evidence database: `evidence/evidence_cards.jsonl`
- Competitor matrix: `competitors/matrix.csv`
- Research gaps: `synthesis/research_gaps.md`
