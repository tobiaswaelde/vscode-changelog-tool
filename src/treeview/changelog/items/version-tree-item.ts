import * as vscode from 'vscode';
import { v4 as uuid } from 'uuid';
import { Changelog } from '../../../classes/changelog';
import { Version } from '../../../types/changelog';

export class ChangelogVersionTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'changelog-version';

	constructor(public readonly changelog: Changelog, public readonly version: Version) {
		super(version.label, vscode.TreeItemCollapsibleState.Collapsed);

		this.id = uuid();
		this.description = version.date;
	}
}
