# Git Worktree 多 Agent 协作与多项目切换指南

> 适用范围：
> - 通用 Git 仓库中的并行开发
> - NoxInfluencer `drafts/` 这类 PM + AI 协作工作区
>
> 本文是教程，不会自动改动你的工作区。文中的命令均为示例，请在真正执行前结合当前仓库状态确认。

---

## 1. 先说结论

如果你的工作方式里同时存在以下任意两项，`git worktree` 基本就是推荐解：

- 多个 agent 同时干活
- 多个功能并行推进
- 多个原型或研究方向来回切换
- 主目录已经有未提交改动，不想反复 `checkout`
- 希望保留多个任务的独立运行现场

一句话理解：

**`git worktree` = 给同一个 Git 仓库挂出多个独立工作目录，每个目录固定对应一个 branch。**

它解决的不是“多仓库”问题，而是“同一个仓库里如何安全并行工作”的问题。

---

## 2. 为什么不用传统的 `git checkout`

传统工作方式只有一个目录，切任务通常这样做：

1. 在当前目录做任务 A
2. `git checkout feature/b`
3. 开始做任务 B
4. 再切回任务 A

这种方式在单人、单任务、目录干净时还可以忍受，但一旦进入 AI 协作或多项目并行，就会出现几个典型问题：

- 未提交改动阻止切分支
- 一个 agent 切走了另一个 agent 的目录状态
- 不同任务的临时文件、依赖和构建结果混在一起
- 主目录越来越脏，最后谁都不敢切 branch

`worktree` 的核心优势是把“切 branch”变成“切目录”：

- 任务 A 在目录 A
- 任务 B 在目录 B
- 主控工作留在主目录

以后切任务不是：

```bash
git checkout feature/x
```

而是：

```bash
cd .worktrees/feature-x
```

这就是它在多 agent 场景下特别稳的原因。

---

## 3. 核心概念：仓库、branch、worktree 到底是什么关系

建议把这三个概念分开理解：

- **Repository / 仓库**：提交历史和对象数据库
- **Branch / 分支**：仓库中的一条开发线
- **Worktree / 工作树**：某个分支在磁盘上的一个独立工作目录

可以想象成下面这样：

```text
一个仓库 drafts
├── 主工作区 drafts/                 -> main
├── worktree A .worktrees/demo-a/    -> feat/demo-a
└── worktree B .worktrees/research-b/ -> research/b
```

重点：

- 一个仓库可以有多个 worktree
- 每个 worktree 通常对应一个 branch
- 同一个 branch 不能同时被两个 worktree 检出

最后这一条非常重要。Git 故意限制它，是为了避免你在两个目录里同时修改同一条分支，造成混乱。

---

## 4. `git worktree` 适合什么，不适合什么

### 适合

- 同一仓库里的多个并行任务
- 多 agent 协作
- 功能开发、文档编写、原型实验并行
- 需要长时间保留多个上下文
- 想把主目录留作统筹和 review 入口

### 不适合

- 两个完全不同的 Git 仓库
- 只是偶尔切一次分支，且目录长期干净
- 任务非常短、没有并行需求
- 团队没有清晰的目录/分支命名规范

如果是两个完全不同的仓库，例如：

- `drafts/`
- `pm-dashboard/`

那不是 `worktree` 替代关系。正确做法是：

- 每个仓库自己有自己的主目录
- 每个仓库内部再独立使用 `worktree`

---

## 5. 最小心智模型

你只要先记住下面四条，就已经够开始用了：

1. 一个 agent 一个 worktree
2. 一个任务一个 branch
3. 主目录只做统筹，不做具体开发
4. 切换任务靠 `cd`，不是频繁 `checkout`

如果你把这四条长期执行下来，协作稳定性会明显提高。

---

## 6. 基础命令教程

下面是最常用的一组命令。

### 6.1 查看当前有哪些 worktree

```bash
git worktree list
```

示例输出：

```text
/Users/you/project                    63b44ca [main]
/Users/you/project/.worktrees/feat-a  91e2fd1 [feat/a]
/Users/you/project/.worktrees/feat-b  33bc0a7 [feat/b]
```

