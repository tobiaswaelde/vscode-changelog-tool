import { ChangelogVersion } from './../../../types/changelog';
import * as vscode from 'vscode';
import { getCurrentDate } from '../../../util/changelog';
import { ChangelogFolderTreeItem } from '../items/folder-tree-item';

export async function addVersion(element: ChangelogFolderTreeItem) {
	const { changelog } = element;

	let label: string = '';
	let versionExists: boolean = false;

	do {
		// ask for new version string
		const res = await vscode.window.showInputBox({
			title: 'Enter new version:',
			value: label,
		});
		if (!res) {
			return;
		}

		label = res;

		// check if version already exists
		versionExists = changelog.versions.find((x) => x.label === res) !== undefined;
		if (versionExists) {
			vscode.window.showErrorMessage('Version already exists.');
		}
	} while (versionExists);

	// add version to changelog
	const newVersion: ChangelogVersion = {
		label: label,
		date: getCurrentDate(),
		items: [],
	};
	changelog.versions = [newVersion, ...changelog.versions];

	// update changelog file & refresh treeview
	const success = changelog.writeToFile();
	if (success) {
		vscode.commands.executeCommand('simpleChangelog.changelogs.refresh');
	}
}
