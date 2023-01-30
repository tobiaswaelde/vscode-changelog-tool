import * as vscode from 'vscode';
import { ChangelogVersionTreeItem } from './../items/version-tree-item';

export async function deleteVersion(element: ChangelogVersionTreeItem) {
	const { changelog, version } = element;

	// delete version from changelog
	changelog.versions = changelog.versions.filter((x) => x.label !== version.label);

	// update changelog file & refresh treeview
	const success = changelog.writeToFile();
	if (success) {
		vscode.commands.executeCommand('simpleChangelog.changelogs.refresh');
	}
}