含义：

- 第一行是主工作区
- 后面每一行是一个额外 worktree
- 方括号里是该目录当前检出的 branch

### 6.2 新建一个 worktree，并同时创建新分支

```bash
git worktree add .worktrees/demo-builder -b feat/demo-builder
```

这条命令一次做了三件事：

1. 创建目录 `.worktrees/demo-builder`
2. 新建 branch `feat/demo-builder`
3. 让这个目录直接检出到该分支

### 6.3 基于已有 branch 创建 worktree

```bash
git worktree add .worktrees/release-check release/7.6
```

适合已有远程或本地分支，只想把它挂成独立目录来操作。

### 6.4 进入某个 worktree

```bash
cd .worktrees/demo-builder
git branch --show-current
```

建议养成习惯：每次进入新的 worktree，先确认当前分支。

### 6.5 删除不再需要的 worktree

```bash
git worktree remove .worktrees/demo-builder
```

注意：

- 如果目录内有未提交改动，Git 可能拒绝删除
- 先确认是否已提交、合并或不再需要

### 6.6 删除分支

```bash
git branch -d feat/demo-builder
```

如果该分支还没合并，Git 会拒绝。那通常是提醒你先确认分支内容是否真的可以删除。

### 6.7 清理失效记录

```bash
git worktree prune
```

用途：

- 清除已经不存在但仍被 Git 记录着的 worktree 元数据

这是周期性清理命令，不需要天天跑，但长期使用 `worktree` 后很有必要。

---

## 7. 常见命令组合

### 新任务：从零开工

```bash
git worktree add .worktrees/feature-x -b feat/feature-x
cd .worktrees/feature-x
git status
```

### 读取已有分支并单独检查

```bash
git worktree add .worktrees/review-760 release/7.6.0
cd .worktrees/review-760
git log --oneline --decorate -5
```

### 任务完成后清理

```bash
git worktree remove .worktrees/feature-x
git branch -d feat/feature-x
git worktree prune
```

---

## 8. 推荐目录策略

`worktree` 放哪里，通常有两种选择。

### 方案 A：项目内 `.worktrees/`

目录示意：

```text
repo/
├── .worktrees/
│   ├── demo-builder/
│   ├── research-init/
│   └── proto-lab/
└── ...
```

优点：

- 离项目最近，最直观
- 看到仓库就能看到所有并行任务
- 非常适合个人和小团队协作

缺点：

- 必须被 `.gitignore` 忽略

### 方案 B：仓库外全局目录

目录示意：

```text
~/.config/superpowers/worktrees/<project-name>/<branch-name>/
```

优点：

- 仓库根目录更干净
- 多个项目可以统一管理

缺点：

- 路径长
- 平时进入目录不够直观

### 默认建议

对大多数 PM + AI 协作工作区，优先建议 **项目内 `.worktrees/`**。

原因很简单：

- 更容易管理
- 更容易解释给其他 agent
- 更适合“一个仓库一眼看清所有并行任务”的工作方式

---

## 9. 为什么 `.worktrees/` 一定要加入 `.gitignore`

如果你把 worktree 建在仓库内，而没有忽略它，典型后果是：

- `git status` 里出现大量 worktree 子目录内容
- 容易误把 worktree 里的文件当作普通仓库内容提交
- 主工作区状态被污染

标准认知是：

**项目内的 `.worktrees/` 本质上是工作目录基础设施，不是仓库内容本身。**

所以它应该被忽略，例如：

```gitignore
.worktrees/
```

注意：本文只解释原则，不代表你现在就该立刻改当前仓库。

---

## 10. 多 Agent 协作的标准模型

这是本文最关键的一部分。

### 10.1 最推荐的角色分工

**主控 agent / 主工作区**

职责：

- 看全局状态
- 审查变更
- 统一合并
- 维护主分支稳定
- 负责文档、计划、任务拆分

限制：

- 尽量不要在主目录里直接做功能实现

**执行 agent / 独立 worktree**

职责：

- 负责一个明确任务
- 只在自己的 branch 上工作
- 自己提交、自己验证

