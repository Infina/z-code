# Repo Map 基因图谱：Aider ➡️ Roo Code ➡️ Z Code (v0.1)

## 1. 概念澄清与技术源流

我们必须纠正之前关于 Roo Code "也有 Repo Map" 的误解。事实情况更加激进：

-   **Aider (Python)**:
    -   *贡献*: **发明了 Repo Map**。通过 PageRank 算法让 LLM 理解大型代码库的 "上下文关系"，解决了 "只能看到当前文件，看不到调用链" 的核心痛点。
    -   *缺陷*: 绑定在 Python 生态中，其他 IDE 插件难以直接借用。

-   **Roo Code (Original TypeScript)**:
    -   *现状*: **原生根本没有 Repo Map！**
    -   *机制*: 仅实现了基础的 `codebase-indexing`（向量索引或简单的关键词搜索）。它依赖向量相似度来找代码，而不是依赖图论（关系链）。这在复杂重构场景下效果很差。

-   **Z Code (v0.1 Rust Injection)**:
    -   *定义*: **我们在给 Roo Code 做心脏移植手术。**
    -   *操作*: 我们强行把 Aider 的 Repo Map 核心算法（用 Python 写的逻辑）用 **Rust** 完美重写了一遍，做成了一个二进制外挂 (`roost_bin`)，然后插进了 Roo Code 的体内。
    -   *结果*: 让 Roo Code 第一次拥有了真正的、基于图论的、秒级响应的 "全息代码地图" 能力。

## 2. 核心架构修正对比

| 功能 | Roo Code (原版) | Aider (Repo Map 源头) | **Z Code (我们做的 v0.1)** |
| :--- | :--- | :--- | :--- |
| **代码导航原理** | **向量检索 (RAG)** / 模糊搜索 | **代码关系图 (Knowledge Graph)** | **Rust 版代码关系图 (Native Graph)** |
| **准确率逻辑** | "这个函数**长得像**你要找的" | "文件A **调用了** 文件B" | 同 Aider (复刻其数学逻辑) |
| **计算位置** | Node.js (Web Worker) | Python Runtime | **独立 Rust 进程 (System Binary)** |
| **性能瓶颈** | JS单线程处理海量AST慢 | 多进程通信开销 | **无 (Rayon 并行解析 + Sled 瞬时读写)** |
| **Token控制** | 简单截断 | Tiktoken 精准填充 | **Char 估算 (目前的唯一差距)** |

## 3. Z Code v0.1 的技术创举

我们不仅仅是 "抄作业"，我们在 "把作业用更好的纸和笔重写了一遍"：

1.  **架构降维打击**: Aider 是独立的 CLI 工具，Roo Code 是 VSCode 插件。为了把 Aider 的能力赋予 Roo Code，我们不仅要重写算法，还要解决如何在 Electron (VSCode) 环境里跑 Python 逻辑的问题 —— 我们的答案是 **Rust Sidecar**。
    -   它不用装 Python 环境。
    -   它不用启动 Node 笨重的 Server。
    -   它是一个几十 MB 的单文件，随叫随到。

2.  **青出于蓝 (Optimizations)**:
    -   **Stop Words**: 既然在重写，我们就顺便把 Aider 可能忽略的针对 Web 开发的高频废话给过滤了。
    -   **Precision Linking**: 我们在图构建算法里加入了 Aider 原始论文没详述的 "局部性偏置"，优先连接同文件夹代码。

## 4. 结论：我们是谁？

我们是 **Z Code**。
我们 **不只是 Roo Code 的 Fork**，我们是 **Roo Code 的"大脑升级版"**。
我们把 **Aider 的灵魂 (Repo Map 算法)** 注入到了 **Roo Code 的躯壳 (VSCode UI)** 中，并用 **Rust (高性能引擎)** 完成了这次融合。

这才是 Z Code v0.1 的真实定义。
