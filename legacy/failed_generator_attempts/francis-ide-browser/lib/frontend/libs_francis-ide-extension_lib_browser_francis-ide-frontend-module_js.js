"use strict";
(self["webpackChunkfrancis_ide_browser"] = self["webpackChunkfrancis_ide_browser"] || []).push([["libs_francis-ide-extension_lib_browser_francis-ide-frontend-module_js"],{

/***/ "../../libs/francis-ide-extension/lib/browser/francis-ide-frontend-module.js"
/*!***********************************************************************************!*\
  !*** ../../libs/francis-ide-extension/lib/browser/francis-ide-frontend-module.js ***!
  \***********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const inversify_1 = __webpack_require__(/*! @theia/core/shared/inversify */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/shared/inversify/index.js");
const application_shell_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/application-shell */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/browser/shell/application-shell.js");
const holographic_shell_1 = __webpack_require__(/*! ./holographic-shell */ "../../libs/francis-ide-extension/lib/browser/holographic-shell.js");
/**
 * The Frontend Module for Francis IDE.
 * It initializes the Holographic Shell by rebinding the default Theia ApplicationShell.
 */
exports["default"] = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    // Rebind the standard ApplicationShell to our Holographic implementation
    rebind(application_shell_1.ApplicationShell).to(holographic_shell_1.HolographicShell).inSingletonScope();
    // We remove the default Hello World contributions to start with a clean state
    // bind(CommandContribution).to(FrancisIdeCommandContribution);
    // bind(MenuContribution).to(FrancisIdeMenuContribution);
});


/***/ },

/***/ "../../libs/francis-ide-extension/lib/browser/holographic-shell.js"
/*!*************************************************************************!*\
  !*** ../../libs/francis-ide-extension/lib/browser/holographic-shell.js ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HolographicShell = void 0;
const inversify_1 = __webpack_require__(/*! @theia/core/shared/inversify */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/shared/inversify/index.js");
const shell_1 = __webpack_require__(/*! @theia/core/lib/browser/shell */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/browser/shell/index.js");
const status_bar_1 = __webpack_require__(/*! @theia/core/lib/browser/status-bar/status-bar */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/browser/status-bar/status-bar.js");
const split_panels_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/split-panels */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/browser/shell/split-panels.js");
const frontend_application_state_1 = __webpack_require__(/*! @theia/core/lib/browser/frontend-application-state */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/browser/frontend-application-state.js");
const common_1 = __webpack_require__(/*! @theia/core/lib/common */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/common/index.js");
const saveable_service_1 = __webpack_require__(/*! @theia/core/lib/browser/saveable-service */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/browser/saveable-service.js");
const secondary_window_handler_1 = __webpack_require__(/*! @theia/core/lib/browser/secondary-window-handler */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/browser/secondary-window-handler.js");
const window_service_1 = __webpack_require__(/*! @theia/core/lib/browser/window/window-service */ "../../node_modules/.pnpm/@theia+core@1.67.0_@theia+electron@1.67.0_electron@38.4.0_/node_modules/@theia/core/lib/browser/window/window-service.js");
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


/***/ }

}]);
//# sourceMappingURL=libs_francis-ide-extension_lib_browser_francis-ide-frontend-module_js.js.map