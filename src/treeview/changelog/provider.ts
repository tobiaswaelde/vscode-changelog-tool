import * as vscode from 'vscode';
import { Changelog } from '../../classes/changelog';
import { ChangelogFolderTreeItem } from './items/folder-tree-item';
import { ChangelogItemTreeItem } from './items/item-tree-item';
import { ChangelogTypeTreeItem } from './items/type-tree-item';
import { ChangelogVersionTreeItem } from './items/version-tree-item';
import { findFiles, getWorkspacePaths } from '../../util/fs';
import { setContext } from '../../util/context';
import { editItem } from './commands/edit-item';
import { addVersion } from './commands/add-version';
import { openChangelogFile } from './commands/open-changelog-file';
import { addItem } from './commands/add-item';
import { deleteItem } from './commands/delete-item';
import { editVersion } from './commands/edit-version';
import { deleteVersion } from './commands/delete-version';
import { getConfig } from '../../config';
import { regexpFromString } from '../../util/object';

type ChangelogTreeItem =
	| ChangelogFolderTreeItem
	| ChangelogVersionTreeItem
	| ChangelogTypeTreeItem
	| ChangelogItemTreeItem;

type OnDidChangeEventData = ChangelogTreeItem | undefined | null | void;

export class ChangelogProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
	private filepaths: string[] = [];

	private _onDidChangeTreeData: vscode.EventEmitter<OnDidChangeEventData> =
		new vscode.EventEmitter<OnDidChangeEventData>();
	readonly onDidChangeTreeData: vscode.Event<OnDidChangeEventData> =
		this._onDidChangeTreeData.event;

	constructor(context: vscode.ExtensionContext) {
		this.refresh();
		this.registerCommands(context);
	}

	getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
		if (element === undefined) {
			return this.filepaths.map((filepath) => new ChangelogFolderTreeItem(new Changelog(filepath)));
		}

		if (element instanceof ChangelogFolderTreeItem) {
			const { changelog } = element;

			if (changelog.versions.length === 0) {
				const item = new vscode.TreeItem('', vscode.TreeItemCollapsibleState.None);
				item.description = 'No versions yet.';
				return [item];
			}

			return changelog.versions.map((v) => new ChangelogVersionTreeItem(changelog, v));
		}

		if (element instanceof ChangelogVersionTreeItem) {
			const { changelog, version } = element;

			const additions = version.items.filter((x) => x.type === 'addition');
			const changes = version.items.filter((x) => x.type === 'change');
			const deprecations = version.items.filter((x) => x.type === 'deprecation');
			const fixes = version.items.filter((x) => x.type === 'fix');
			const removals = version.items.filter((x) => x.type === 'removal');
			const securityChanges = version.items.filter((x) => x.type === 'securityChange');

			return [
				new ChangelogTypeTreeItem(changelog, version, 'addition', additions),
				new ChangelogTypeTreeItem(changelog, version, 'change', changes),
				new ChangelogTypeTreeItem(changelog, version, 'deprecation', deprecations),
				new ChangelogTypeTreeItem(changelog, version, 'fix', fixes),
				new ChangelogTypeTreeItem(changelog, version, 'removal', removals),
				new ChangelogTypeTreeItem(changelog, version, 'securityChange', securityChanges),
			];
		}

		if (element instanceof ChangelogTypeTreeItem) {
			const { changelog, version, type } = element;
			return element.items.map((item) => new ChangelogItemTreeItem(changelog, version, type, item));
		}
	}

	public registerCommands(context: vscode.ExtensionContext) {
		context.subscriptions.push(
			vscode.commands.registerCommand(
				'simpleChangelog.changelogs.openChangelogFile',
				openChangelogFile
			),
			vscode.commands.registerCommand('simpleChangelog.changelogs.addVersion', addVersion),
			vscode.commands.registerCommand('simpleChangelog.changelogs.editVersion', editVersion),
			vscode.commands.registerCommand('simpleChangelog.changelogs.deleteVersion', deleteVersion),
			vscode.commands.registerCommand('simpleChangelog.changelogs.addItem', addItem),
			vscode.commands.registerCommand('simpleChangelog.changelogs.editItem', editItem),
			vscode.commands.registerCommand('simpleChangelog.changelogs.deleteItem', deleteItem)
		);
	}

	public refresh(): void {
		const workspaces = getWorkspacePaths();
		if (!workspaces) {
			this.filepaths = [];
			this._onDidChangeTreeData.fire();
			setContext('initialized', false);
			return;
		}

		// find all paths where a changelog.md is present
		const includeRegex = regexpFromString(getConfig('searchIncludeRegex') ?? '/changelog.md/i');
		const excludeRegex = regexpFromString(getConfig('searchExcludeRegex') ?? '/node_modules/');
		const changelogPaths: string[] = workspaces.reduce(
			(acc: string[], workspace) => acc.concat(...findFiles(workspace, includeRegex, excludeRegex)),
			[]
		);
		console.log(changelogPaths);

		// show welcome view is no changelogs found
		if (changelogPaths.length === 0) {
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
}
