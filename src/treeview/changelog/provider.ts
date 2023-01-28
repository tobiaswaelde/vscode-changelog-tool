import * as vscode from 'vscode';
import * as fs from 'fs';
import { Changelog } from '../../types/changelog';
import { ChangelogFolderTreeItem } from './items/folder-tree-item';
import { ChangelogItemTreeItem } from './items/item-tree-item';
import { ChangelogTypeTreeItem } from './items/type-tree-item';
import { ChangelogVersionTreeItem } from './items/version-tree-item';

type ChangelogTreeItem =
	| ChangelogFolderTreeItem
	| ChangelogVersionTreeItem
	| ChangelogTypeTreeItem
	| ChangelogItemTreeItem;

export class ChangelogProvider implements vscode.TreeDataProvider<ChangelogTreeItem> {
	constructor(private filepaths: string[]) {
		console.log(filepaths);
	}

	public refresh(): void {
		console.log('refresh changelogs');
	}

	getTreeItem(element: ChangelogTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: ChangelogTreeItem | undefined): vscode.ProviderResult<ChangelogTreeItem[]> {
		if (element === undefined) {
			if (this.filepaths.length === 1) {
				const filepath = this.filepaths[0];
				const content = fs.readFileSync(filepath).toString();
				const changelog = Changelog.parse(content);

				return changelog.versions.map((v) => new ChangelogVersionTreeItem(v));
			}
			return this.filepaths.map((filepath) => new ChangelogFolderTreeItem(filepath));
		}

		if (element instanceof ChangelogFolderTreeItem) {
			const content = fs.readFileSync(element.filepath).toString();
			const changelog = Changelog.parse(content);

			return changelog.versions.map((v) => new ChangelogVersionTreeItem(v));
		}

		if (element instanceof ChangelogVersionTreeItem) {
			return [
				new ChangelogTypeTreeItem('addition', element.version.additions),
				new ChangelogTypeTreeItem('change', element.version.changes),
				new ChangelogTypeTreeItem('deprecation', element.version.deprecations),
				new ChangelogTypeTreeItem('fix', element.version.fixes),
				new ChangelogTypeTreeItem('removal', element.version.removals),
				new ChangelogTypeTreeItem('securityChange', element.version.securityChanges),
			];
		}

		if (element instanceof ChangelogTypeTreeItem) {
			return element.items.map((item) => new ChangelogItemTreeItem(element.type, item));
		}
	}
}
