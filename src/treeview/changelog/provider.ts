import * as vscode from 'vscode';
import * as fs from 'fs';
import { Changelog } from '../../classes/changelog';
import { ChangelogFolderTreeItem } from './items/folder-tree-item';
import { ChangelogItemTreeItem } from './items/item-tree-item';
import { ChangelogTypeTreeItem } from './items/type-tree-item';
import { ChangelogVersionTreeItem } from './items/version-tree-item';
import { findFiles, getWorkspacePaths } from '../../util/fs';
import { setContext } from '../../util/context';

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
		this.registerCommands(context);
	}

	getTreeItem(element: ChangelogTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: ChangelogTreeItem | undefined): vscode.ProviderResult<ChangelogTreeItem[]> {
		if (element === undefined) {
			if (this.filepaths.length === 1) {
				const changelog = new Changelog(this.filepaths[0]);
				return changelog.versions.map((v) => new ChangelogVersionTreeItem(changelog, v));
			}

			return this.filepaths.map((filepath) => new ChangelogFolderTreeItem(new Changelog(filepath)));
		}

		if (element instanceof ChangelogFolderTreeItem) {
			const { changelog } = element;
			return changelog.versions.map((v) => new ChangelogVersionTreeItem(changelog, v));
		}

		if (element instanceof ChangelogVersionTreeItem) {
			const { changelog, version } = element;
			return [
				new ChangelogTypeTreeItem(
					changelog,
					version,
					'addition',
					version.items.filter((x) => x.type === 'addition')
				),
				new ChangelogTypeTreeItem(
					changelog,
					version,
					'change',
					version.items.filter((x) => x.type === 'change')
				),
				new ChangelogTypeTreeItem(
					changelog,
					version,
					'deprecation',
					version.items.filter((x) => x.type === 'deprecation')
				),
				new ChangelogTypeTreeItem(
					changelog,
					version,
					'fix',
					version.items.filter((x) => x.type === 'fix')
				),
				new ChangelogTypeTreeItem(
					changelog,
					version,
					'removal',
					version.items.filter((x) => x.type === 'removal')
				),
				new ChangelogTypeTreeItem(
					changelog,
					version,
					'securityChange',
					version.items.filter((x) => x.type === 'securityChange')
				),
			];
		}

		if (element instanceof ChangelogTypeTreeItem) {
			const { changelog, version, type } = element;
			return element.items.map((item) => new ChangelogItemTreeItem(changelog, version, type, item));
		}
	}

	private registerCommands(context: vscode.ExtensionContext) {
		context.subscriptions.push(
			vscode.commands.registerCommand('simple-changelog.changelogs.refresh', this.refresh),
			vscode.commands.registerCommand('simple-changelog.changelogs.addVersion', this.addVersion),
			vscode.commands.registerCommand(
				'simple-changelog.changelogs.openChangelogFile',
				this.openChangelogFile
			),
			vscode.commands.registerCommand('simple-changelog.changelogs.addItem', this.addItem),
			vscode.commands.registerCommand('simple-changelog.changelogs.editItem', this.editItem),
			vscode.commands.registerCommand('simple-changelog.changelogs.deleteItem', this.deleteItem)
		);
	}

	public refresh(): void {
		console.log('ChangelogProvider:refresh()');

		const workspaces = getWorkspacePaths();
		if (!workspaces) {
			this.filepaths = [];
			this._onDidChangeTreeData.fire();
			setContext('initialized', false);
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
			setContext('initialized', false);
			return;
		}

		// set extension to 'initialized'
		setContext('initialized', true);

		this.filepaths = changelogPaths;
		this._onDidChangeTreeData.fire();
	}

	private async addVersion(item: ChangelogFolderTreeItem) {
		//TODO
		// ask for new version string
		// check if version already exists
		// get current date
		// add version to changelog
	}

	private async openChangelogFile(item: ChangelogFolderTreeItem) {
		//TODO
	}

	private async addItem(item: ChangelogTypeTreeItem) {
		//TODO
	}

	private async editItem(item: ChangelogItemTreeItem) {
		console.log('edit', item);

		const res = await vscode.window.showInputBox({
			prompt: 'Edit item content',
			title: 'Edit item',
			value: item.label?.toString(),
		});
		if (res) {
			const changelog = item.changelog;
			const vx = changelog.versions.findIndex((x) => x.label === item.version.label);
			if (vx === -1) {
				return;
			}

			const ix = changelog.versions[vx].items.findIndex(
				(x) => x.type === item.item.type && x.text === item.item.text
			);

			item.item.text = res;
			changelog.versions[vx].items[ix] = {
				type: changelog.versions[vx].items[ix].type,
				text: res,
			};

			changelog.writeToFile();
		}
	}

	private async deleteItem(item: ChangelogItemTreeItem) {
		//TODO
	}

	private async writeToFile(changelog: Changelog) {
		//TODO
		changelog.writeToFile();
	}
}
