# SPEC_MODULE_IAL_TECH_STACK — Module‑5 IAL（交互接入层 / Adapters）技术栈卡片（研究/落地口径）

> **Scope**：IAL（Interaction Adapter Layer）的定位、权威规格入口、与 Q‑RLM/VPL 的边界。  
> **Reality Anchor**：`docs/specs/SPEC_Q_RLM_INTERACTION_LAYER_ADAPTERS.md`  
> **P0 状态**：IAL 与 P0 弱耦合，属于 **P1 阶段**接入

---

## 1) IAL 是什么

- **定位**：系统的"接口/膜"——把外部世界（Cursor/Web/API/Worker/企业系统）接入器灵，但**不越权成为本体裁决者**。
- **为什么是独立模块**：隔离外部 IO/权限/输入噪音，使核心闭环可持续演化。
- **P0 依赖**：IAL 产生的 evidence 依赖 Q-RLM 的原子写入；P0-1 完成后 IAL 的 evidence 才可信。

---

## 2) 权威规格入口

- `docs/specs/SPEC_Q_RLM_INTERACTION_LAYER_ADAPTERS.md`（权威）
-（交互面总览）`docs/specs/SPEC_Q_RLM_INTERACTION_SURFACE.md`

---

## 3) 当前运行口径

- IAL 作为适配层，必须保持"可替换/可扩展"，并通过 policy/env 约束外部 IO。
- 主闭环以 `qrlm_sched daemon` 为核心；IAL 只负责输入/输出路径与权限边界。

---

## 4) 验收口径（最少一条）

- 外部接入的每次关键动作都能产生 stats‑only evidence（不泄露 Teacher 原文），且可在 Doctor/Scoreboard 中定位到触发来源。

---

## 5) P0 相关（P1 阶段）

| P0 问题 | 对 IAL 的影响 | 接入阶段 |
|---------|---------------|----------|
| P0-1 Evidence 可靠性 | 间接：IAL 产生的 evidence 依赖 | P0 完成后 |
| P0-2 收敛指标 | 无直接影响 | P1 |

> **调研材料**：`docs/P0_EVIDENCE_CHAIN_RELIABILITY_AND_CONVERGENCE.md`  
> **任务分发**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

