import { ChangelogVersion } from './../../../types/changelog';
import * as vscode from 'vscode';
import { getCurrentDate } from '../../../util/changelog';
import { ChangelogFolderTreeItem } from '../items/folder-tree-item';

export async function addVersion(element: ChangelogFolderTreeItem) {
	const { changelog } = element;

	// ask for new version string
	const res = await vscode.window.showInputBox({
		title: 'Enter new version:',
	});
	if (!res) {
		return;
	}

	// check if version already exists
	if (changelog.versions.find((x) => x.label === res)) {
		vscode.window.showErrorMessage('Version already exists.');
		return;
	}

	// add version to changelog
	const newVersion: ChangelogVersion = {
		label: res,
		date: getCurrentDate(),
		items: [],
	};
	changelog.versions = [newVersion, ...changelog.versions];

	// update changelog file & refresh treeview
	const success = changelog.writeToFile();
	if (success) {
		vscode.commands.executeCommand('simplechangelog.changelogs.refresh');
	}
}
