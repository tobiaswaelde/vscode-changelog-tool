import { ItemType } from '../types/changelog';

export function getCurrentDate(): string {
	const d = new Date();
	return d.toISOString().split('T')[0];
}

type ItemTypeData = {
	singular: string;
	plural: string;
	header: string;
	icon: string;
	color: string;
};
type ItemTypes = {
	[key in keyof ItemType as ItemType]: ItemTypeData;
};
export const itemTypes: ItemTypes = {
	addition: {
		singular: 'Addition',
		plural: 'Additions',
		header: 'Added',
		icon: 'add',
		color: 'charts.green',
	},
	change: {
		singular: 'Change',
		plural: 'Changes',
		header: 'Changed',
		icon: 'edit',
		color: 'charts.blue',
	},
	deprecation: {
		singular: 'Deprecation',
		plural: 'Deprecations',
		header: 'Deprecated',
		icon: 'discard',
		color: 'charts.purple',
	},
	fix: {
		singular: 'Fix',
		plural: 'Fixes',
		header: 'Fixed',
		icon: 'debug',
		color: 'charts.green',
	},
	removal: {
		singular: 'Removal',
		plural: 'Removals',
		header: 'Removed',
		icon: 'circle-slash',
		color: 'termminal.ansiRed',
	},
	securityChange: {
		singular: 'SecurityChange',
		plural: 'SecurityChanges',
		header: 'Security',
		icon: 'warning',
		color: 'charts.orange',
	},
	// none: {
	// 	singular: 'None',
	// 	plural: 'None',
	// 	header: '',
	// 	icon: '',
	// 	color: '',
	// },
};

function find<T, K = keyof T>(obj: T, key: any, value: string): keyof T | undefined {
	return undefined;
}

find(itemTypes, 'header', '123');
