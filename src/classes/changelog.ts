import { ChangelogItem } from './../types/changelog';
import * as fs from 'fs';
import { ItemType, LineType, ChangelogVersion } from '../types/changelog';

export class Changelog {
	public versions: ChangelogVersion[] = [];

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
		const changelog = new Changelog('');

		const lines = data.split('\n').map((x) => x.trim());

		let lineType: LineType = 'none';
		let itemType: ItemType = 'none';

		for (const line of lines) {
			lineType = this.getLineType(line);

			if (lineType === 'version') {
				const v = this.getVersion(line);
				if (v) {
					changelog.versions.push(v);
				}
			} else if (lineType === 'type') {
				itemType = this.getItemType(line);
			} else if (lineType === 'item') {
				const text = line.substring(1).trim();
				const item: ChangelogItem = { type: itemType, text };
				changelog.versions[changelog.versions.length - 1].items.push(item);
			}
		}

		return changelog;
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
	private static getVersion(line: string): ChangelogVersion | undefined {
		const match = line.match(/## \[(?<version>.+)](\s*\-\s*(?<date>\d{4}-\d{2}-\d{2}))?/);
		if (match && match.groups) {
			return {
				label: match.groups['version'],
				date: match.groups['date'],
				items: [],
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

	private versionToString(v: ChangelogVersion) {
		let x = `\n\n## [${v.label}] - ${v.date}`;

		const additions = v.items.filter((x) => x.type === 'addition');
		const changes = v.items.filter((x) => x.type === 'change');
		const deprecations = v.items.filter((x) => x.type === 'deprecation');
		const fixes = v.items.filter((x) => x.type === 'fix');
		const removals = v.items.filter((x) => x.type === 'removal');
		const securityChanges = v.items.filter((x) => x.type === 'securityChange');

		if (additions.length > 0) {
			x += `\n**Added**\n`;
			x += additions.map((x) => `- ${x.text}`).join('\n');
			x += '\n';
		}
		if (changes.length > 0) {
			x += `\n**Changed**\n`;
			x += changes.map((x) => `- ${x.text}`).join('\n');
			x += '\n';
		}
		if (deprecations.length > 0) {
			x += `\n**Deprecated**\n`;
			x += deprecations.map((x) => `- ${x.text}`).join('\n');
			x += '\n';
		}
		if (fixes.length > 0) {
			x += `\n**Fixed**\n`;
			x += fixes.map((x) => `- ${x.text}`).join('\n');
			x += '\n';
		}
		if (removals.length > 0) {
			x += `\n**Removed**\n`;
			x += removals.map((x) => `- ${x.text}`).join('\n');
			x += '\n';
		}
		if (securityChanges.length > 0) {
			x += `\n**Security**\n`;
			x += securityChanges.map((x) => `- ${x.text}`).join('\n');
			x += '\n';
		}

		return x.trim();
	}
}
