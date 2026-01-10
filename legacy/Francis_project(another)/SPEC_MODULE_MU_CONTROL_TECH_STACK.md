# SPEC_MODULE_MU_CONTROL_TECH_STACK — Module‑3 μ‑Control（进化方程/控制律）技术栈卡片（研究/落地口径）

> **Scope**：μ‑Control 在当前技术栈中的"可运行口径"：状态、预算、观测量、调参入口与验收方式。  
> **Reality Anchor**：`metrics/timeseries/qrlm_series.jsonl` + `docs/道途.md`  
> **P0 任务包**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

---

## 1) μ‑Control 是什么

- **定位**：系统的"代谢与进化控制律"——把系统运行约束（预算/节律/负载/饥饿）变成可调的控制输入，让闭环能自适应而不是死锁。
- **输出**：MetaControlState/MetaBudgets，驱动 daemon 的 sleep/tick/任务调度与资源分配。
- **P0 角色**：
  - 接收 P0-2 的**收敛分布指标**作为控制输入
  - 分配 P0-2 的**复验预算**（`revalidation_quota`）

---

## 2) 关键代码入口

- `rust_core/crates/q_rlm/src/meta_control.rs`
  - **[P0-C 相关]** `MetaBudgets::revalidation_quota`：复验每 tick 上限
  - **[P0-D 相关]** 需要接入收敛指标作为控制输入
- daemon 中的自适应 tick / cadence 接线：`rust_core/crates/q_rlm/src/bin/qrlm_sched.rs`
- **[P0-C 新增]** 复验调度器接口：`rust_core/crates/q_rlm/src/revalidation/mod.rs`

---

## 3) 关键观测量（必须可量化）

> 只给 mean 会误导；必须补"分布指标"。（详见 `docs/道途.md` P0/P1 清单）

- **核心 series**：`metrics/timeseries/qrlm_series.jsonl`
  - 预算/压力：budgets/pressure（字段依实现演化）
  - `evolution_roi`（若已输出）
  - **[P0-D 新增]** `convergence` 字段：
    - `p_valid_ge_0_9_ratio`：高置信占比
    - `validation_count_p50/p90`：复验分布
    - `SE_24h`：标准误差
    - `layer_a_coverage`/`layer_b_sprt_status`/`layer_c_mus_progress`：分层状态
- **闭环健康**：evidence_lines、tick cadence、错误率趋势
- **[P0-C 相关]** `colony/state/sprt_state.json`：SPRT 停止状态

---

## 4) P0 对齐需求（控制律需要的新输入）

| 输入来源 | 任务包 | 对 μ‑Control 的意义 |
|----------|--------|---------------------|
| `p_valid_ge_0_9_ratio` | [D] | 高置信资产占比 → 影响"饥饿"判定 |
| `validation_count_p50` | [D] | 复验覆盖率 → 影响复验预算分配 |
| `layer_b_sprt_status` | [C] | SPRT 状态 → 可提前停止复验节省预算 |
| `SE_24h` | [D] | 收敛精度 → 判断是否达标可降低复验频率 |

**新增控制变量**：
- `revalidation_quota`：每 tick 复验任务上限（由 μ‑Control 分配，复验调度器消费）

---

## 5) 验收口径（最少四条）

1. **可观测**：`qrlm_series.jsonl` 能看到预算/节律对负载变化有响应（不是常数）。
2. **可解释**：Doctor/Scoreboard 能说明"为什么此刻系统变慢/变快/暂停某任务"（stats‑only）。
3. **[P0-C 相关] 复验预算有效**：
   ```bash
   jq '.convergence.layer_b_sprt_status' metrics/timeseries/qrlm_series.jsonl | tail -5
   # 期望：accepted / rejected / sampling（非 null）
   ```
4. **[P0-D 相关] 收敛指标可用**：
   ```bash
   jq '.convergence' metrics/timeseries/qrlm_series.jsonl | tail -1
   # 期望：有 p_valid_ge_0_9_ratio 等字段
   ```

---

## 6) P0 阻塞与任务对齐

| P0 问题 | 任务包 | 交付物 | μ‑Control 职责 |
|---------|--------|--------|----------------|
| **P0‑2 复验调度** | [C] | 复验调度器 | 分配 `revalidation_quota` |
| **P0‑2 分布指标** | [D] | 收敛指标 | 接收指标作为控制输入 |

> **调研材料**：`docs/P0_EVIDENCE_CHAIN_RELIABILITY_AND_CONVERGENCE.md`  
> **任务分发**：`docs/specs/DELEGATION_P0_TASK_PACKAGES.md`

