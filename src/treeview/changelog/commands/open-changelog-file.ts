import { ChangelogFolderTreeItem } from '../items/folder-tree-item';
import * as vscode from 'vscode';

export async function openChangelogFile(item: ChangelogFolderTreeItem) {
	const file = vscode.Uri.file(item.changelog.filepath);
	const doc = await vscode.workspace.openTextDocument(file);
	vscode.window.showTextDocument(doc);
}