限制：

- 不要碰其他 agent 的目录
- 不要在同一个 worktree 里顺手做多个无关任务

### 10.2 四条强规则

1. 一个 agent 一个 worktree
2. 一个任务一个 branch
3. 一个 worktree 不承载多个无关目标
4. 主目录不做具体实现

只要违反其中任意一条，后面大概率会乱。

### 10.3 为什么不能多个 agent 共用一个目录

共用目录会直接失去 `worktree` 的意义：

- 目录上下文不再稳定
- 提交边界不清楚
- 谁改了什么难以复盘
- 一个 agent 的未提交改动会影响另一个 agent

换句话说：

**多 agent 协作的最小隔离单位，不是 branch，而是 worktree 目录。**

---

## 11. 多项目切换怎么理解

“多个项目切换”要先分成两种情况。

### 情况 A：同一个仓库中的多个项目方向

例如在 `drafts/` 里同时处理：

- 原型 A
- 调研 B
- 文档 C

这仍然是同一仓库，所以可以直接用 `worktree`：

```bash
git worktree add .worktrees/proto-a -b proto/a
git worktree add .worktrees/research-b -b research/b
git worktree add .worktrees/docs-c -b docs/c
```

这时切换项目的方式是：

```bash
cd .worktrees/proto-a
cd .worktrees/research-b
cd .worktrees/docs-c
```

不是：

```bash
git checkout proto/a
git checkout research/b
```

### 情况 B：完全不同的仓库

例如：

- `drafts/`
- `pm-dashboard/`

这里不能用一个仓库的 `worktree` 去管理另一个仓库。正确组织方式是：

```text
pm-workspace/
├── drafts/
│   └── .worktrees/
└── pm-dashboard/
    └── .worktrees/
```

也就是说：

- 每个仓库自己管理自己的 worktree
- 仓库之间靠目录切换，不靠 `worktree` 互相映射

---

## 12. 命名规范建议

命名越清晰，协作越稳。

### 12.1 Branch 命名

推荐使用任务类型前缀：

```text
feat/<task>
fix/<task>
docs/<task>
research/<task>
proto/<task>
chore/<task>
```

例子：

```text
feat/demo-builder
docs/worktree-guide
research/twitter-search
proto/monitor-flow-v1
```

### 12.2 Worktree 目录命名

目录名建议和任务名保持一致，不要把完整 branch 名连斜杠直接搬过来。

推荐：

```text
.worktrees/demo-builder
.worktrees/worktree-guide
.worktrees/twitter-search
```

不推荐：

```text
.worktrees/feat/demo-builder
.worktrees/research/twitter-search
```

原因：

- 目录层级会变复杂
- shell 路径和跳转成本更高

### 12.3 Agent 任务命名

如果一个大任务拆给多个 agent，可以在 branch 中体现子任务边界：

```text
feat/monitor-a
feat/monitor-b
feat/monitor-c
```

目录对应：

```text
.worktrees/monitor-a
.worktrees/monitor-b
.worktrees/monitor-c
```

---

## 13. 标准 SOP：从开任务到收尾

下面给出一套可长期复用的标准流程。

### Step 1：主目录确认状态

在主目录先看整体情况：

```bash
git status --short --branch
git worktree list
```

目的：

- 确认当前主分支状态
- 看是否已有同名或相关 worktree

### Step 2：决定任务边界

创建 worktree 之前，先把任务边界说清楚：

- 这是功能任务、文档任务还是研究任务
- 是否需要独立 branch
- 是否会和其他任务相互影响

经验规则：

- 只要任务会持续超过半天，或需要 agent 独立工作，就值得单独开 worktree

### Step 3：创建 worktree

```bash
git worktree add .worktrees/<task-name> -b <branch-name>
```

例如：

```bash
git worktree add .worktrees/demo-builder -b feat/demo-builder
```

### Step 4：进入目录并做基线检查

```bash
cd .worktrees/demo-builder
git branch --show-current
git status
```

如果这是代码型任务，还建议补一轮依赖/测试检查，例如：

```bash
npm install
npm test
```

