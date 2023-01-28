import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { ChangelogProvider } from './treeview/changelog/provider';

export function activate(context: vscode.ExtensionContext) {
	console.log('[Simple Changelog] Extension is now active.');

	// treeview
	const provider = new ChangelogProvider(context);
	vscode.window.createTreeView('changelog-explorer', {
		treeDataProvider: provider,
		showCollapseAll: true,
	});
	provider.refresh();

	registerCommands(context);
}

export function deactivate() {}
