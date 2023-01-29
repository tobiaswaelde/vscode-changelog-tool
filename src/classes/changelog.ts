import * as fs from 'fs';
import { ItemType, LineType, Version } from '../types/changelog';

export class Changelog {
	public versions: Version[] = [];

	constructor(public readonly filepath: string) {
		if (filepath && filepath !== '') {
			this.readFromFile();
		}
	}

	public readFromFile(): boolean {
		if (!this.filepath || this.filepath === '') {
			return false;
		}

		const content = fs.readFileSync(this.filepath).toString();
		const changelog = Changelog.parse(content);
		this.versions = changelog.versions;
		return true;
	}
	public writeToFile(): boolean {
		console.log('writeToFile', this);
		if (!this.filepath) {
			return false;
		}

		fs.writeFileSync(this.filepath, this.toString());
		return true;
	}

	public static parse(data: string): Changelog {
		const c = new Changelog('');

		const lines = data.split('\n').map((x) => x.trim());

		let lineType: LineType = 'none';
		let itemType: ItemType = 'none';

		for (const line of lines) {
			lineType = this.getLineType(line);

			if (lineType === 'version') {
				const v = this.getVersion(line);
				if (v) {
					c.versions.push(v);
				}
			} else if (lineType === 'type') {
				itemType = this.getItemType(line);
			} else if (lineType === 'item') {
				const item = line.substring(1).trim();
				switch (itemType) {
					case 'addition':
						c.versions[c.versions.length - 1].additions!.push(item);
						break;
					case 'change':
						c.versions[c.versions.length - 1].changes!.push(item);
						break;
					case 'deprecation':
						c.versions[c.versions.length - 1].deprecations!.push(item);
						break;
					case 'fix':
						c.versions[c.versions.length - 1].fixes!.push(item);
						break;
					case 'removal':
						c.versions[c.versions.length - 1].removals!.push(item);
						break;
					case 'securityChange':
						c.versions[c.versions.length - 1].securityChanges!.push(item);
						break;
				}
			}
		}

		return c;
	}
	public toString() {
		let x = '# Changelog\n\n';
		x += this.versions.map((v) => this.versionToString(v)).join('\n\n');
		return x;
	}

	private static getLineType(line: string): LineType {
		if (line.startsWith('## ')) {
			return 'version';
		}
		if ((line.startsWith('**') && line.endsWith('**')) || line.startsWith('### ')) {
			return 'type';
		}
		if (line.startsWith('- ')) {
			return 'item';
		}
		return 'none';
	}
	private static getVersion(line: string): Version | undefined {
		const match = line.match(/## \[(?<version>\d+.\d+.\d+)] - (?<date>\d{4}-\d{2}-\d{2})/);
		if (match && match.groups) {
			return {
				label: match.groups['version'],
				date: match.groups['date'],
				additions: [],
				changes: [],
				deprecations: [],
				fixes: [],
				removals: [],
				securityChanges: [],
			};
		}
	}
	private static getItemType(line: string): ItemType {
		const type = line.replace(/\*\*/g, '').replace(/\#{3}/g, '').trim();

		switch (type) {
			case 'Added':
				return 'addition';
			case 'Changed':
				return 'change';
			case 'Deprecated':
				return 'deprecation';
			case 'Fixed':
				return 'fix';
			case 'Removed':
				return 'removal';
			case 'Security':
				return 'securityChange';

			default:
				return 'none';
		}
	}

	private versionToString(v: Version) {
		let x = `\n\n## [${v.label}] - ${v.date}`;
		if (v.additions.length > 0) {
			x += `\n**Added**\n`;
			x += v.additions.map((x) => `- ${x}`).join('\n');
			x += '\n';
		}
		if (v.changes.length > 0) {
			x += `\n**Changed**\n`;
			x += v.changes.map((x) => `- ${x}`).join('\n');
			x += '\n';
		}
		if (v.deprecations.length > 0) {
			x += `\n**Deprecated**\n`;
			x += v.deprecations.map((x) => `- ${x}`).join('\n');
			x += '\n';
		}
		if (v.fixes.length > 0) {
			x += `\n**Fixed**\n`;
			x += v.fixes.map((x) => `- ${x}`).join('\n');
			x += '\n';
		}
		if (v.removals.length > 0) {
			x += `\n**Removed**\n`;
			x += v.removals.map((x) => `- ${x}`).join('\n');
			x += '\n';
		}
		if (v.securityChanges.length > 0) {
			x += `\n**Security**\n`;
			x += v.securityChanges.map((x) => `- ${x}`).join('\n');
			x += '\n';
		}

		return x.trim();
	}
}
