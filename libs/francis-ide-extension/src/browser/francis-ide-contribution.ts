import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';

export const FrancisIdeCommand: Command = {
    id: 'FrancisIde.command',
    label: 'Say Hello'
};

@injectable()
export class FrancisIdeCommandContribution implements CommandContribution {
    
    @inject(MessageService)
    protected readonly messageService!: MessageService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(FrancisIdeCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class FrancisIdeMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: FrancisIdeCommand.id,
            label: FrancisIdeCommand.label
        });
    }
}
