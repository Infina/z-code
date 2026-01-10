"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("@theia/core/shared/inversify");
const francis_ide_backend_service_1 = require("./francis-ide-backend-service");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(francis_ide_backend_service_1.FrancisIdeBackendService).toSelf().inSingletonScope();
});
//# sourceMappingURL=francis-ide-backend-module.js.map