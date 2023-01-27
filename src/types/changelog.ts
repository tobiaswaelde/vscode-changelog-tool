type LineType = 'none' | 'version' | 'type' | 'item';

export type ItemType =
	| 'addition'
	| 'change'
	| 'deprecation'
	| 'fix'
	| 'removal'
	| 'securityChange'
	| 'none';

export type Version = {
	label: string;
	date: string;

	additions: string[];
	changes: string[];
	deprecations: string[];
	fixes: string[];
	removals: string[];
	securityChanges: string[];
};

export class Changelog {
	public readonly versions: Version[] = [];

	public static parse(data: string): Changelog {
		const c = new Changelog();

		const lines = data.split('\n').map((x) => x.trim());

		let lineType: LineType = 'none';
		let itemType: ItemType = 'none';

		for (const line of lines) {
			lineType = this.getLineType(line);

			if (lineType === 'version') {
				const v = this.getVersion(line);
				if (v) c.versions.push(v);
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

		// for (const v of c.versions) {
		// 	if (v.additions!.length === 0) delete v.additions;
		// 	if (v.changes!.length === 0) delete v.changes;
		// 	if (v.deprecations!.length === 0) delete v.deprecations;
		// 	if (v.fixes!.length === 0) delete v.fixes;
		// 	if (v.removals!.length === 0) delete v.removals;
		// 	if (v.securityChanges!.length === 0) delete v.securityChanges;
		// }

		return c;
	}
	public toString() {
		let x = '# Changelog\n\n';
		x += this.versions.map((v) => this.versionToString(v)).join('\n\n');
		return x;
	}

	private static getLineType(line: string): LineType {
		if (line.startsWith('## ')) return 'version';
		if (line.startsWith('**') && line.endsWith('**')) return 'type';
		if (line.startsWith('- ')) return 'item';
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
		const t = line.replace(/\*\*/g, '').trim();

		if (t === 'Added') return 'addition';
		if (t === 'Changed') return 'change';
		if (t === 'Deprecated') return 'deprecation';
		if (t === 'Fixed') return 'fix';
		if (t === 'Removed') return 'removal';
		if (t === 'Security') return 'securityChange';
		return 'none';
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
