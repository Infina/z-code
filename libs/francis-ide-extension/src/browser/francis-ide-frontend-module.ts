import { ContainerModule } from '@theia/core/shared/inversify';
import { ApplicationShell } from '@theia/core/lib/browser/shell/application-shell';
import { HolographicShell } from './holographic-shell';

/**
 * The Frontend Module for Francis IDE.
 * It initializes the Holographic Shell by rebinding the default Theia ApplicationShell.
 */
export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // Rebind the standard ApplicationShell to our Holographic implementation
    rebind(ApplicationShell).to(HolographicShell).inSingletonScope();
    
    // We remove the default Hello World contributions to start with a clean state
    // bind(CommandContribution).to(FrancisIdeCommandContribution);
    // bind(MenuContribution).to(FrancisIdeMenuContribution);
});
