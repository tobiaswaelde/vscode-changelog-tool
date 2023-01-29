import { Changelog } from './../../../classes/changelog';
import * as vscode from 'vscode';
import { v4 as uuid } from 'uuid';
import { ItemType, Version } from '../../../types/changelog';
import { getIconColorFromItemType } from '../../util';

export class ChangelogItemTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'changelog-item';

	constructor(
		public readonly changelog: Changelog,
		public readonly version: Version,
		public readonly type: ItemType,
		public readonly item: string
	) {
		super(item, vscode.TreeItemCollapsibleState.None);

		this.id = uuid();
		this.tooltip = item;
		this.iconPath = new vscode.ThemeIcon('circle-filled', getIconColorFromItemType(type));
	}

	command?: vscode.Command | undefined = {
		command: 'simple-changelog.item.select',
		title: 'CLICK',
	};
}
