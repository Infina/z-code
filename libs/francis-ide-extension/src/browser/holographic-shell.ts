import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { ApplicationShell, DockPanelRenderer, SidePanelHandler, ApplicationShellOptions } from '@theia/core/lib/browser/shell';
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
@injectable()
export class HolographicShell extends ApplicationShell {
    
    constructor(
        @inject(DockPanelRenderer) dockPanelRendererFactory: () => DockPanelRenderer,
        @inject(StatusBarImpl) statusBar: StatusBarImpl,
        @inject(SidePanelHandler) sidePanelHandlerFactory: () => SidePanelHandler,
        @inject(SplitPositionHandler) splitPositionHandler: SplitPositionHandler,
        @inject(FrontendApplicationStateService) applicationStateService: FrontendApplicationStateService,
        @inject(ApplicationShellOptions) options: RecursivePartial<ApplicationShell.Options> | undefined,
        @inject(CorePreferences) corePreferences: CorePreferences,
        @inject(SaveableService) saveableService: SaveableService,
        @inject(SecondaryWindowHandler) secondaryWindowHandler: SecondaryWindowHandler,
        @inject(WindowService) windowService: WindowService
    ) {
        super(
            dockPanelRendererFactory,
            statusBar,
            sidePanelHandlerFactory,
            splitPositionHandler,
            applicationStateService,
            options,
            corePreferences,
            saveableService,
            secondaryWindowHandler,
            windowService
        );
    }

    @postConstruct()
    protected override init(): void {
        super.init();
        console.log('Holographic Shell: Core Substrate initialized via PostConstruct.');
        
        // VISUAL PROOF: Direct DOM Injection to verify the Shell is alive.
        // This will be replaced by WebGPU/VPL in Phase 2.1.
        const indicator = document.createElement('div');
        indicator.id = 'holographic-substrate-signal';
        indicator.innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                        color: #00ff00; font-family: monospace; font-size: 24px; text-align: center;
                        text-shadow: 0 0 10px #00ff00; pointer-events: none;">
                [ PROJECT Z : HOLOGRAPHIC SUBSTRATE ONLINE ]<br/>
                <span style="font-size: 14px; color: #888;">GEOMETRY FLOW ESTABLISHED. AWAITING VPL INJECTION.</span>
            </div>
        `;
        document.body.appendChild(indicator);
    }

    protected override createLayout(): Layout {
        const layout = super.createLayout();
        console.log('Holographic Shell: Geometry Flow established.');
        return layout;
    }
}
