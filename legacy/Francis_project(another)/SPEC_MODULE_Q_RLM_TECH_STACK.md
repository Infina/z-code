# SPEC_MODULE_Q_RLM_TECH_STACK — Module‑2 Q‑RLM（大脑/治理回路）技术栈卡片（研究/落地口径）

> **Scope**：Q‑RLM 的"可运行现实口径"：进程、主循环、关键工件、门控与验收。  
> **Reality Anchor**：`docs/道途.md` + `CHECK_STATUS.ps1/.sh` + `metrics/timeseries/qrlm_series.jsonl`  
> **P0 任务包**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

---

## 1) Q‑RLM 是什么

- **定位**：系统的"中枢神经系统/治理回路"——调度六大模块的闭环（ingest → crystallize → verify → metabolize → evidence）。
- **原则**：Evidence‑first + Anti‑Contamination + 可自愈派生伪影。

---

## 2) 当前运行形态（单进程口径）

- **唯一常驻进程**：`qrlm_sched daemon`（已合并 watch 功能；tick interval 自适应）
- **职责**：
  - 运行 macro tick / policy 驱动的编排
  - 写 evidence chain + merkle 派生（**P0-1：需升级为跨平台原子追加**）
  - 写 timeseries（qrlm/hefi/columbus）
  - 管理本地 LLM server（若启用）
  - 触发 UPE cadence
  - **[P0-2 新增] 复验调度（revalidation tick）**

---

## 3) 关键代码入口（Where to read）

- **daemon 主入口**：`rust_core/crates/q_rlm/src/bin/qrlm_sched.rs`
- **μ‑Control 状态/预算**：`rust_core/crates/q_rlm/src/meta_control.rs`
- **Evidence chain + Merkle**：`rust_core/crates/q_rlm/src/evidence.rs`
  - **[P0-1 新增]** 跨平台原子追加（`O_APPEND` / `FILE_APPEND_DATA`）
  - **[P0-1 新增]** 尾部撕裂启动自愈（`repair_tail_on_startup()`）
- **[P0-1 新增] 修复工具**：`rust_core/crates/q_rlm/src/bin/qrlm_evidence_repair.rs`
- **[P0-2 新增] 复验调度**：`rust_core/crates/q_rlm/src/revalidation/mod.rs`
  - `Stratifier`：A/B/C 分层
  - `MusSampler`：MUS 样本量计算
  - `SprtChecker`：SPRT 停止规则
- **[P0-2 新增] 收敛指标**：`rust_core/crates/q_rlm/src/convergence_metrics.rs`
- **Ingestion（结构化载荷）**：`rust_core/crates/q_rlm/src/ingest.rs` + `qir.rs`

---

## 4) 关键工件（Artifacts）

- **证据链**：`evidence/chain.jsonl`（**P0-1：必须严格 JSONL**）
- **Merkle 派生**：`evidence/merkle/*`
  - **[P0-1 新增]** Skip Links checkpoint（`prev_hashes: [H_{n-1}, H_{n-10}, H_{n-100}]`）
- **时序指标**：`metrics/timeseries/qrlm_series.jsonl`（以及 hefi/columbus）
  - **[P0-2 新增]** `convergence` 字段：`p_valid_ge_0_9_ratio`、`validation_count_p50/p90`、`SE_24h`、`wilson_ci_width`
- **状态**：
  - `colony/state/upe_last_run.json`（UPE cadence）
  - **[P0-2 新增]** `colony/state/sprt_state.json`（SPRT 停止状态）

---

## 5) 门控与配置（Feature/Env）

> 以 `docs/specs/SPEC_Q_RLM_AUTOPILOT_DAEMON.md` 为准（Windows Scheduled Task / Linux systemd）。

- **LLM**：
  - `QRLM_LLM_PROVIDER` / `QRLM_LLM_LOCAL_URL` / `QRLM_LLM_LOCAL_MODEL`
- **UPE**：
  - `QRLM_UPE_EVERY_SECS` / `QRLM_UPE_FORCE`
- **[P0-2 新增] 复验**：
  - `QRLM_REVALIDATION_QUOTA`：每 tick 复验上限
  - `QRLM_SPRT_ALPHA` / `QRLM_SPRT_BETA`：SPRT 阈值

---

## 6) 验收口径（最少五条）

1. **Doctor**：`CHECK_STATUS.ps1`/`.sh` 单屏确认：daemon 存活、LLM reachable、UPE cadence、evidence_lines 增长。
2. **严格 JSONL**：`evidence/chain.jsonl` 可逐行 `json.loads`（否则观测/自愈不可信）。
   ```bash
   python -c "import json; [json.loads(l) for l in open('evidence/chain.jsonl')]"
   ```
3. **多进程压测**：`cargo test evidence_concurrent_append` 通过（10进程并发写1000行无错误）。
4. **series 持续前进**：`metrics/timeseries/qrlm_series.jsonl` tick 连续增长，且关键错误字段长期为 null。
5. **[P0-2 新增] 收敛信号**：
   - 24h 内：`validation_count_p50 >= 2`
   - Doctor 显示 `p_valid_ge_0_9_ratio`

---

## 7) P0 阻塞与任务对齐

| P0 问题 | 任务包 | 交付物 | 进度 |
|---------|--------|--------|------|
| **P0‑1 原子写入** | [A] | `evidence.rs` 跨平台原子追加 | 🟡 进程内锁已有，跨进程待补 |
| **P0‑1 尾部自愈** | [A] | `repair_tail_on_startup()` | ⏳ 待做 |
| **P0‑1 Merkle 自愈** | [B] | Skip Links + 反熵修复 | ⏳ 待做 |
| **P0‑2 复验调度** | [C] | `revalidation/` 模块 | ⏳ 待做 |
| **P0‑2 分布指标** | [D] | `convergence_metrics.rs` | ⏳ 待做 |

> **调研材料**：`docs/P0_EVIDENCE_CHAIN_RELIABILITY_AND_CONVERGENCE.md`  
> **任务分发**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

