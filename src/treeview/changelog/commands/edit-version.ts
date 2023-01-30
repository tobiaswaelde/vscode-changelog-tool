import * as vscode from 'vscode';
import { getCurrentDate } from '../../../util/changelog';
import { ChangelogVersionTreeItem } from './../items/version-tree-item';

export async function editVersion(element: ChangelogVersionTreeItem) {
	const { changelog } = element;

	// ask for new label
	const res = await vscode.window.showInputBox({
		title: 'Edit version label',
		value: element.version.label,
	});
	if (!res) {
		return;
	}

	// check if version already exists
	if (changelog.versions.find((x) => x.label === res)) {
		await vscode.window.showErrorMessage('Version already exists.');
		return;
	}

	// get version
	const version = changelog.versions.find((x) => x.label === element.version.label);
	if (!version) {
		return;
	}

	// update version
	version.label = res;
	version.date = getCurrentDate();

	// update changelog file & refresh treeview
	const success = changelog.writeToFile();
	if (success) {
		vscode.commands.executeCommand('simplechangelog.changelogs.refresh');
	}
}
