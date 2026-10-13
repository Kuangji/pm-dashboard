# v7.6.3 Design v1 Review

> 被评审文件：design_v1.md
> 评审日期：2026-09-21
> 上游：spec_v1.md + monitor_common_context_v1.md
> 评审类型：Design Gate 前置 review

## 1. 结论

通过，允许进入 Demo 实施计划；暂不修改 kol-next 生产代码。

Design 已将产品语义映射到真实 kol-next 页面结构，并把 Demo 限定为真实路由、真实 Drawer、真实组件上的静态交互验证。生产权限、配额、计费、异步任务执行、真实多来源字段和接口返回仍保持 Production HOLD。

## 2. 评审检查

| 检查项 | 结论 | 依据 |
| --- | --- | --- |
| Spec 映射 | PASS | 收藏夹/其他规则仅回填频道；另存、暂停恢复、7/30/长期、3/7/30 历史补扫和关键词上限均已落到交互 |
| 真实页面结构 | PASS | 复用内容监控真实入口、AddAndAutoTrack Drawer、AutoTrackForm、AutoTrackList 和 MonitorSourceCascader |
| 代码落点 | PASS | 每个主要设计区域均有 kol-next 文件路径；未把旁路 Demo 页面当作目标 |
| 设计规范 | PASS | 已引用 README、tokens、semantic tokens、form、select、table、checkbox、tabs、tooltip、toast、modal、Element UI alignment、accessibility |
| 收藏夹交互 | PASS | 复用 simpleResourceList 的收藏夹、平台筛选、分页、行选/全选/半选和添加语义；明确替换提交回调 |
| 跨平台约束 | PASS | 记录现有组件按平台读取且切换会清空选择，设计要求保留跨平台集合，必要时复制交互并适配 |
| 历史补扫 | PASS | 对用户透明；不增加独立任务页、进度区或历史列，统一任务只增加异常状态和既有重试入口 |
| 多来源展示 | PASS | 内容标识使用“自动追踪 · N 个规则”，通过 hover/focus Tips 展示命中规则列表和未来/历史命中模式，不新增详情展开 |
| Demo 边界 | PASS | 明确直接改真实页面、使用脱敏/模拟数据、不写生产接口，Static Showcase 与 Production HOLD 分离 |
| 线上验证 | GAP 已记录 | Browser 当前返回 unsupported Codex auth method: apikey，Design 未将代码检查冒充线上实测 |

## 3. 评审发现与已处理项

1. simpleResourceList 当前以 groupId + platform 读取，且切换平台会清空已选集合；Design 已将其列为必须适配的实现约束，并要求优先复用交互、必要时复制为自动追踪专用组件。
2. autoTrackForm 当前只有手动/批量上传；Design 已把收藏夹和其他规则放在同一来源切换位置，并沿用同一 form.kolList。
3. MonitorSourceCascader 已支持规则来源多选和半选；Design 要求直接复用，避免新增第二套来源筛选。
4. 多来源字段、历史命中关系和异常状态的真实接口契约尚未由代码证明；Design 已要求 Demo 使用脱敏 fixture，并将接口确认保留为研发风险。
5. 浏览器登录态未完成；Design 已显式记录真实环境校验清单和阻断原因。

## 4. 设计规范一致性

- 组件继续使用 Element UI 对齐行为，未引入新依赖或新视觉体系。
- 状态使用语义 token，状态不只依赖颜色。
- 收藏夹、规则选择器的 loading/empty/error/partial success 分离。
- 多来源 Tips 保持短内容、轻交互，不扩展内容详情视觉。
- 关键操作保留键盘焦点回收、半选和焦点触发路径。

## 5. Demo 开始前证据

Demo 实施开始前，需在真实页面上完成：

- Browser 或确定性 Playwright 真实路由校验；
- 1440、1280、1024 视口截图与 computed style 记录；
- 收藏夹权限、跨平台频道字段、短链和当前项目规则返回核对；
- 多来源字段与规则来源映射的 fixture/API 边界记录；
- Tooltip 的 z-index、append-to-body、hover/focus 行为核对；
- 请求边界、无生产写入证明，以及页面/组件知识库和测试记录。

## 6. Demo 实施后复核（2026-09-22）

- Demo 已直接运行在 kol-next 真实内容监控项目页和 AddAndAutoTrack Drawer 内，未新建旁路页面。
- Drawer 实际宽度调整为 1200px；Playwright 实测右侧规则区域不再出现本轮导致暂停/恢复入口移出视口的横向溢出。
- 列表行操作组保留编辑、暂停/恢复、删除；“另存为新规则”从列表移除，改为编辑态表单底部与“保存并更新”并列。
- 编辑态已补充“新建规则”入口；切换规则 A/B 会保护未保存修改，窄视口下 Drawer 通过 max-width 收缩并保留独立关闭按钮。
- 收藏夹和其他规则入口已收进“批量添加”内容区；编辑态生效期和历史补扫配置改为只读，避免更新动作破坏当前周期与补扫语义。
- 长期提示已补充“连续 7 天无新增命中自动终止”；服务端仍需补齐最后命中时间、有效追踪时长、采集完整性和终止原因，暂保持 Production HOLD。
- 追加文案复核：长期规则的完整说明从表单底部移至“长期”选项后的系统 info icon hover/focus Tooltip，避免占用表单视觉空间；7 天/30 天仍保留对应生效期提示。
- 另存 Demo 已验证：生成副本规则、保存后弹出生效确认、取消后保留“未生效”状态。
- 静态交互 Showcase：PASS；真实服务端权限、配额、计费、异步补扫和多来源生产数据：HOLD。

## 7. 状态

| 项目 | 状态 |
| --- | --- |
| Design | design_v1_reviewed |
| Design Review | PASS |
| Demo | 已完成一轮真实页面交互验收 |
| Production | HOLD |
| kol-next 代码修改 | 有（Demo 交互态，未接生产接口） |

该 Review 只完成 Design Gate 评审，不替代 Demo 视觉验收或研发接口评审。
