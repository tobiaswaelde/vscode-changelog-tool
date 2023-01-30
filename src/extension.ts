import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { ChangelogProvider } from './treeview/changelog/provider';
import { setContextObject } from './util/context';

export function activate(context: vscode.ExtensionContext) {
	console.log('[Simple Changelog] Extension is now active.');

	setContextObject(context);

	// treeview
	const provider = new ChangelogProvider(context);
	vscode.window.createTreeView('changelog-explorer', {
		treeDataProvider: provider,
		showCollapseAll: true,
	});
	vscode.commands.registerCommand('simplechangelog.changelogs.refresh', () => provider.refresh());

	registerCommands(context);
}

export function deactivate() {
	//
}
