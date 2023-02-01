import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

/**
 * recursively find files which match the filter
 * @param {RegExp} filter The filter the files should match
 * @param {RegExp} exclude The filter which files/directories should be excluded
 */
export const findFiles = (rootPath: string, filter?: RegExp, exclude?: RegExp): string[] => {
	if (!fs.existsSync(rootPath)) {
		console.log('root path does not exist');
		return [];
	}

	const matchingPaths: string[] = [];

	const files = fs.readdirSync(rootPath);
	for (const filename of files) {
		const filepath = path.join(rootPath, filename);

		if (exclude && filename.match(exclude)) {
			break;
		}

		const stat = fs.lstatSync(filepath);
		if (stat.isDirectory()) {
			matchingPaths.push(...findFiles(filepath, filter, exclude));
		} else if (stat.isFile()) {
			if (!filter) {
				matchingPaths.push(filepath);
				break;
			}

			if (filename.match(filter)) {
				matchingPaths.push(filepath);
			}
		}
	}

	return matchingPaths;
};

export function getLastDirName(filepath: string) {
	const dirname = path.dirname(filepath);
	return path.basename(dirname);
}

export function getWorkspacePaths(): string[] | undefined {
	return vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
		? vscode.workspace.workspaceFolders.map((x) => x.uri.fsPath)
		: undefined;
}
