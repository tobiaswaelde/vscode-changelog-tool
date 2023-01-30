import * as vscode from 'vscode';

let _context: vscode.ExtensionContext;

type ContextValue = 'initialized';

export function setContextObject(context: vscode.ExtensionContext) {
	_context = context;
}

export function getContext(): vscode.ExtensionContext {
	return _context;
}

export function setContext(key: ContextValue, value: any) {
	vscode.commands.executeCommand('setContext', `simpleChangelog.${key}`, value);
}
