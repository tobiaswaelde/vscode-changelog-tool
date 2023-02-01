import moment = require('moment');
import * as vscode from 'vscode';
import { Changelog } from '../../../classes/changelog';
import { getConfig } from '../../../config';
import { ChangelogVersion } from '../../../types/changelog';

export class ChangelogVersionTreeItem extends vscode.TreeItem {
	contextValue = 'changelog-version';

	constructor(public readonly changelog: Changelog, public readonly version: ChangelogVersion) {
		super(version.label, vscode.TreeItemCollapsibleState.Collapsed);

		const dateFormat = getConfig<string>('dateFormat') ?? 'YYYY-MM-DD';
		this.description = moment(version.date, 'YYYY-MM-DD').format(dateFormat);
	}
}
