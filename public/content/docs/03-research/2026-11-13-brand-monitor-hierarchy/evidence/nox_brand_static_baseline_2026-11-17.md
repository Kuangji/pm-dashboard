# 聚星品牌监控：本轮服务端静态核对边界

2026-11-17（Asia/Shanghai）。为候选比较补充现有数据聚合线索，不是功能验收、线上口径确认或实现设计。仅只读检索；没有执行服务、API、数据库或线上浏览器操作，没有修改代码。

## 仓库快照

| 仓库 | 分支 / HEAD | 状态 |
|---|---|---|
| kol_server_v2 | master / 234e9dad738f088550c2d75ef96d457a9b315547 | 核对时工作树干净 |
| KOLServer | master / 706dc8ea0ed51f8a5752a9e2f497427f95432faa | 核对时工作树干净 |

已核对两库实际本地说明入口：未检出AGENTS/CODEX/CLAUDE；新库无根README，读取根与相关模块pom；旧库读取README及构建文件。没有只凭新旧库名推断线上归属。

## 可复核的15处证据

路径相对pm-workspace；行号对应以上HEAD。发布侧保留仓库/提交/路径信息，不将机器绝对路径当网页链接。

| 仓库文件及行 | 静态事实 | 不能推导 |
|---|---|---|
| KOLServer/Common/src/main/java/com/nox/kol/entity/brandMonitor/BrandMonitorSearchVo.java:21 | 有单pkId，兼容旧brandId/type/source | 品牌层级只允许一个成员 |
| 同文件:292 | 有pkIds列表字段 | 所有API已支持跨品牌合并 |
| KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/brandMonitor/BrandMonitorV2Service.java:807 | 汇总缓存并调用selectAllSumInfo | 当前线上缓存周期已核实 |
| KOLServer/ServiceInternal/src/main/resources/com/nox/click/mapper/brand/BrandVideoRelation.xml:104 | selectAllSumInfo按单pkId过滤 | 可直接将单品牌结果当家族总体 |
| 同文件:148 | 按video_id、platform归并 | 已有跨品牌交集返回合同 |
| 同文件:165 | 频道去重、总量、比率与平台ROLLUP | 跨平台同人已经合并 |
| 同文件:68 | selectVideoSumInfo支持批量，最终保留platform、pk_id分组 | 多品牌批量返回就是去重总体 |
| KOLServer/ServiceInternal/src/main/java/com/nox/kol/service/brandMonitor/BrandMonitorV2Service.java:1025 | 互动接口委托provider适配层 | 品牌统计全部归属旧库 |
| KOLServer/ServiceInternal/src/main/java/com/nox/kol/stub/search/provider/BrandInteractiveProviderClient.java:11 | Feign客户端连接provider | 当前部署版本与分支一致 |
| kol_server_v2/data.api/src/main/java/com/nox/kol/data/api/brand/dto/BrandMonitorSearchQuery.java:19 | 新查询优先pkId，兼容旧标识 | 候选产品关系已能直接复用 |
| 同文件:57 | 平台字段及平台值 | 品牌跨平台映射与身份质量已核实 |
| kol_server_v2/data.provider/src/main/java/com/nox/kol/data/provider/modules/brand/service/support/BrandVideoQuerySupport.java:71 | nested brand_infos中按pkId过滤 | 品牌多归属如何在端到端处理已验证 |
| 同文件:167 | sum、avg、percentile分别计算 | 所有指标均可求和或求平均 |
| KOLServer/Entity/src/main/java/com/nox/kol/entity/brand/BrandMonitorV2.java:28 | parentUid描述添加人主账号 | 此字段表达父品牌 |
| KOLServer/ServiceInternal/src/main/resources/com/nox/kol/mapper/BrandTagMapper.xml:27 | parent_id属于brand_tag | 标签层级就是品牌实体层级 |

主研究者另直接读取了请求字段、BrandVideoRelation汇总SQL与BrandVideoQuerySupport聚合代码进行交叉确认。上述品牌查询与监控实体有限检索中未定位到明确父子品牌关系字段；不能据此宣称全系统不支持主子品牌。

## 对本轮候选比较的作用

- 不写“现状只有单品牌入参”或“品牌全部在旧库”。
- 多品牌批量结果仍可能逐品牌分组，不能用品牌汇总数相加还原交集。
- 即使采用轻量关联包，家族集合、交集与不同指标的聚合仍需实际服务端核验。
- 本轮无法判断真实数据重叠规模、查询成本、缓存同步、覆盖、跨平台同人及关系历史；不给工期、性能或可复用承诺。

本文件支持[候选讨论稿](../decision/主子品牌关系与计算展示_候选形式比较_v1.md)，不替代生产数据合同。
