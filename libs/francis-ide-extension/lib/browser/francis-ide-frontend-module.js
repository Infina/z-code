"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("@theia/core/shared/inversify");
const application_shell_1 = require("@theia/core/lib/browser/shell/application-shell");
const holographic_shell_1 = require("./holographic-shell");
/**
 * The Frontend Module for Francis IDE.
 * It initializes the Holographic Shell by rebinding the default Theia ApplicationShell.
 */
exports.default = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    // Rebind the standard ApplicationShell to our Holographic implementation
    rebind(application_shell_1.ApplicationShell).to(holographic_shell_1.HolographicShell).inSingletonScope();
    // We remove the default Hello World contributions to start with a clean state
    // bind(CommandContribution).to(FrancisIdeCommandContribution);
    // bind(MenuContribution).to(FrancisIdeMenuContribution);
});
//# sourceMappingURL=francis-ide-frontend-module.js.map