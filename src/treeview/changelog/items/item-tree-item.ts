import { Changelog } from './../../../classes/changelog';
import * as vscode from 'vscode';
import { ItemType, ChangelogVersion, ChangelogItem } from '../../../types/changelog';
import { getIconColorFromItemType } from '../../util';

export class ChangelogItemTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'changelog-item';

	constructor(
		public readonly changelog: Changelog,
		public readonly version: ChangelogVersion,
		public readonly type: ItemType,
		public readonly item: ChangelogItem
	) {
		super(item.text, vscode.TreeItemCollapsibleState.None);

		this.tooltip = item.text;
		this.iconPath = new vscode.ThemeIcon('circle-filled', getIconColorFromItemType(type));
	}

	command?: vscode.Command | undefined = {
		command: 'simple-changelog.item.select',
		title: 'CLICK',
	};
}
