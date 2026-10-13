# v7.6.3 Demo 验收文档

> 功能：内容监控 / 自动追踪 QoL
> 版本：v7.6.3
> 验收日期：2026-09-22
> 验收类型：真实页面本地 Demo 交互验收

## 验收结论

**Static Showcase：PASS**

Demo 直接运行在 kol-next 的真实内容监控项目页，验证了自动追踪 Drawer、表单、规则列表和状态操作。该结论只覆盖本地页面结构、交互和模拟数据，不代表生产接口、权限、配额、计费或异步任务已上线可用。

## 目标环境

- 页面：`http://127.0.0.1:3322/video-monitor/monitor?projects=18296&tab=overview`
- 入口：项目详情页 → 添加监控 → 自动追踪新内容
- Demo 代码分支：[codex/monitor-763-auto-track-demo-v2](https://codeup.aliyun.com/600e8289640593207be3201e/Influencer/Client/kol-next/-/tree/codex/monitor-763-auto-track-demo-v2)
- Demo 数据边界：`demoMode=true`，保存和状态操作只作用于当前页面，不写入服务端。

## 本轮验收项

| 验收项 | 结果 | 证据 / 说明 |
| --- | --- | --- |
| 抽屉宽度 | PASS | `addAndAutoTrack/index.vue` 使用 1200px；Playwright 实测 Drawer 1200px、右侧规则区 800px、表格可用宽度 752px，未出现本轮横向溢出 |
| 列表操作入口 | PASS | 行悬停后保留编辑、暂停/恢复、删除；列表中不再展示“另存”按钮 |
| 编辑态保存动作 | PASS | 编辑规则后，表单底部并列展示“保存并更新”和“另存为新规则” |
| 编辑态回到新建 | PASS | 编辑表单顶部提供“新建规则”；无修改直接清空，有修改先确认 |
| 编辑规则切换保护 | PASS | 规则 A 有未保存修改时点击规则 B，先出现放弃修改确认，取消后保留 A |
| 窄视口抽屉 | PASS | 900px 视口下 Drawer 收缩至 900px，独立关闭按钮仍位于可视区域 |
| 另存生效确认 | PASS | 另存生成“原规则名 - 副本”，保存后出现“立即生效 / 暂不生效”；取消后列表显示“未生效” |
| 编辑配置自洽 | PASS | 编辑态生效期、历史补扫开关和时长只读；调整配置回到新建规则流程 |
| 批量导入入口 | PASS | 收藏夹和其他规则入口整合进“批量添加”，不再占用横向来源 Tab |
| 收藏夹导入 | PASS | 可打开选择器、按文件夹/平台/搜索筛选、部分选择并回填频道，不自动保存规则 |
| 其他规则导入 | PASS | 当前项目规则可多选，只复制频道并自动去重，不跨项目 |
| 生效期 | PASS | 7 天、30 天、长期可选；长期说明收进选项后的 info icon hover Tips，提示连续 7 天有效追踪时间无新增命中时自动终止 |
| 历史补扫 | PASS | 开关关闭时不展示时长；开启后可选 3/7/30 天，模拟规则展示历史来源和异常状态 |
| 多来源展示 | PASS | 内容来源标识保留“自动追踪 · N 个规则”，规则列表通过 hover Tips 承载命中规则信息 |
| 关键词上限 | PASS | 输入提示和校验统一为最多 10 个关键词 |

## 页面证据

- [编辑态最终截图](./assets/monitor-763-drawer-1200-edit-final.png)
- [900px 窄视口关闭按钮截图](./assets/monitor-763-narrow-close-button.png)
- Playwright 复核结果：Drawer `1200px`，右侧区域 `800px`，表格 `752px`；悬停状态可找到暂停/恢复；编辑态可找到“另存为新规则”。
- 最新文案调整：三种生效期共用同一套表单底部提示；长期规则的连续 7 天无新增命中定义移至“长期”选项后的系统 info icon hover Tips。

## 代码落点

- [自动追踪 Drawer](https://codeup.aliyun.com/600e8289640593207be3201e/Influencer/Client/kol-next/-/blob/codex/monitor-763-auto-track-demo-v2/components/videoMonitor/monitor/addAndAutoTrack/index.vue)：1200px 宽度、真实左右布局和 Demo 注入。
- [自动追踪表单](https://codeup.aliyun.com/600e8289640593207be3201e/Influencer/Client/kol-next/-/blob/codex/monitor-763-auto-track-demo-v2/components/videoMonitor/monitor/addAndAutoTrack/autoTrackForm.vue)：来源选择、生效期、历史补扫、编辑态另存按钮和保存逻辑。
- [自动追踪文案](https://codeup.aliyun.com/600e8289640593207be3201e/Influencer/Client/kol-next-i18n/-/blob/codex/monitor-763-auto-track-demo-i18n/language/zh.json)：三种生效期共用的底部提示和长期规则 info icon Tooltip 文案。
- [自动追踪规则列表](https://codeup.aliyun.com/600e8289640593207be3201e/Influencer/Client/kol-next/-/blob/codex/monitor-763-auto-track-demo-v2/components/videoMonitor/monitor/addAndAutoTrack/autoTrackList.vue)：悬停操作组、暂停/恢复状态和 Demo 规则数据。
- [内容来源展示](https://codeup.aliyun.com/600e8289640593207be3201e/Influencer/Client/kol-next/-/blob/codex/monitor-763-auto-track-demo-v2/components/videoMonitor/monitorDetail/MonitorContentMonitor.vue)：多规则来源 Tips。

## 自动化校验

通过：

```bash
npx eslint components/videoMonitor/monitor/addAndAutoTrack/autoTrackForm.vue \
  components/videoMonitor/monitor/addAndAutoTrack/autoTrackList.vue \
  components/videoMonitor/monitor/addAndAutoTrack/index.vue
git diff --check
npx jest tests/unit/videoMonitor/addAndAutoTrack.autoTrackList.spec.js \
  tests/unit/videoMonitor/autoTrackKeywordLimit.spec.js --runInBand
```

结果：2 个测试套件、16 个测试通过。

## 研发实现 Checklist

以下清单用于研发实现、联调和提测时逐项勾选。每个已完成项应补充对应的接口、迁移、测试或日志证据；涉及长期规则的服务端状态和计费行为，以服务端技术方案和实际联调结果为准。

### 1. 规则数据与兼容

- [ ] 生效期模型支持 `7d`、`30d`、`permanent` 三种值；长期规则不依赖自然到期时间终止。
- [ ] 长期规则持久化最后一次有效新增命中时间（如 `lastMatchedAt`），并能区分从未命中和曾经命中。
- [ ] 持久化终止原因，至少区分 `no_hit_7d`、自然到期、暂停、配额或权限异常等状态。
- [ ] 保留已有规则、频道、关键词、来源和内容关系；同一内容由多个规则命中时支持多来源关系。
- [ ] 明确旧规则数据迁移策略，避免把历史 7 天规则误判为长期规则或反向改变其到期时间。

### 2. 命中与“连续 7 天无新增”判定

- [ ] 只有未来追踪中“新增且成功关联到该规则”的内容，才能更新该规则的最后命中时间。
- [ ] 历史补扫命中、已有监控内容去重命中和重复重试结果不得重复刷新最后命中时间。
- [ ] 连续 7 天按规则的有效追踪时间计算；暂停期间、采集失败或数据不完整期间不计入无命中观察期。
- [ ] 规则从未产生有效新增命中时，按生效/恢复时间开始计算无命中观察期。
- [ ] 任务调度、重试、跨天和边界时间均幂等；同一规则不会因重复调度重复终止或重复记账。

### 3. 状态机与暂停/恢复

- [ ] 长期规则支持“运行中 → 连续 7 天无新增命中终止”，并返回稳定的 `status` 与 `terminationReason`。
- [ ] 无命中终止保留规则配置、频道、关键词、来源和已采集内容，仅停止后续追踪并释放运行中的资源/计费状态。
- [ ] 暂停冻结有效追踪时间和无命中观察期；暂停期间不计费。
- [ ] 恢复重新计算到期时间，并从恢复时刻重新开始未来追踪和无命中观察期。
- [ ] 无命中终止后的恢复/重新启用需重新校验权限、配额和频道可用性，不自动重复触发历史补扫。
- [ ] 规则列表、详情和操作接口能区分运行中、暂停、已到期、无命中终止及异常状态。

### 4. 计费、配额与去重

- [ ] 7 天、30 天和长期规则继续沿用现有 7 天计费方式；本版本不新增高于 7 天的价格档位。
- [ ] 长期规则因连续 7 天无新增命中终止后停止后续计费，并释放对应运行资源。
- [ ] 暂停/恢复的计费账本边界明确且可重试，避免重复扣费或恢复后继续沿用暂停前到期时间。
- [ ] 多规则、多来源和历史/未来混合命中按内容去重，不重复追加监控内容或重复消耗独立配额。

### 5. 接口与前端展示

- [ ] 列表和详情接口返回生效期类型、当前状态、终止原因，以及最后命中时间或可计算的剩余观察信息。
- [ ] 前端对长期规则展示“已终止 · 连续 7 天无新增命中”等可理解文案，并与暂停、到期、权限/配额异常区分。
- [ ] 编辑已有规则时，生效期和历史追踪设置按 Spec 锁定；编辑保存不会触发或取消历史补扫。
- [ ] 新建和另存为新规则的保存动作按约定询问是否立即生效；历史补扫作为即时异步任务处理，不新增独立任务产品。
- [ ] 收藏夹导入和其他规则复制只负责选择频道，不携带关键词、短链或规则配置，且其他规则复制不得跨项目。
- [ ] 接口和前端对旧字段保持兼容，异常状态可在规则列表/详情中被发现并重试或恢复。

### 6. 测试与验收场景

- [ ] 长期规则连续 7×24 小时没有有效新增命中后自动终止，状态和 `terminationReason=no_hit_7d` 正确。
- [ ] 第 6 天产生有效新增命中后观察期重置，规则不会在第 7 天终止。
- [ ] 重复内容、历史补扫命中和多规则命中不会刷新无命中观察期或重复追加监控内容。
- [ ] 暂停 3 天后恢复，暂停时间不计入观察期和计费；恢复后按新的起点重新计算。
- [ ] 采集失败、任务延迟或数据不完整时不误判为连续 7 天无命中，并能按既有规则重试。
- [ ] 无命中终止后恢复不会重复触发历史补扫，且能继续追踪恢复后的未来内容。
- [ ] 多来源关联、权限失效、配额不足、规则删除和重复请求均有接口级幂等/异常测试。
- [ ] 完成后端单测、任务/接口集成测试、迁移测试和前端验收；补充真实测试环境的接口响应、任务日志和账单证据。

### 7. 提测前证据

- [ ] 提供服务端状态机、定时任务、计费边界和数据迁移的技术方案链接及负责人。
- [ ] 提供至少一条长期规则从创建、命中/无命中观察、暂停/恢复到终止或恢复的完整测试链路。
- [ ] 提供异常重试、幂等、回滚和旧数据兼容结果；未完成项在提测单中标记风险和后续版本。

## 仍保持 HOLD 的生产验收项

- 真实后端的另存原子 clone、状态迁移和失败回滚；
- 暂停计费、恢复重算和席位/账本事务；
- 历史补扫真实任务、重试、部分失败和内容去重；
- 收藏夹/其他规则真实权限、跨平台数据和跨项目拦截；
- 多来源关系的真实接口字段、来源筛选和生产内容覆盖；
- 长期规则的 `lastMatchedAt`、有效追踪时间、采集完整性和 `terminationReason=no_hit_7d` 服务端实现；当前服务端仍是固定 `monitor_duration` 周期逻辑；
- 生产环境的多视口、账号权限和线上数据验收。
