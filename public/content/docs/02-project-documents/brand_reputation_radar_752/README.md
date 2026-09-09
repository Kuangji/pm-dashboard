# v7.5.2 - 品牌舆情雷达

> 正式版本工作区：`01_Product_Specs/brand_reputation_radar_752/`
>
> 代码实现分支：`kol-next` 仓库的 `codex/752-brand-reputation-radar`

## 当前状态

本版本已经进入正式产品工作区。当前推进最远的事实是 `kol-next` 中的品牌舆情雷达 Demo：它已经具备真实页面路由、旧 VOC 组件复用、品牌上下文入口、Mock 数据层、内容/评论采样边界、Stage B 页面分组和验收脚本。

因此，本版本不能把 Demo 当作“尚未开始”或单纯探索原型，也不能把 Demo 通过误写成生产就绪。Demo 是当前实现事实，生产接口、身份映射、正式算法、权限、采集和计费仍需另行定义与验证。

当前正式文档状态：

- [Spec v1](spec_v1.md)：已编制评审稿，结合 Input、当前 Demo、旧 VOC 和服务端事实展开业务逻辑；待产品审阅，差异与生产未决项显式保留。
- [Design v1](design_v1.md)：已编制页面结构、控件状态、证据/样本语义和异常分支；与Demo的同步及验证见 [Design验证记录](reviews/design_v1_review.md)。

Input已归位，Demo先行实现，Spec与Design已形成相互引用的正式稿件。后续PRD尚未生成；生成时须承接Spec业务编号、Design D编号、旧能力去向及生产待决项，不能将文档存在视为所有生产决策已关闭。

## 文档导航

**设计与研发先读：[产品说明（简明版）](product_overview_v1.md)**。按产品用途、页面能力、操作规则和开发待定项组织；具体规则查Spec，交互细节查Design。评审记录用于追溯，不作为产品说明入口。

```text
01_Product_Specs/brand_reputation_radar_752/
├── README.md       <- 本页，版本状态与阅读入口
├── product_overview_v1.md <- 设计与研发的产品需求简明阅读版
├── input_v1.md     <- 正式上游 Input；由 handoff v1.7 复制并修正引用
├── spec_v1.md      <- 唯一 Spec 评审稿，业务规则与 PRD 承接合同
├── design_v1.md    <- 唯一交互设计，承接Spec并同步Demo
├── reviews/spec_v1_review.md <- Spec初稿审查快照
└── reviews/design_v1_review.md <- 本轮Demo同步、验证和剩余问题
```

## 唯一来源与历史参考

- 当前 Input：[`input_v1.md`](input_v1.md)，来自 handoff v1.7，作为后续维护的正式上游文件；Research 原 handoff 保留来源快照，不再并行演进产品定义。
- 当前 Spec：[`spec_v1.md`](spec_v1.md)，为本版本唯一业务规格评审稿；Input 约束不变，Spec 展开规则，代码记录实现。新业务选择须显式回写，不以实现瑕疵覆盖合同。
- 当前代码提交：`64b19fb349d3eb2e135f1989858a435839765bab`，已含 Demo 代码；研究目录旧记录的“未跟踪、HEAD 不含 Demo”仅属于当时接管状态。
- 当前Design：[design_v1.md](design_v1.md)；Demo版本为上述HEAD加本轮未提交修改，不能仅检出HEAD重建本轮同步状态。本轮不提交、不推送；具体文件和验证见Design记录。
- 主 VDR 索引与实现回流由工作区维护；本发布目录提供版本正式文档。
- Research 目录中的旧共同上下文、早期 Input、旧计划和 takeover prompt 已移入 `legacy/`，只用于追溯，不覆盖本版本 Input。
- 旧静态探索 Demo 仍属于历史参考；当前实现事实以 `kol-next` 的 `codex/752-brand-reputation-radar` 分支为准。

## 版本边界

- 页面为独立 Brand 舆情雷达，当前 Demo 使用 SHEIN/17135 Mock fixture。
- Overview 保留高级筛选；Realtime 保持只读旧 VOC 看板交互，不挂载高级筛选。
- 内容按已采集内容集合统计；评论统一按头部内容评论采样表达。
- 不因本版本文档归位自动引入真实 API、主动采集、扣费、通知、导出或移动端改造。
