import { Changelog } from './../../../classes/changelog';
import * as vscode from 'vscode';
import { ItemType, ChangelogVersion, ChangelogItem } from '../../../types/changelog';
import { getIconColorFromItemType } from '../../util';
import { getConfig } from '../../../config';

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

		const colorEnabled = getConfig<boolean>('icons.color.enabled') ?? true;
		const color = colorEnabled ? getIconColorFromItemType(type) : undefined;
		this.iconPath = new vscode.ThemeIcon('circle-filled', color);
	}
}
