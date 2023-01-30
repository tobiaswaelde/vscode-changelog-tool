import * as vscode from 'vscode';

export function getConfiguration(): vscode.WorkspaceConfiguration {
	return vscode.workspace.getConfiguration('simpleChangelog');
}

export function getConfig<T>(key: string): T | undefined {
	let config = getConfiguration();
	return config.get<T>(key);
}

export function setConfig(key: string, value: any, global: boolean = false) {
	let config = getConfiguration();
	config.update(key, value, global);
}
