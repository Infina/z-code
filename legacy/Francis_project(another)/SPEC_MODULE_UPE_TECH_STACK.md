# SPEC_MODULE_UPE_TECH_STACK — Module‑1 UPE（通用物理引擎）技术栈卡片（研究/落地口径）

> **Scope**：Module‑1（UPE）在当前 Francis_bot 技术栈中的**职责、边界、代码入口、工件与验收方式**。  
> **不是**：完整物理学笔记/推导（那属于研究材料，不作为验收口径）。  
> **Reality Anchor**：`docs/道途.md` Doctor/Scoreboard + `CHECK_STATUS.ps1/.sh`  
> **P0 任务包**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

---

## 1) UPE 是什么（在六大模块里的位置）

- **定位**：系统的"身体/验证层"——把 002（候选逻辑/世界线）产生的假设，锚定到可执行的物理/市场模拟，并生成可审计回执。
- **输出**：Sim2Real receipts + p_valid 反馈信号（回流 002 形成共轭增长）。
- **P0 依赖**：UPE 的 receipts 写入依赖 Q-RLM 的证据链可靠性；p_valid 回流依赖复验调度。

---

## 2) 当前运行路径（Real‑path 优先）

- **常驻进程**：`qrlm_sched daemon`（单进程口径；cadence 自适应）
- **cadence 状态**：`colony/state/upe_last_run.json`
- **UPE 实后端**（feature‑gated）：
  - `thermodynamics` / `superfluid`（真实物理/连续介质模拟）
  - `multiverse`（量子市场模拟；`--features upe_multiverse`）
- **验证模式**：
  - **观测验证**（HeFi onchain）：链上 swap 事件作为"实际发生"信号
  - **模拟验证**（U6 cadence）：`multiverse`/`thermodynamics` 参数化模拟

---

## 3) 关键代码入口（Where to read）

- **UPE trait / bridge**：`rust_core/crates/q_rlm/src/upe_bridge.rs`
- **Graph ↔ UPE（Sim2Real loop）**：`rust_core/crates/q_rlm/src/graph_upe_bridge.rs`
- **Onchain Sim2Real receipts（HeFi）**：`rust_core/crates/q_rlm/src/upe/onchain_sim2real.rs`
  - **[P0-E 新增]** Bayes p_valid 主链路对齐（替换 EMA-ish）
- **[P0-E 相关] Bayes 更新**：`rust_core/crates/q_rlm/src/pvalid_bayesian.rs`
- **[P0-E 相关] 收据匹配**：`rust_core/crates/q_rlm/src/receipt_matcher.rs`

---

## 4) 关键工件（Artifacts）

- **运行态状态**：`colony/state/upe_last_run.json`
- **验证回执**：
  - `receipts/sim2real/*.json`（规模化）
  - `receipts/anchor/*.json`（锚定回执）
- **[P0-2 相关] 回流指标**：
  - invariants 的 `alpha`/`beta` 字段（Bayes 模式）
  - evidence metrics 的 `p_valid_mode` 字段

---

## 5) 门控与配置（Feature/Env）

- **Cargo features（示例）**：`upe_multiverse`
- **Env（示例）**：
  - `QRLM_UPE_EVERY_SECS`（基础 cadence；daemon 可自适应）
  - `QRLM_UPE_FORCE`（启动后强跑一次）
  - **[P0-2 相关]** `QRLM_PVALID_MODE=bayesian`（启用 Bayes 模式）

> 具体启用方式以 `docs/specs/SPEC_Q_RLM_AUTOPILOT_DAEMON.md` 与 `docs/specs/SPEC_Q_RLM_002_PRIVATE_UNIVERSE_INDEX.md` 为准。

---

## 6) 验收口径（最少四条）

1. **Doctor**：`CHECK_STATUS.ps1`/`.sh` 能看到 UPE cadence 状态（last_run/last_error/due）。
2. **Evidence/metrics**：`metrics/timeseries/hefi_series.jsonl`/`qrlm_series.jsonl` 中 UPE 相关字段持续更新；回执数量持续增长（或明确解释为何停滞）。
3. **真 UPE 验证**：
   ```bash
   grep "sched:upe_simulate" evidence/chain.jsonl | tail -1 | jq '.metrics.simulator_id'
   # 期望：multiverse（而非 multiverse_unavailable / mock）
   ```
4. **[P0-E 新增] Bayes 模式**：
   ```bash
   grep "onchain_sim2real:batch" evidence/chain.jsonl | tail -1 | jq '.metrics.p_valid_mode'
   # 期望：bayesian
   ```

---

## 7) P0 阻塞与任务对齐

| P0 问题 | 任务包 | 交付物 | 对 UPE 的影响 |
|---------|--------|--------|---------------|
| **P0‑1 Evidence 可靠性** | [A] | Q-RLM 原子写入 | UPE receipts 写入依赖；先修 |
| **P0‑2 复验调度** | [C] | 复验调度器 | UPE 验证结果需被复验覆盖 |
| **P0‑E Bayes 对齐** | [E] | onchain_sim2real Bayes | UPE 的 p_valid 回流主链路 |

> **调研材料**：`docs/P0_EVIDENCE_CHAIN_RELIABILITY_AND_CONVERGENCE.md`  
> **任务分发**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

