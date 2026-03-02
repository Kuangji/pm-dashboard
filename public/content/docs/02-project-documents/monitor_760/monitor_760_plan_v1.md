# 执行规划：内容监控 2.0 (v7.6.0) 多模块设计项目

## 1. 项目愿景 (Goal)
重构内容监控的创建与管理链路，统一入口，增强批量效率，支持 Twitter (X) 平台，并实现数据全链路溯源。

## 2. 模块拆解 (Module Breakdown)

> **核心参考**: 所有模块设计必须遵循 `monitor_common_context_v1.md` 中的名词定义与业务背景。

| 模块 ID | 模块名称 | 核心职责 | 当前状态 | 关联文档 |
| :--- | :--- | :--- | :--- | :--- |
| M1 | 新建监控 (Create) | 统一入口、暂存区、自动追踪管理 | ✅ 已交付 | `monitor_create_design_v1.md` |
| M2 | 监控列表 (List) | 来源溯源字段、进度展示、新任务提醒 | ✅ 已交付 | `monitor_list_design_v1.md` |
| M3 | Twitter 监控 (Twitter) | X 平台指标定义、详情页卡片、解析逻辑 | ✅ 已交付 | `twitter_support_design_v1.md` |

## 3. 标准执行流 (Standard Workflow)
每一个模块必须经历以下四个步骤：
1.  **[Input] 原始输入**: 用户提供需求片段、反馈或业务逻辑。
    *   **🔍 Proactive Step**: 必须先检查 `monitor_backlog_v1.md`，查看是否有之前沉淀的灵感可纳入本次范围。
2.  **[Spec] 需求规格**: 整理并固化为需求规格文档。
    *   **⚠️ Checkpoint**: 必须对照 `monitor_common_context_v1.md` 检查是否遗漏了基础 UI 组件（如汇总面板、详情抽屉）或通用业务名词。
3.  **[Design] 交互设计**: 激活 `noxui_req_interpreter` 基于 Spec 生成交互方案。
    *   **⚠️ Layout Rule**: 必须强制要求 **Desktop WEB** 布局，适配大屏幕工作站视图。
4.  **[Review] 确认/修正**: 根据反馈调整，直至设计闭环。

## 4. 全局整合原则 (Integration Principles)
在完成所有子模块设计后，必须进行一次 **全局整合**，重点补齐以下“粘合逻辑”：
- **全局状态机**: 统一各模块对任务生命周期（新建-监控中-异常-临期-到期-续期）的枚举定义。
- **跨模块交互流转**: 明确参数传递逻辑（如从列表跳转至规则管理时的定位参数）。
- **统一异常处理池**: 汇总所有模块的报错信息及处理策略。

## 5. 任务清单 (Task List)

### 阶段 0：模块 1 (新建监控) 迭代 - [已完成]
- [x] **[Input]**: 编写原始需求稿 (`monitor_create_input_v1.md`)
- [x] **[Spec]**: 整理需求规格文档 (`monitor_create_spec_v1.md`)
- [x] **[Design]**: 输出 M1 交互设计稿 (`monitor_create_design_v1.md`)
- [x] **[Review]**: 在 Stitch 中完成原型验证

### 阶段 1：模块 2 (监控列表) 迭代 - [已完成]
- [x] **[Input]**: 编写原始输入文档 (`monitor_list_input_v1.md`)
- [x] **[Spec]**: 整理需求规格文档 (`monitor_list_spec_v1.md`)
- [x] **[Design]**: 生成交互设计方案 (`monitor_list_design_v1.md`)
- [x] **[Review]**: 确认设计细节并进行原型验证

### 阶段 2：模块 3 (Twitter 支持) 迭代 - [已完成]
- [x] **[Input]**: 编写原始输入文档 (`twitter_support_input_v1.md`)
- [x] **[Spec]**: 整理需求规格文档 (`twitter_support_spec_v1.md`)
- [x] **[Design]**: 生成交互设计方案 (`twitter_support_design_v1.md`)
- [x] **[Review]**: 确认设计细节并进行原型验证

### 阶段 3：全局整合与归档 - [已完成]
- [x] **[Integration]**: 整合 M1/M2/M3，补齐“粘合逻辑”，输出最终 PRD (`monitor_760_prd_v1.md`)
- [x] **[Handoff]**: 移动至 `01_Product_Specs` 并更新 `__main__.md`

---
**版本控制信息**：
*   版本名称：Content Monitor 2.0
*   版本号：7.6.0
*   最终规格文档: `01_Product_Specs/monitor_760_prd_v1.md`
