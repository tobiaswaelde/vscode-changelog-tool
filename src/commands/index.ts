import * as vscode from 'vscode';
import { initialize } from './initialize';

export function registerCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('simplechangelog.initialize', initialize)
	);
}
