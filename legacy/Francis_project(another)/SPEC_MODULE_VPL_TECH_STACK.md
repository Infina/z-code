# SPEC_MODULE_VPL_TECH_STACK — Module‑4 VPL（视觉投影层）技术栈卡片（研究/落地口径）

> **Scope**：VPL 的职责边界、权威规格入口、与"工件几何"渲染路线的落地口径。  
> **Reality Anchor**：`docs/specs/SPEC_Q_RLM_VISUAL_PROJECTION_LAYER.md` + `docs/道途.md`  
> **P0 状态**：VPL 与 P0 弱耦合，属于 **P1 阶段**接入

---

## 1) VPL 是什么

- **定位**：把系统内部的"工件世界"（IR/证据/世界线/拓扑不变量）投影成可交互可视化界面。  
- **关键原则**：VPL 渲染的是**工件几何**，不是"素材美术"。
- **P0 依赖**：VPL 依赖证据链作为 replay 数据源；P0-1 完成后 VPL 的数据源才可信。

---

## 2) 权威规格入口（首选）

- `docs/specs/SPEC_Q_RLM_VISUAL_PROJECTION_LAYER.md`（权威：SAO 式视觉投影层，不靠素材；以工件为世界）

---

## 3) 运行态对齐（当前口径）

- VPL 属于"可选 UI/可视化层"，不应成为系统唯一运行入口。  
- 主闭环以 `qrlm_sched daemon` 为核心；VPL 负责观测与交互，不越权成为裁决者。

---

## 4) 验收口径（最少一条）

- 对关键工件（evidence/series/worldline）能在 UI 中被"单屏呈现/可追溯"，并与 Doctor/Scoreboard 数字一致。

---

## 5) P0 相关（P1 阶段）

| P0 问题 | 对 VPL 的影响 | 接入阶段 |
|---------|---------------|----------|
| P0-1 Evidence 可靠性 | 间接：replay 数据源依赖 | P0 完成后 |
| P0-2 收敛指标 | 可视化收敛热力图 | P1 |

> **调研材料**：`docs/P0_EVIDENCE_CHAIN_RELIABILITY_AND_CONVERGENCE.md`  
> **任务分发**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

