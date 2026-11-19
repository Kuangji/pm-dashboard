# 官方交互导览实走记录

日期：2026-11-17（Asia/Shanghai）。本轮先尝试内置Browser创建tab与读取状态，两次各约30秒超时，无法初始化浏览器控制；同一CUA入口也无法进行Chrome选择。随后通过备用Playwright MCP成功打开公共演示。请求隔离context返回Not allowed，改用新普通tab，不复用任何付费产品账户、不读取用户登录态。

**下文“实走”只指通过官方捕获式导览的预设步骤，未登录生产产品，未测试真实数据重算。** 页面中有控制台资源错误，但内容和预设导航正常；未据此判定产品缺陷。

## Emplifi Unified Analytics Overview

- [官方导览](https://capture.navattic.com/cmi556q9e000004kz6euo8dz0)，已通过Next从第1步走到第6步。
- 第1步：首页Saved views表，列包括名称、所属board、最后编辑、创建者、可见性；左侧有自建与共享boards。
- 第2–4步：搜索/AI入口、预设boards与平台/跨平台导航，数据源区分owned/public profiles及profile labels。
- 第5步：Content performance实际捕获画面，顶部来源、日期、聚合周期、Filter及Saved views；图表浮层有View associated content入口。
- 第6步：联系信息表单。没有填写、登记或申请个性化演示。
- **没有完成的动作**：创建profile label、切Total、点击到Content Hub结果、Save as view提交及重新回访。可见按钮不等于保存成功。

证据UIE201；已留存[首页](assets/emplifi-tour-01-saved-views.png)与[内容下钻入口](assets/emplifi-tour-05-content-drilldown.png)。

## Meltwater Adaptive Analytics

- [官方10步导览](https://meltwater.navattic.com/rh6u057m?g=cmvkrx4y5002n02l78d31fyyx&s=0)，关联资源页为2026-10-27；逐步推进到第10步结束。
- 第1–2步：搜索的Overview与问题型分析页签。
- 第3–5步：增加/移除分析页签；导览说明选择对个人可见并可持续使用，部分页签取决于合同与内容权限。
- 第6步：总览指标可进入完整分析。
- 第7–8步：内容、分析、两者并排的布局模式。
- 第9–10步：新旧tab set切换与导览结束。
- **没有完成的动作**：建立多个子品牌搜索、Combine/Compare计算、保存Analyze自定义报告、检验真实跨品牌去重。此tour是分析阅读布局的证据，不是品牌树演示。

证据UIM201；已留存[总览到分析](assets/meltwater-tour-06-overview-drill.png)与[布局选择](assets/meltwater-tour-08-layout.png)。没有点击“Next tour”扩大到其他产品范围。

## Meltwater官方公开共享报告：实际点开内容明细

[官方Playbook](https://community.meltwater.com/p/use-case-playbooks)给出Airline Competitive Comparison公开例子及访问密码。通过该入口打开[共享报告](https://app.meltwater.com/report/public/yR78hxiQteDEnqe8gfDKMrZB/snapshot)，仅使用官方公开说明，不保存跳转生成的token。

- 报告标记生成于2026-11-12，共同选定期间为2026-10-01至10-31、时区Europe/Berlin。页面按多个品牌横向组织组件。
- 实际点击首个内容模块的View all；Related Mentions弹层保留品牌模块标题与期间，先显示加载态，随后成功返回内容卡片。
- 此样例提示总共393项，只显示当前排序前25项，完整结果需进入Meltwater。这是本样例状态，不泛化成所有分享功能的统一上限。
- 没有编辑或保存报告；没有验证所有来源/分类/日期条件端到端一致，没有把报告外链当编辑端权限。

证据UIM202；[总览截图](assets/meltwater-public-report-overview.png)、[实际下钻结果](assets/meltwater-public-report-drilldown.png)。**样例来自口碑/竞品主题，仅取报告组织、共享阅读和内容下钻机制，不扩展本项目到舆情功能。**

浏览器存在翻译扩展，部分导览按钮/捕获内容显示中文；按钮原名以官方英文文档为准，不据此推断产品原生语言支持。

### 公开报告中的日期显示差异

实际截图里，侧层标题仍写10月1–31日，但首条Yahoo内容卡显示11月1日00:33。该差异可能涉及来源时区、收录/发布时间口径、快照或筛选传播，本轮没有核实原因。这里只确认标题范围仍可见、明细已加载，**不能宣布日期过滤结果一致通过**，也不据单个显示差异判断产品缺陷。
