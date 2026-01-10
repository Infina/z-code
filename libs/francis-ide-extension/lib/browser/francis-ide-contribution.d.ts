import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
export declare const FrancisIdeCommand: Command;
export declare class FrancisIdeCommandContribution implements CommandContribution {
    protected readonly messageService: MessageService;
    registerCommands(registry: CommandRegistry): void;
}
export declare class FrancisIdeMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void;
}
//# sourceMappingURL=francis-ide-contribution.d.ts.map