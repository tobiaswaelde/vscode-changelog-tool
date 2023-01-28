import * as vscode from 'vscode';
import { registerCommands, registerUnititializedCommands } from './commands';
import { registerChangelogCommands } from './treeview/changelog/commands';
import { ChangelogProvider } from './treeview/changelog/provider';
import { findFiles } from './util/fs';

export function activate(context: vscode.ExtensionContext) {
	console.log('[Simple Changelog] Extension is now active.');

	// find workspace paths
	const workspaces =
		vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
			? vscode.workspace.workspaceFolders.map((x) => x.uri.fsPath)
			: undefined;
	if (!workspaces) {
		return;
	}

	// find all paths where a changelog.md is present
	const changelogPaths: string[] = workspaces.reduce(
		(acc: string[], workspace) =>
			acc.concat(...findFiles(workspace, /changelog.md/i, /node_modules/)),
		[]
	);

	registerUnititializedCommands(context);

	// show welcome view is no changelogs found
	if (changelogPaths.length === 0) {
		vscode.commands.executeCommand('setContext', 'simple-changelog.initialized', false);
		return;
	}

	// set extension to 'initialized'
	vscode.commands.executeCommand('setContext', 'simple-changelog.initialized', true);

	// treeview
	const provider = new ChangelogProvider(changelogPaths);
	vscode.window.createTreeView('changelog-explorer', {
		treeDataProvider: provider,
		showCollapseAll: true,
	});

	registerCommands(context);
	registerChangelogCommands(context);
}

export function deactivate() {}
