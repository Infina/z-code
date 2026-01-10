import { ApplicationShell } from '@theia/core/lib/browser/shell/application-shell';
import { Layout } from '@theia/core/shared/@lumino/widgets';
/**
 * The HolographicShell replaces the default Theia ApplicationShell.
 * It serves as the visual substrate for Project Z's immersive interface.
 *
 * Future iterations will implement a non-document-centric layout,
 * utilizing WebGPU for the Visual Projection Layer (VPL).
 */
export declare class HolographicShell extends ApplicationShell {
    /**
     * Assemble the application shell layout.
     * We override this to provide the entry point for Project Z's custom layout geometry.
     */
    protected createLayout(): Layout;
    /**
     * Placeholder for future Z-Link protocol integration.
     */
    initializeZLink(): void;
}
//# sourceMappingURL=holographic-shell.d.ts.map