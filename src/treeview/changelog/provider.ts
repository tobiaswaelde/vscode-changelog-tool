import * as vscode from 'vscode';
import * as fs from 'fs';
import { Changelog } from '../../types/changelog';
import { ChangelogFolderTreeItem } from './items/folder-tree-item';
import { ChangelogItemTreeItem } from './items/item-tree-item';
import { ChangelogTypeTreeItem } from './items/type-tree-item';
import { ChangelogVersionTreeItem } from './items/version-tree-item';
import { findFiles, getWorkspacePaths } from '../../util/fs';

type ChangelogTreeItem =
	| ChangelogFolderTreeItem
	| ChangelogVersionTreeItem
	| ChangelogTypeTreeItem
	| ChangelogItemTreeItem;

export class ChangelogProvider implements vscode.TreeDataProvider<ChangelogTreeItem> {
	private filepaths: string[] = [];

	private _onDidChangeTreeData: vscode.EventEmitter<ChangelogTreeItem | undefined | null | void> =
		new vscode.EventEmitter<ChangelogTreeItem | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<ChangelogTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	constructor(context: vscode.ExtensionContext) {
		this.refresh();

		context.subscriptions.push(
			vscode.commands.registerCommand('simple-changelog.refresh', () => this.refresh())
		);
	}

	public refresh(): void {
		console.log('ChangelogProvider:refresh()');

		const workspaces = getWorkspacePaths();
		if (!workspaces) {
			this.filepaths = [];
			this._onDidChangeTreeData.fire();
			vscode.commands.executeCommand('setContext', 'simple-changelog.initialized', false);
			return;
		}

		// find all paths where a changelog.md is present
		const changelogPaths: string[] = workspaces.reduce(
			(acc: string[], workspace) =>
				acc.concat(...findFiles(workspace, /changelog.md/i, /node_modules/)),
			[]
		);

		// show welcome view is no changelogs found
		if (changelogPaths.length === 1) {
			this.filepaths = [];
			this._onDidChangeTreeData.fire();
			vscode.commands.executeCommand('setContext', 'simple-changelog.initialized', false);
			return;
		}

		// set extension to 'initialized'
		vscode.commands.executeCommand('setContext', 'simple-changelog.initialized', true);

		this.filepaths = changelogPaths;
		this._onDidChangeTreeData.fire();
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
