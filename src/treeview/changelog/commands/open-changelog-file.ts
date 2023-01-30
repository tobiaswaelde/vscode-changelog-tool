import { ChangelogFolderTreeItem } from '../items/folder-tree-item';
import * as vscode from 'vscode';

export async function openChangelogFile(element: ChangelogFolderTreeItem) {
	const { changelog } = element;
	const file = vscode.Uri.file(changelog.filepath);
	const doc = await vscode.workspace.openTextDocument(file);
	vscode.window.showTextDocument(doc);
}
