import * as vscode from 'vscode';
import { getLastDirName } from '../../../util/fs';
import { Changelog } from '../../../classes/changelog';

export class ChangelogFolderTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'changelog-folder';

	constructor(public readonly changelog: Changelog) {
		const dirname = getLastDirName(changelog.filepath);
		super(dirname, vscode.TreeItemCollapsibleState.Collapsed);

		this.tooltip = changelog.filepath;
		this.iconPath = vscode.ThemeIcon.Folder;
	}
}
