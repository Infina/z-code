# SPEC_MODULE_SOLC_TECH_STACK — Module‑6 SOLC（知识结晶器/酶）技术栈卡片（研究/落地口径）

> **Scope**：SOLC 在当前技术栈中的职责、关键路径、工件与验收口径。  
> **Reality Anchor**：`metrics/timeseries/hefi_series.jsonl` + `knowledge/hippo/*` + `receipts/*`  
> **P0 任务包**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

---

## 1) SOLC 是什么

- **定位**：系统的"酶/消化加速器"——把文本/事件流结晶为结构化逻辑工件（LogicGraphIR → Hippo GraphStore → Sim2Real → 回流）。
- **关键原则**：没有 SOLC 系统也能跑（deterministic），但 SOLC 提供结构化密度与可成长性。
- **P0 依赖**：Hippo rebuild 依赖证据链可靠性；"规模→高置信资产"依赖 Bayes 主链路对齐。

---

## 2) 关键代码入口（Where to read）

- **Ingest‑V2 / ReasoningPayload**：`rust_core/crates/q_rlm/src/qir.rs` + `ingest.rs`
- **Logic Extractor（LLM + sanitizer）**：`rust_core/crates/q_rlm/src/logic_extractor/*`
- **Hippo GraphStore/DB**：`rust_core/crates/q_rlm/src/hippo.rs` + `knowledge/hippo/`
- **Onchain crystallizer**：`rust_core/crates/q_rlm/src/solc/onchain_crystallizer.rs`
- **[P0-E 核心] Bayes p_valid 更新**：`rust_core/crates/q_rlm/src/pvalid_bayesian.rs`
  - `update_edge_bayesian()`：Beta-Bernoulli 共轭更新
  - `batch_bayesian_update()`：批量更新
- **[P0-E 核心] 收据→边匹配**：`rust_core/crates/q_rlm/src/receipt_matcher.rs`
  - 混合匹配策略：规范化哈希 → Jaro-Winkler → 向量语义

---

## 3) 关键工件（Artifacts）

- `ir/logic_graphs/*.json`（LogicGraphIR）
- `ir/knowledge_graph/invariants/*.json`
  - **[P0-E 新增]** 字段：`alpha`、`beta`（Bayes 参数）
- `knowledge/hippo/graph.json` / `index.jsonl` / `hippo.sqlite` / `knowledge/hippo/db/hippo.surreal/`
- `receipts/sim2real/*.json` / `receipts/anchor/*.json`
- `metrics/timeseries/hefi_series.jsonl`（invariants/logic_graphs/hippo 等硬数字）
  - **[P0-D 相关]** `convergence` 字段

---

## 4) 验收口径（最少五条）

1. **硬数字增长**：invariants、logic_graphs、receipts、hippo 节点/边在 series 中持续增长（或有明确停滞原因）。
2. **Anti‑Contamination**：结构化工件不沉淀 Teacher 原文为 canonical（只允许 stats‑only evidence）。
3. **收敛趋势**：必须用分布指标证明 p_valid 开始分层（`validation_count_p50/p90`、`p_valid_ge_0_9_ratio`）。
4. **[P0-E 新增] Bayes 模式生效**：
   ```bash
   jq '.alpha, .beta' ir/knowledge_graph/invariants/inv_*.json | head -10
   # 期望：有 alpha/beta 值（非 null）
   ```
5. **[P0-1 依赖] 无 trailing characters**：
   ```bash
   Select-String "trailing characters" metrics/timeseries/hefi_series.jsonl
   # 期望：无匹配
   ```

---

## 5) P0 阻塞与任务对齐

| P0 问题 | 任务包 | 交付物 | 对 SOLC 的影响 |
|---------|--------|--------|----------------|
| **P0‑1 Evidence 可靠性** | [A] | Q-RLM 原子写入 | Hippo rebuild 被 `trailing characters` 阻断 |
| **P0‑2 复验调度** | [C] | 复验调度器 | invariants 需被复验覆盖 |
| **P0‑E Bayes 对齐** | [E] | onchain_sim2real Bayes | **SOLC 核心交付**：p_valid 主链路对齐 |

> **调研材料**：`docs/P0_EVIDENCE_CHAIN_RELIABILITY_AND_CONVERGENCE.md`  
> **任务分发**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

