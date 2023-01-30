import { ThemeColor, ThemeIcon } from 'vscode';
import { ItemType } from '../types/changelog';
import { itemTypes } from '../util/changelog';

export function getIconFromItemType(type: ItemType) {
	// if (type === 'none') {
	// 	return undefined;
	// }
	const color = new ThemeColor(itemTypes[type].color);
	return new ThemeIcon(itemTypes[type].icon, color);
}

export function getIconColorFromItemType(type: ItemType) {
	// if (type === 'none') {
	// 	return undefined;
	// }
	return new ThemeColor(itemTypes[type].color);
}
