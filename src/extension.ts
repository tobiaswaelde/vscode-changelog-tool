// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { ChangelogProvider } from './treeview/provider';
import { Changelog } from './types/changelog';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const rootPath =
		vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
			? vscode.workspace.workspaceFolders[0].uri.fsPath
			: undefined;

	if (rootPath) {
		const changelogFile = path.join(rootPath, 'changelog.md');
		const content = fs.readFileSync(changelogFile).toString();

		const changelog = Changelog.parse(content);

		const provider = new ChangelogProvider(changelog);
		// vscode.window.registerTreeDataProvider('changelog', provider);

		vscode.window.createTreeView('changelog', {
			treeDataProvider: provider,
		});
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
