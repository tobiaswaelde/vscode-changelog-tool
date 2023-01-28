import { ThemeColor, ThemeIcon } from 'vscode';
import { ItemType } from '../types/changelog';

export function getTextFromItemType(type: ItemType): string {
	switch (type) {
		case 'addition':
			return 'Additions';
		case 'change':
			return 'Changes';
		case 'deprecation':
			return 'Deprecations';
		case 'fix':
			return 'Fixes';
		case 'removal':
			return 'Removals';
		case 'securityChange':
			return 'Security Changes';
		case 'none':
			return 'Other';
	}
}

export function getIconFromItemType(type: ItemType) {
	switch (type) {
		case 'addition':
			return new ThemeIcon('add', getIconColorFromItemType(type));
		case 'change':
			return new ThemeIcon('edit', getIconColorFromItemType(type));
		case 'deprecation':
			return new ThemeIcon('discard', getIconColorFromItemType(type));
		case 'fix':
			return new ThemeIcon('debug', getIconColorFromItemType(type));
		case 'removal':
			return new ThemeIcon('circle-slash', getIconColorFromItemType(type));
		case 'securityChange':
			return new ThemeIcon('warning', getIconColorFromItemType(type));
		case 'none':
			return undefined;
	}
}

export function getIconColorFromItemType(type: ItemType) {
	switch (type) {
		case 'addition':
			return new ThemeColor('charts.green');
		case 'change':
			return new ThemeColor('charts.blue');
		case 'deprecation':
			return new ThemeColor('charts.purple');
		case 'fix':
			return new ThemeColor('charts.green');
		case 'removal':
			return new ThemeColor('terminal.ansiRed');
		case 'securityChange':
			return new ThemeColor('charts.orange');
		case 'none':
			return undefined;
	}
}
