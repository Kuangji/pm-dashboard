# 交付验证记录

2026-11-13（Asia/Shanghai）。本次是文档与竞研，没有代码实现或运行时产品验收。

## 已验证

- 研究与项目入口的210个本地Markdown链接解析通过；证据索引锚点均存在。
- 52张合并证据卡ID唯一、JSON有效、关键字段齐全；48个独立来源URL。
- 10家厂商品牌、11个产品/分析单元；11份文档流程、11份六维拆解。Meltwater Explore/Explore+合并列示，Sprinklr Product Insights为旁证，不按SKU计数。
- 官方网页由分支或主研究者直接打开；未登录实测，未实际调用付费API。
- 已做一轮定向缺口/反证检索，访问失败、旧资料和跨模块限制保留在原始档。
- 独立只读反方审阅没有发现阻断交付的越界，建议的计数口径已修正。
- 未改动其他既有品牌舆情需求、前端、服务端或现网状态；主入口只追加本项目并回链原有事项。

## 证据评分工具的限制

运行PM Deep Research的score_evidence.py：52卡均被机械分为strong，H1/H2/H3/H4分别关联18/29/13/30张卡。**不采用此结果作为能力已验证或独立交叉印证结论。** 工具对同假设多卡加分，不能识别同厂商依赖与营销偏差；观察日也不等于新功能发布日期。实际采用卡片人工confidence及限制：产品营销页中置信、旧功能中置信、单条历史用户评论低置信。访问当日可读不代表当日产品实测。

## 尚未验证

真实品牌树配置、跨品牌去重、部分授权下汇总、关系变更历史、当前租户套餐与全部按钮状态；聚星代码/接口/现网能力。正式产品版本号待核定，未生成正式Input/Spec/Design/PRD。

## 本地文档中心同步

按nox-publish-sync同步到`publish/documents/03-research/2026-11-13-brand-monitor-hierarchy/`和`publish/documents/02-project-documents/brand_monitor_portfolio/`；新增文档中心入口并修正跨项目链接。源与发布目录文件清单及内容一致性通过（仅链接路径转换）；两侧共420个本地Markdown链接通过，主线Inbox和CONTENT-TREE标记完整。未执行publish/sync.sh，未同步到pm-dashboard。工作区已有其他未提交变更，本轮未提交Git。
