import * as vscode from 'vscode';
import { getLastDirName } from '../../../util/fs';

export class ChangelogFolderTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'changelog-folder';

	constructor(public filepath: string) {
		const dirname = getLastDirName(filepath);

		super(dirname, vscode.TreeItemCollapsibleState.Collapsed);

		this.tooltip = filepath;
		this.iconPath = vscode.ThemeIcon.Folder;
	}
}
