import { Changelog } from './../types/changelog';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Create initial changelog
 */
export async function initialize() {
	if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
		const workspace = vscode.workspace.workspaceFolders[0].uri.fsPath;

		const changelog = new Changelog();

		// create file `CHANGELOG.md`
		const filename = path.join(workspace, 'CHANGELOG.md');
		if (!fs.existsSync(filename)) {
			fs.writeFileSync(filename, changelog.toString());
		}

		// set extension to 'initialized'
		vscode.commands.executeCommand('setContext', 'simple-changelog.initialized', true);

		vscode.commands.executeCommand('simple-changelog.refresh');
	}
}
