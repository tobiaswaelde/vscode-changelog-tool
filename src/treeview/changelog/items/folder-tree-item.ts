import * as vscode from 'vscode';
import { v4 as uuid } from 'uuid';
import { getLastDirName } from '../../../util/fs';
import { Changelog } from '../../../classes/changelog';

export class ChangelogFolderTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'changelog-folder';

	public readonly id: string;

	constructor(public readonly changelog: Changelog) {
		const dirname = getLastDirName(changelog.filepath);
		super(dirname, vscode.TreeItemCollapsibleState.Collapsed);

		this.id = uuid();
		this.tooltip = changelog.filepath;
		this.iconPath = vscode.ThemeIcon.Folder;
	}
}
