import * as vscode from 'vscode';
import { ChangelogItemTreeItem } from './../items/item-tree-item';

export async function deleteItem(element: ChangelogItemTreeItem) {
	const { changelog, version, item } = element;

	// ask the user if he wants to delete the item
	const res = await vscode.window.showErrorMessage(
		`Do you really want to delete the selected item?`,
		'Yes',
		'No'
	);
	if (res !== 'Yes') {
		return;
	}

	// delete item from changelog
	version.items = version.items.filter((x) => x.text !== item.text);

	// update changelog file & refresh treeview
	const success = changelog.writeToFile();
	if (success) {
		vscode.commands.executeCommand('simpleChangelog.changelogs.refresh');
	}
}
