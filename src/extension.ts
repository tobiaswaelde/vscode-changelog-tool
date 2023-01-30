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
	vscode.commands.registerCommand('simpleChangelog.changelogs.refresh', () => provider.refresh());

	registerCommands(context);

	// refresh treeview when config changes
	vscode.workspace.onDidChangeConfiguration((e) => {
		// only listen for config changes in simpleChangelog config
		if (e.affectsConfiguration('simpleChangelog')) {
			vscode.commands.executeCommand('simpleChangelog.changelogs.refresh');
		}
	});
}

export function deactivate() {
	//
}