或者：

```bash
pnpm install
pnpm build
```

目的：

- 确保这个 worktree 作为独立工作区可正常工作
- 把“原本就坏掉”和“新改坏了”区分开

### Step 5：让 agent 在该目录内独立完成任务

执行阶段只遵循一条原则：

**不要跨目录做事。**

也就是：

- 在 `.worktrees/demo-builder` 做的事，不要顺手回主目录继续改
- 在 `.worktrees/research-init` 做的事，不要顺手改 `.worktrees/demo-builder`

### Step 6：提交

在各自 worktree 中独立提交：

```bash
git add .
git commit -m "feat: implement demo builder flow"
```

### Step 7：回主目录统一 review 和合并

切回主目录，做总控检查：

```bash
cd /path/to/repo
git log --oneline --graph --decorate --all
git diff main...feat/demo-builder
```

然后再决定 merge。

### Step 8：清理

任务确认合并完成后：

```bash
git worktree remove .worktrees/demo-builder
git branch -d feat/demo-builder
git worktree prune
```

这一步不要省略。不清理，几周后目录会变成垃圾堆。

---

## 14. 一个完整的多 Agent 示例

假设你要同时推进三件事：

- 任务 A：整理 demo 构建流程
- 任务 B：写调研项目初始化规范
- 任务 C：实验一个原型交互

标准组织方式：

```bash
git worktree add .worktrees/demo-builder -b feat/demo-builder
git worktree add .worktrees/research-init -b docs/research-init-guide
git worktree add .worktrees/proto-lab -b proto/proto-lab
```

得到的目录结构：

```text
drafts/                         -> main
.worktrees/demo-builder         -> feat/demo-builder
.worktrees/research-init        -> docs/research-init-guide
.worktrees/proto-lab            -> proto/proto-lab
```

协作方式：

- 主控 agent 留在 `drafts/`
- Agent A 只进入 `.worktrees/demo-builder`
- Agent B 只进入 `.worktrees/research-init`
- Agent C 只进入 `.worktrees/proto-lab`

切换时只做目录切换：

```bash
cd .worktrees/demo-builder
cd .worktrees/research-init
cd .worktrees/proto-lab
```

不要互相 `checkout` 对方的分支。

---

## 15. Nox `drafts/` 工作区的推荐落地方式

下面这一节专门针对你当前这类 PM 工作区。

### 15.1 推荐定位

在 `drafts/` 里，建议这样分工：

- **主目录 `drafts/`**
  - 用于时间轴、计划、路线图、总控 review
  - 不作为具体功能实现的主战场

- **`.worktrees/`**
  - 用于每个独立任务的执行目录
  - 文档、调研、原型、脚本都可以独立出去

### 15.2 适合单独开 worktree 的任务类型

- `01_Product_Specs/` 下的大功能规格编写
- `02_Research_Analysis/` 下的专题调研
- `06_Prototypes/` 下的 demo 或交互实验
- `.agents/skills/` 下的 skill 重构
- 跨多目录的结构性改动

### 15.3 推荐命名风格

适合 Nox 的 branch 示例：

```text
docs/git-worktree-guide
research/tarsight-gap-analysis
feat/nox-demo-builder
proto/cool-hello-world-v3
chore/skill-refactor-poe-bd-tracker
```

对应目录示例：

```text
.worktrees/git-worktree-guide
.worktrees/tarsight-gap-analysis
.worktrees/nox-demo-builder
.worktrees/cool-hello-world-v3
.worktrees/poe-bd-tracker
```

### 15.4 为什么这对 `drafts/` 特别有用

因为这个仓库天然有几类工作同时存在：

- 文档
- 调研
- 原型
- 自动化脚本
- agent skill

这些工作彼此有关联，但节奏不同、目录不同、持续时间也不同。用单一主目录硬扛，最后通常会变成：

- `git status` 很长
- 不敢轻易切 branch
- 一个任务还没收尾，另一个任务又开始了

`worktree` 刚好适合把这些并行流分开。

---

## 16. 实战中的判断规则

不是每个任务都必须开 worktree，但你可以用下面这组规则快速判断。

