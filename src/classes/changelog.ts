import { ChangelogItem, ItemType, LineType, ChangelogVersion } from './../types/changelog';
import * as fs from 'fs';

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
			lineType = this.parseLineType(line);

			if (lineType === 'version') {
				const v = this.parseVersion(line);
				if (v) {
					changelog.versions.push(v);
				}
			} else if (lineType === 'type') {
				itemType = this.parseItemType(line);
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
		x += this.versions.map((v) => Changelog.stringifyVersion(v)).join('\n\n\n');
		return x;
	}

	private static parseLineType(line: string): LineType {
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
	private static parseVersion(line: string): ChangelogVersion | undefined {
		const match = line.match(/## \[(?<version>.+)](\s*\-\s*(?<date>\d{4}-\d{2}-\d{2}))?/);
		if (match && match.groups) {
			const { version, date } = match.groups;
			return {
				label: version,
				date: date,
				items: [],
			};
		}
	}
	private static parseItemType(line: string): ItemType {
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
	private static stringifyItemType(itemType: ItemType): string {
		switch (itemType) {
			case 'addition':
				return 'Added';
			case 'change':
				return 'Changed';
			case 'deprecation':
				return 'Deprecated';
			case 'fix':
				return 'Fixed';
			case 'removal':
				return 'Removed';
			case 'securityChange':
				return 'Security';
			case 'none':
				return 'Misc';
		}
	}
	private static stringifyVersion(version: ChangelogVersion): string {
		let res = `## [${version.label}]`;
		if (version.date) {
			res += ` - ${version.date}`;
		}
		res += '\n';

		const items = [
			this.stringifyItems(version, 'addition'),
			this.stringifyItems(version, 'change'),
			this.stringifyItems(version, 'deprecation'),
			this.stringifyItems(version, 'fix'),
			this.stringifyItems(version, 'removal'),
			this.stringifyItems(version, 'securityChange'),
		].filter((x): x is string => !!x);

		res += items.join('\n\n');
		return res.trim();
	}
	private static stringifyItems(version: ChangelogVersion, itemType: ItemType): string {
		const items = version.items.filter((x) => x.type === itemType);
		if (items.length === 0) {
			return '';
		}

		let res = `### ${Changelog.stringifyItemType(itemType)}\n`;
		res += items.map((x) => `- ${x.text}`).join('\n');
		return res.trim();
	}
}
