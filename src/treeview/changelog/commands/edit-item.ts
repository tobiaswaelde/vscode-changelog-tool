import * as vscode from 'vscode';
import { ChangelogItemTreeItem } from '../items/item-tree-item';

export async function editItem(element: ChangelogItemTreeItem) {
	const { changelog } = element;

	// ask for new item text
	const res = await vscode.window.showInputBox({
		title: 'Edit item text',
		value: element.label?.toString(),
	});
	if (!res) {
		return;
	}

	// get version
	const version = changelog.versions.find((x) => x.label === element.version.label);
	if (!version) {
		return;
	}

	// get item
	const item = version.items.find(
		(x) => x.type === element.item.type && x.text === element.item.text
	);
	if (!item) {
		return;
	}

	// update item in changelog
	item.text = res;

	// update changelog file & refresh treeview
	const success = changelog.writeToFile();
	if (success) {
		vscode.commands.executeCommand('simplechangelog.changelogs.refresh');
	}
}
