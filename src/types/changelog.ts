export type LineType = 'none' | 'version' | 'type' | 'item';

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
