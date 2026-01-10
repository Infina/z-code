"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolographicShell = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const shell_1 = require("@theia/core/lib/browser/shell");
const status_bar_1 = require("@theia/core/lib/browser/status-bar/status-bar");
const split_panels_1 = require("@theia/core/lib/browser/shell/split-panels");
const frontend_application_state_1 = require("@theia/core/lib/browser/frontend-application-state");
const common_1 = require("@theia/core/lib/common");
const saveable_service_1 = require("@theia/core/lib/browser/saveable-service");
const secondary_window_handler_1 = require("@theia/core/lib/browser/secondary-window-handler");
const window_service_1 = require("@theia/core/lib/browser/window/window-service");
/**
 * The HolographicShell replaces the default Theia ApplicationShell.
 * It serves as the visual substrate for Project Z's immersive interface.
 */
let HolographicShell = class HolographicShell extends shell_1.ApplicationShell {
    constructor(dockPanelRendererFactory, statusBar, sidePanelHandlerFactory, splitPositionHandler, applicationStateService, options, corePreferences, saveableService, secondaryWindowHandler, windowService) {
        super(dockPanelRendererFactory, statusBar, sidePanelHandlerFactory, splitPositionHandler, applicationStateService, options, corePreferences, saveableService, secondaryWindowHandler, windowService);
    }
    init() {
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
    createLayout() {
        const layout = super.createLayout();
        console.log('Holographic Shell: Geometry Flow established.');
        return layout;
    }
};
exports.HolographicShell = HolographicShell;
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HolographicShell.prototype, "init", null);
exports.HolographicShell = HolographicShell = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(shell_1.DockPanelRenderer)),
    __param(1, (0, inversify_1.inject)(status_bar_1.StatusBarImpl)),
    __param(2, (0, inversify_1.inject)(shell_1.SidePanelHandler)),
    __param(3, (0, inversify_1.inject)(split_panels_1.SplitPositionHandler)),
    __param(4, (0, inversify_1.inject)(frontend_application_state_1.FrontendApplicationStateService)),
    __param(5, (0, inversify_1.inject)(shell_1.ApplicationShellOptions)),
    __param(6, (0, inversify_1.inject)(common_1.CorePreferences)),
    __param(7, (0, inversify_1.inject)(saveable_service_1.SaveableService)),
    __param(8, (0, inversify_1.inject)(secondary_window_handler_1.SecondaryWindowHandler)),
    __param(9, (0, inversify_1.inject)(window_service_1.WindowService)),
    __metadata("design:paramtypes", [Function, status_bar_1.StatusBarImpl, Function, split_panels_1.SplitPositionHandler,
        frontend_application_state_1.FrontendApplicationStateService, Object, Object, saveable_service_1.SaveableService,
        secondary_window_handler_1.SecondaryWindowHandler, Object])
], HolographicShell);
//# sourceMappingURL=holographic-shell.js.map