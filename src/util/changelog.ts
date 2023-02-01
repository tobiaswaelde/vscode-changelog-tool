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
	[key in ItemType]: ItemTypeData;
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
		color: 'charts.red',
	},
	securityChange: {
		singular: 'Security Change',
		plural: 'Security Changes',
		header: 'Security',
		icon: 'warning',
		color: 'charts.orange',
	},
};
