import { ApplicationShell, DockPanelRenderer, SidePanelHandler } from '@theia/core/lib/browser/shell';
import { Layout } from '@theia/core/shared/@lumino/widgets';
import { StatusBarImpl } from '@theia/core/lib/browser/status-bar/status-bar';
import { SplitPositionHandler } from '@theia/core/lib/browser/shell/split-panels';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
import { CorePreferences, RecursivePartial } from '@theia/core/lib/common';
import { SaveableService } from '@theia/core/lib/browser/saveable-service';
import { SecondaryWindowHandler } from '@theia/core/lib/browser/secondary-window-handler';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
/**
 * The HolographicShell replaces the default Theia ApplicationShell.
 * It serves as the visual substrate for Project Z's immersive interface.
 */
export declare class HolographicShell extends ApplicationShell {
    constructor(dockPanelRendererFactory: () => DockPanelRenderer, statusBar: StatusBarImpl, sidePanelHandlerFactory: () => SidePanelHandler, splitPositionHandler: SplitPositionHandler, applicationStateService: FrontendApplicationStateService, options: RecursivePartial<ApplicationShell.Options> | undefined, corePreferences: CorePreferences, saveableService: SaveableService, secondaryWindowHandler: SecondaryWindowHandler, windowService: WindowService);
    protected init(): void;
    protected createLayout(): Layout;
}
//# sourceMappingURL=holographic-shell.d.ts.map