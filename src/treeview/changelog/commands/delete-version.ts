import * as vscode from 'vscode';
import { ChangelogVersionTreeItem } from './../items/version-tree-item';

export async function deleteVersion(element: ChangelogVersionTreeItem) {
	const { changelog, version } = element;

	// ask the user if he wants to delete the version
	const res = await vscode.window.showErrorMessage(
		`Do you really want to delete the selected version (${version.label}) add all of its items?`,
		...['Yes', 'No']
	);
	if (res !== 'Yes') {
		return;
	}

	// delete version from changelog
	changelog.versions = changelog.versions.filter((x) => x.label !== version.label);

	// update changelog file & refresh treeview
	const success = changelog.writeToFile();
	if (success) {
		vscode.commands.executeCommand('simplechangelog.changelogs.refresh');
	}
}
