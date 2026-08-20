# 内容监控 AI 项目解读（v7.6.2）需求工作区

> 当前阶段：`input_v0_review`
> 版本定位：在内容监控数据看板中增加按需生成的、带证据回链的生成式 AI 项目解读。
> 当前决策：立项是硬性前提；首期采用方案 B「证据型 AI 项目解读报告」。

## 文档导航

```text
01_Product_Specs/monitor_762/
├── README.md                         <- 本页，阶段与阅读入口
├── _plan.md                          <- VDR 阶段、模块拆分与评审门
├── monitor_common_context_v1.md      <- 本版本 AI 术语、范围和契约底座
└── input_v0.md                       <- 当前评审主文档
```

## 阅读顺序

1. 先看 `input_v0.md` 的决策摘要、范围与评审问题。
2. 需要核对术语、scope、状态和证据契约时看 `monitor_common_context_v1.md`。
3. 需要了解后续如何拆模块、哪些问题必须在 Gate 关闭前解决时看 `_plan.md`。
4. 现有监控底座与线上响应证据见：
   - `/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/02_Research_Analysis/2026-08-17-content-monitor-ai-interpretation-feasibility/`
   - `/Users/yukuangji/Work/NoxInfluencer/pm-workspace/drafts/docs/superpowers/specs/2026-08-20-content-monitor-ai-interpretation-design.md`

## 阶段约束

- 本目录现在只承载 `input` 评审，不代表已经进入研发排期。
- 未完成 Input Gate 前，不生成 `spec`、`design` 或 `prd`。
- 评审意见应先回写 `input_v0.md`；只有影响阶段边界的意见才同步 `_plan.md`。
- 生产实现、接口联调和线上行为复现仍以 `../kol-next` 及真实浏览器校验为准。
