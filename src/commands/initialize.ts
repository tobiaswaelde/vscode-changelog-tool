import { Changelog } from '../classes/changelog';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { setContext } from '../util/context';

/**
 * Create initial changelog
 */
export async function initialize() {
	if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
		const workspace = vscode.workspace.workspaceFolders[0].uri.fsPath;

		// create file `CHANGELOG.md`
		const filename = path.join(workspace, 'CHANGELOG.md');
		if (!fs.existsSync(filename)) {
			const changelog = new Changelog(filename);
			fs.writeFileSync(filename, changelog.toString(), 'utf8');
		}

		// open file in editor
		const file = vscode.Uri.file(filename);
		const doc = await vscode.workspace.openTextDocument(file);
		vscode.window.showTextDocument(doc);

		// set extension to 'initialized'
		setContext('initialized', true);

		// refresh to show new changelog in tree view
		vscode.commands.executeCommand('simple-changelog.refresh');
	}
}
