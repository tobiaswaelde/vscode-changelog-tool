import * as vscode from 'vscode';
import { initialize } from './initialize';

export function registerCommands(context: vscode.ExtensionContext) {
	// context.subscriptions.push(
	// 	vscode.commands.registerCommand('simple-changelog.initialize', initialize)
	// );
}

export function registerUnititializedCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('simple-changelog.initialize', initialize)
	);
}
