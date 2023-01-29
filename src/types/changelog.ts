export type LineType = 'none' | 'version' | 'type' | 'item';

export type ItemType =
	| 'addition'
	| 'change'
	| 'deprecation'
	| 'fix'
	| 'removal'
	| 'securityChange'
	| 'none';

export type ChangelogItem = {
	type: ItemType;
	text: string;
};

export type ChangelogVersion = {
	label: string;
	date: string;
	items: ChangelogItem[];
};
