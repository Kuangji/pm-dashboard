# 频道搜索 Agent 化改造 · XState 接入说明 v1

> 文档阶段：Technical Notes  
> 状态：Draft v1  
> 创建日期：2026-03-25

---

## 一、目标

本次接入 XState 的目标不是替换视觉层，而是把当前 Demo 从：

- 手写全局变量
- 手写状态三元组
- 手写动作与路径跳转映射

收敛为：

- `XState machine` 作为唯一状态来源
- Demo 只负责渲染与事件分发

---

## 二、当前运行时结构

### 2.1 三层 machine

- `inputMachine`
  - 输入编辑器行为
- `containerMachine`
  - 搜索框模式
- `sessionMachine`
  - 搜索任务进度

### 2.2 顶层编排器

- `searchboxOrchestratorMachine`
  - 持有：
    - `currentFixtureId`
    - `currentScene`
    - `currentVariant`
  - 协调三层 machine 的并行状态
  - 对外暴露当前三元组与当前 fixture

### 2.3 Demo fixture catalog

当前 Demo 仍保留一组 fixture 数据，用于描述：

- 页面上展示什么文案
- 当前 fixture 对应什么场景与子状态
- 当前状态下有哪些动作
- 当前状态图高亮哪些节点

这些 fixture 已不再直接作为运行时状态真相，而是：

- 用于初始化和切换 machine
- 用于渲染 Demo 视觉内容

---

## 三、构建方式

当前 Demo 采用最小构建方案：

- 目录：`06_Prototypes/channel_search_agent_upgrade_demo/`
- 依赖：
  - `xstate`
  - `esbuild`
- 构建命令：
  - `npm run build`

构建结果：

- `src/main.js` 与 `src/machines/*` 被 bundle 到根目录 `app.js`
- 发布目录仍保持纯静态：
  - `publish/demos/channel-search-agent-upgrade/`

---

## 四、当前限制

- fixture catalog 仍然存在，尚未完全 machine-first 化
- 路径点击目前默认通过 `LOAD_FIXTURE` 落到目标 fixture
- 并非所有路径都已映射到最终语义化事件
- 状态图仍然是自定义 SVG，而不是从 machine 自动布局生成

---

## 五、下一步建议

1. 把 `stateActions` 从“目标 fixture”继续推进到“语义事件优先”
2. 把 `stateNodeMap / stateTriples` 进一步压缩为 machine selector 派生
3. 逐步将 `scenarios` 与 `fixture meta` 拆到独立 `demoFixtures` 模块
4. 后续若状态图继续复杂，再讨论是否引入 machine -> graph 的自动校验能力
