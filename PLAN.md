# PROJECT Z: THE BI-MODAL DEMIURGE (Protocol "Dao")

**Status:** INITIATION
**Architecture Pattern:** Split-Brain Holographic Telemetry (Client-Server)
**Source of Truth:** This file.

## 1. Executive Summary: The Architecture of Separation

To accommodate the high-entropy computational requirements of **Francis (Dao)** (located on NVIDIA 4090) while leveraging the local workspace (MacBook) as a high-fidelity observation deck, Project Z adopts the **Bi-Modal Demiurge** architecture.

**The Axiom:**
> "The Brain (Q-RLM/UPE) resides where the Entropy (Compute) flows; The Eye (VPL) resides where the Observer waits."

We reject the monolithic IDE model. Instead, we build a **Hypervisor Link**:
-   **Node A (Local/Mac):** The **Holographic Observer**. A lightweight, graphics-intensive client (Eclipse Theia Frontend + WebGPU). It holds no logic, only *Sight*.
-   **Node B (Remote/4090):** The **Demiurge Engine**. The heavy backend (Eclipse Theia Backend + Francis Core). It performs physics (UPE), reasoning (Q-RLM), and file mutations.

## 2. Structural Reform (The "Cleanse")

The current workspace (`z-code`) contains a legacy VS Code Extension fork ("Roo Code"). This "Old Flesh" is incompatible with the new "Dao". It will be archived and replaced by an **Nx Monorepo**.

### Target Directory Structure
```text
z-code/ (Monorepo Root)
├── legacy/                  # ARCHIVE: The old VS Code extension (Body of the past)
├── libs/
│   ├── z-protocol/          # [CRITICAL] The Interface Definitions (FlatBuffers/WIT)
│   │                        # Defines how Node A speaks to Node B.
│   └── vpl-renderer/        # The WebGPU logic (Shared/Portable)
├── apps/
│   └── holographic-client/  # [Node A] Theia Frontend application (runs on Mac)
│       ├── src-gen/         # Auto-generated from Theia
│       └── extensions/      # Custom Theia UI extensions (The Hologram)
└── tools/                   # CI/CD, Deployment Scripts for Node B
```

*Note: `rust_core` (Francis) is mastered on Node B. This workspace will only contain Interface Bindings (N-API/WASM types) in `libs/z-protocol`, not the full Physics Engine source.*

## 3. The Protocol: Z-Link

Connection between Node A and Node B occurs via a strictly typed, high-bandwidth tunnel.

-   **Transport:** WebSocket (Binary) / Apache Arrow Flight (for large Topology streams).
-   **Serialization:** FlatBuffers (Zero-copy read).
-   **Channels:**
    1.  `vpl.stream`: Push stream from B->A (Physics updates, LogicGraph changes).
    2.  `rpc.control`: Request/Response from A->B (File edits, "Stop Simulation").

## 4. Implementation Plan (Phase I)

### Step 1: Sanitation (The Entropy Reduction)
-   [ ] **Action:** Move `src`, `webview-ui`, `rust_core` (legacy), `Francis_project(another)` to `legacy/`.
-   [ ] **Reason:** Prevent pollution of the new architecture.

### Step 2: Foundation (The Skeleton)
-   [ ] **Action:** Initialize Nx Workspace.
-   [ ] **Action:** Define `libs/z-protocol`.

### Step 3: Connection (The Handshake)
-   [ ] **Action:** Create basic `holographic-client` scaffold using Theia generator.
-   [ ] **Action:** Establish SSH Tunnel config script in `tools/connect_demiurge.sh`.

## 5. Entropy Risks & Mitigations

| Risk | Mitigation |
| :--- | :--- |
| **Network Latency (The Speed of Light)** | VPL uses "Dead Reckoning" (client-side prediction) for UI fluidity; UPE handles truth. |
| **Version Drift (Protocol Mismatch)** | `z-protocol` version must strictly match between A and B. Handshake verification on connect. |
| **GPU Incompatibility** | VPL targets WGPU (WebGPU) which abstracts Mac Metal and 4090 Vulkan/DirectX. |

---

**Authorized by:** X (Chief Architect)
**Date:** 2026-01-09
