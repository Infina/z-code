import { ContainerModule } from '@theia/core/shared/inversify';
import { FrancisIdeBackendService } from './francis-ide-backend-service';

export default new ContainerModule(bind => {
    bind(FrancisIdeBackendService).toSelf().inSingletonScope();
});