### 建议开 worktree 的情况

- 任务会持续超过半天
- 会有第二个 agent 介入
- 任务改动跨多个目录
- 当前主目录本身就不干净
- 你需要保留当前任务现场，晚点继续

### 可以不单独开 worktree 的情况

- 只是几分钟的小修正
- 当前目录干净
- 不需要并行
- 不需要保留独立上下文

如果你犹豫，经验上宁可多开一个 worktree，也不要把主目录继续弄脏。

---

## 17. 常见坑

### 坑 1：主目录继续做具体开发

结果：

- 主目录越来越脏
- `worktree` 变成摆设

改法：

- 主目录只保留总控职责

### 坑 2：一个 worktree 里顺手做多个任务

结果：

- commit 边界不清楚
- review 成本升高
- agent 职责混乱

改法：

- 一个 worktree 只承载一个明确目标

### 坑 3：忘了忽略 `.worktrees/`

结果：

- `git status` 污染
- 容易误提交

### 坑 4：合并后不清理

结果：

```text
.worktrees/
  a-temp/
  b-temp2/
  final/
  final2/
  final-final/
```

改法：

- 合并后及时 `remove`
- 定期 `prune`

### 坑 5：把 `worktree` 当成“多个独立仓库”

结果：

- 对 Git 行为产生误解

要点：

- 它们共享同一个仓库历史
- 只是多个工作目录，不是多个仓库副本

---

## 18. FAQ

### Q1：同一个 branch 能不能挂两个 worktree？

不能。Git 会阻止你这么做。

### Q2：删除 worktree 前里面有未提交改动怎么办？

先处理改动，再删目录。一般有三种路：

- 提交
- 合并后删除
- 明确确认不需要，再手动清理

不要在没判断清楚的情况下直接强删。

### Q3：不同 worktree 会共享 `node_modules` 吗？

通常不会。每个 worktree 是独立目录，大多数本地依赖和构建输出都按目录存在。

这意味着：

- 隔离性更强
- 但也可能需要各自安装依赖

### Q4：远程分支怎么配合使用？

`worktree` 不影响正常的 `git fetch`、`git push`、`git pull`。  
它改变的是本地目录组织方式，不改变 Git 基础协作模型。

### Q5：什么时候应该优先清理旧 worktree？

以下任一情况出现就该清理：

- 任务已 merge
- 实验方案已废弃
- 超过一周没有再进入
- 目录名字你自己都看不懂了

---

## 19. 一套可以直接照抄的命令模板

以下命令仅作为模板，不代表你现在就该执行。

### 初始化一组并行任务

```bash
# 查看现状
git status --short --branch
git worktree list

# 为 3 个任务创建独立工作区
git worktree add .worktrees/demo-builder -b feat/demo-builder
git worktree add .worktrees/research-init -b docs/research-init-guide
git worktree add .worktrees/proto-lab -b proto/proto-lab
```

### 分别进入各自目录

```bash
cd .worktrees/demo-builder
git branch --show-current

cd ../research-init
git branch --show-current

cd ../proto-lab
git branch --show-current
```

### 收尾清理

```bash
git worktree remove .worktrees/demo-builder
git branch -d feat/demo-builder

git worktree remove .worktrees/research-init
git branch -d docs/research-init-guide

git worktree remove .worktrees/proto-lab
git branch -d proto/proto-lab

git worktree prune
```

---

## 20. 最后的推荐实践

如果你想把这件事真的用顺，建议长期坚持下面这套默认规则：

- 默认把主目录当作“控制台”，不是“施工现场”
- 默认一个任务一个 worktree
- 默认一个 agent 一个 worktree
- 默认切换任务用 `cd`
- 默认合并后立刻清理

把这几条变成习惯后，`git worktree` 就不再只是一个 Git 小技巧，而会变成你做多 agent 协作和多项目切换的基础设施。

---

## 21. 一句话速记版

**主目录做统筹，任务目录做实现；一个 agent 一个 worktree，一个任务一个 branch；切换靠 `cd`，不要靠来回 `checkout`。**
