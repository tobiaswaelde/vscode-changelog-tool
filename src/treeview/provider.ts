import { Changelog, ItemType, Version } from './../types/changelog';
import * as vscode from 'vscode';

function getTextFromItemType(type: ItemType): string {
	switch (type) {
		case 'addition':
			return 'Additions';
		case 'change':
			return 'Changes';
		case 'deprecation':
			return 'Deprecations';
		case 'fix':
			return 'Fixes';
		case 'removal':
			return 'Removals';
		case 'securityChange':
			return 'Security Changes';
		case 'none':
			return 'Other';
	}
}
function getIconFromItemType(type: ItemType) {
	switch (type) {
		case 'addition':
			return new vscode.ThemeIcon('add');
		case 'change':
			return new vscode.ThemeIcon('edit');
		case 'deprecation':
			return new vscode.ThemeIcon('discard');
		case 'fix':
			return new vscode.ThemeIcon('debug');
		case 'removal':
			return new vscode.ThemeIcon('remove');
		case 'securityChange':
			return new vscode.ThemeIcon('warning');
		case 'none':
			return undefined;
	}
}

export class ChangelogProvider implements vscode.TreeDataProvider<ChangelogTreeItem> {
	constructor(private changelog: Changelog) {
		console.log(changelog);
	}

	getTreeItem(element: ChangelogTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: ChangelogTreeItem | undefined): vscode.ProviderResult<ChangelogTreeItem[]> {
		if (element === undefined) {
			return this.changelog.versions.map((v) => new ChangelogVersionTreeItem(v));
		}

		if (element.contextValue === 'version') {
			const v = (element as ChangelogVersionTreeItem).version;
			return [
				new ChangelogTypeTreeItem('addition', v.additions),
				new ChangelogTypeTreeItem('change', v.changes),
				new ChangelogTypeTreeItem('deprecation', v.deprecations),
				new ChangelogTypeTreeItem('fix', v.fixes),
				new ChangelogTypeTreeItem('removal', v.removals),
				new ChangelogTypeTreeItem('securityChange', v.securityChanges),
			];
		}

		if (element.contextValue === 'type') {
			const e = element as ChangelogTypeTreeItem;
			return e.items.map((item) => new ChangelogItemTreeItem(e.type, item));
		}
	}
}

type ChangelogTreeItem = ChangelogVersionTreeItem | ChangelogTypeTreeItem | ChangelogItemTreeItem;

class ChangelogVersionTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'version';

	constructor(public version: Version) {
		super(version.label, vscode.TreeItemCollapsibleState.Collapsed);

		this.description = version.date;
	}
}

class ChangelogTypeTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'type';

	constructor(public type: ItemType, public items: string[]) {
		super(getTextFromItemType(type), vscode.TreeItemCollapsibleState.Collapsed);
		if (items.length > 0) {
			this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
		}
		this.tooltip = new vscode.MarkdownString(items.map((x) => `- ${x}`).join('\n'));
		this.description = `(${items.length})`;
		// this.iconPath = getIconFromItemType(type);
	}
}

class ChangelogItemTreeItem extends vscode.TreeItem {
	contextValue?: string | undefined = 'item';

	constructor(public type: ItemType, public item: string) {
		super(item, vscode.TreeItemCollapsibleState.None);
		this.tooltip = item;
		this.iconPath = getIconFromItemType(type);
	}
}
