import { Changelog } from './../../../classes/changelog';
import * as vscode from 'vscode';
import { ItemType, ChangelogVersion, ChangelogItem } from '../../../types/changelog';
import { getIconColorFromItemType, getIconFromItemType } from '../../util';
import { getConfig } from '../../../config';

export class ChangelogItemTreeItem extends vscode.TreeItem {
	contextValue = 'changelog-item';

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

		const typeIconsEnabled = getConfig<boolean>('icons.item.enabled') ?? false;
		const rawIcon = getConfig<string>('icons.item.icon') ?? 'circle-filled';
		const icon = typeIconsEnabled
			? getIconFromItemType(type)
			: new vscode.ThemeIcon(rawIcon, color);
		this.iconPath = icon;
	}
}
