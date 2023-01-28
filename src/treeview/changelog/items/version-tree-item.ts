import * as vscode from 'vscode';
import { Version } from '../../../types/changelog';

export class ChangelogVersionTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'changelog-version';

	constructor(public version: Version) {
		super(version.label, vscode.TreeItemCollapsibleState.Collapsed);

		this.description = version.date;
	}
}
