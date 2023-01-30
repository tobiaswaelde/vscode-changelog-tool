import * as vscode from 'vscode';
import { ItemType } from '../../../types/changelog';
import { ChangelogVersionTreeItem } from '../items/version-tree-item';
import { ChangelogTypeTreeItem } from './../items/type-tree-item';

export async function addItem(element: ChangelogTypeTreeItem | ChangelogVersionTreeItem) {
	const { changelog } = element;
	//TODO
	let type: ItemType = (element as ChangelogTypeTreeItem).type || 'none';
	// if element is version, ask user which type the item should be
	if (element instanceof ChangelogVersionTreeItem) {
		const res = await vscode.window.showQuickPick(
			[
				'addition',
				'change',
				'deprecation',
				'fix',
				'removal',
				'securityChange',
			] satisfies ItemType[],
			{
				title: 'Select type',
			}
		);
	}
	// ask user for item text
	// add item to version
	// update changelog file & refresh treeview
}
