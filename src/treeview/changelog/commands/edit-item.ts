import * as vscode from 'vscode';
import { ChangelogItemTreeItem } from '../items/item-tree-item';

export async function editItem(item: ChangelogItemTreeItem) {
	const res = await vscode.window.showInputBox({
		prompt: 'Edit item content',
		title: 'Edit item',
		value: item.label?.toString(),
	});
	if (res) {
		const changelog = item.changelog;

		// get index of version in version array
		const vx = changelog.versions.findIndex((x) => x.label === item.version.label);
		if (vx === -1) {
			return;
		}

		// get index of item in item array inside version
		const ix = changelog.versions[vx].items.findIndex(
			(x) => x.type === item.item.type && x.text === item.item.text
		);

		// update item in changelog
		changelog.versions[vx].items[ix] = {
			type: changelog.versions[vx].items[ix].type,
			text: res,
		};

		// update changelog file & refresh treeview
		const success = changelog.writeToFile();
		if (success) {
			vscode.commands.executeCommand('simple-changelog.changelogs.refresh');
		}
	}
}
