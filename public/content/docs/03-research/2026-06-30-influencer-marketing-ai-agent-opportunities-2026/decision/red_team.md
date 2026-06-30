# Red Team Review

## Strongest Recommendation Under Attack

最强建议是优先做：
1. Campaign Brief -> Creator Shortlist Agent
2. Creator Quality & Risk Copilot
3. Commerce ROI Attribution Hub

## Failure Modes

| Failure mode | Why it could happen | Evidence gap | Mitigation |
| --- | --- | --- | --- |
| 用户不相信 AI 推荐 | shortlist 只是给分和排序，像另一个黑盒榜单 | 缺少真实用户对推荐解释的信任测试 | 每个推荐必须展示搜索策略、触发证据、风险证据、排除原因，并允许用户修改 brief/权重后重算 |
| ROI Hub 变成半残 dashboard | Shopify/TikTok/Amazon/Meta 的数据权限、区域差异、API 稳定性可能导致归因链路无法闭环 | 尚未验证 Nox 目标客户最常用平台的数据接入可行性 | 先做“可接数据源清单 + 弱归因声明”，MVP 不承诺全平台精准归因 |
| Agent 自动化制造品牌风险 | 自动发邮件、自动承诺报价、自动确认付款、自动修改 affiliate terms 都可能造成事故 | 缺少对外部动作的权限/审批设计 | P0 只做 human-approved copilot；外部动作必须有审批、审计日志、撤销/暂停机制 |
| 竞品很快复制 AI shortlist | CreatorIQ/Upfluence/GRIN 都已有 AI 叙事，功能层面容易被复制 | 差异化是否足够依赖 Nox 数据与工作流尚未验证 | 差异化放在跨平台数据、搜索/CRM/监控/支付链路、争议风险和跨境品牌语境 |
| 治理能力卡在 SMB 与企业之间 | 小客户嫌重，大客户嫌浅 | 缺少分层 packaging 验证 | SMB 打包为避坑 checklist；企业打包为 policy templates、approval workflow、audit trail、team permissions |

## Bias and Validity Checks

- Sample bias: Reddit 证据偏抱怨和早期用户，不代表所有大客户。
- Outdated source risk: 平台 API、TikTok Shop/Shopify/Amazon creator commerce 能力变化快，需要每次进入 spec 前刷新。
- Competitor blind spots: 官网与 press release 可能夸大 AI/ROI 能力，需后续用真实 demo/G2/客户案例补证。
- Market sizing risk: 行业报告有推动市场乐观叙事的激励，不能独立支撑投入。
- Willingness-to-pay risk: “痛”不等于“愿意为 Nox 新模块付费”。
- Distribution risk: 如果用户习惯留在 Shopify/TikTok/Amazon 原生后台，Nox 必须证明跨平台层价值。
- Implementation risk: 评分和归因若不可解释，会被用户当作噪音。

## What Would Change the Recommendation

提高信心：
- 现有 Nox 用户明确愿意为“brief 到 shortlist”节省时间付费。
- 用户在真实任务中保留/邀约 AI shortlist 的比例显著高于普通搜索。
- 至少一个 commerce 数据源能稳定接入并生成可复盘 ROI 报告。

降低信心：
- 用户更愿意直接使用 Shopify/TikTok/Amazon 平台内工具，不需要跨平台层。
- 推荐结果解释成本高，反而拖慢决策。
- 平台 API/授权限制使核心数据长期不可得。
