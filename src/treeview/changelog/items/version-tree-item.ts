import * as vscode from 'vscode';
import { Changelog } from '../../../classes/changelog';
import { ChangelogVersion } from '../../../types/changelog';

export class ChangelogVersionTreeItem extends vscode.TreeItem {
	contextValue = 'changelog-version';

	constructor(public readonly changelog: Changelog, public readonly version: ChangelogVersion) {
		super(version.label, vscode.TreeItemCollapsibleState.Collapsed);

		this.description = version.date;
	}
}
