import * as vscode from 'vscode';
import { ItemType } from '../../../types/changelog';
import { getIconColorFromItemType } from '../../util';

export class ChangelogItemTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'changelog-item';

	constructor(public type: ItemType, public item: string) {
		super(item, vscode.TreeItemCollapsibleState.None);
		this.tooltip = item;
		this.iconPath = new vscode.ThemeIcon('circle-filled', getIconColorFromItemType(type));
	}
}
