# Red Team Review

## Strongest Recommendation Under Attack

推荐方案是“视频情报工作台 v0 + 候选名单质量 Gate + 弱 ROI/复投”。最强反对意见是：这会把内容监控、创意库、ROI、风险分析全都塞进一个产品，最后每个都做浅。

## Failure Modes

| Failure mode | Why it could happen | Evidence gap | Mitigation |
| --- | --- | --- | --- |
| ROI 讲成精准归因 | 没有订单/折扣码/短链时仍想输出漂亮数字 | 真实订单接入能力未知 | 分层展示确认交易、可归因线索、辅助表现；无交易不输出 GMV |
| AI 分析幻觉 | LLM 把相关性说成因果 | 缺少标注样本 | 输出事实、可能解释、待验证三层 |
| 风险评分误伤 | 黑盒标签影响创作者判断 | 缺少人工校准 | 不做封杀式结论，做证据链和人工复核 |
| 爆款预警噪音 | 阈值粗糙、通知过多 | 自动追踪命中质量未知 | 绑定项目/关键词/频道，支持反馈和阈值调节 |
| 路线过宽 | 每个 topic 都想进 v0 | MVP 范围未锁 | v0 只回答最近发生什么、该处理什么、数据是否可信 |
| AI 视频生成分散主线 | 追热点但不形成 Nox 壁垒 | 用户是否愿为生成买单未知 | 先做 brief/脚本和第三方输入，不自研完整生成 |

## Bias and Validity Checks

- Sample bias: 目前外部来源偏官方页面，需补一线客户访谈。
- Outdated source risk: 平台能力变化快，正式 PRD 前需复查官方文档。
- Competitor blind spots: 还需补 GRIN、Upfluence、Dash Hudson、Brandwatch 的价格与实际用户评价。
- Market sizing risk: 本轮不是市场规模测算，不应用于收入预测。
- Willingness-to-pay risk: 需用原型和报价测试验证。
- Distribution risk: 如果入口藏在内容监控深处，可能无法形成新认知。
- Implementation risk: 评论数据、短链、订单导入、自动追踪命中质量都需技术 spike。

## What Would Change the Recommendation

- 如果自动追踪命中质量很差，爆款动态发现应降级为手动监控增强。
- 如果用户不愿配置短链/成本/折扣码，ROI 中心应降级为内容表现复盘。
- 如果频道风险标签无法解释或误伤严重，应先做人工复核清单，不做自动 Gate。
