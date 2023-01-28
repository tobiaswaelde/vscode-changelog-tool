import * as vscode from 'vscode';

export function registerChangelogCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('simple-changelog.refresh', refresh));
}

function refresh() {
	console.log('refesh');
}
