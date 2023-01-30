import * as vscode from 'vscode';
import { ItemType } from '../../../types/changelog';
import { itemTypes } from '../../../util/changelog';
import { findKey } from '../../../util/object';
import { ChangelogVersionTreeItem } from '../items/version-tree-item';
import { ChangelogTypeTreeItem } from './../items/type-tree-item';

export async function addItem(element: ChangelogTypeTreeItem | ChangelogVersionTreeItem) {
	const { changelog, version } = element;
	let type: ItemType = (element as ChangelogTypeTreeItem).type;

	// if element is version, ask user which type the item should be
	if (element instanceof ChangelogVersionTreeItem) {
		const selectedType = await vscode.window.showQuickPick(
			Object.values(itemTypes).map((x) => x.singular),
			{
				title: 'Select type',
			}
		);
		if (!selectedType) {
			return;
		}

		type = findKey(itemTypes, 'singular', selectedType)!;
	}

	// ask user for item text
	const text = await vscode.window.showInputBox({
		title: 'Enter item text',
		placeHolder: 'Describe your change',
		ignoreFocusOut: true,
	});
	if (!text) {
		return;
	}

	// check if item already exists for the given tyoe in the current version
	if (version.items.find((x) => x.type === type && x.text === text)) {
		vscode.window.showErrorMessage(
			'Item already exists in this version. Chose another item text and try again.'
		);
	}

	// add item to version
	changelog.versions.find((x) => x.label === version.label)?.items.push({ type, text });

	// update changelog file & refresh treeview
	const success = changelog.writeToFile();
	if (success) {
		vscode.commands.executeCommand('simpleChangelog.changelogs.refresh');
	}
}
