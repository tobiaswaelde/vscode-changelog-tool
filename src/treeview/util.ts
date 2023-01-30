import { ThemeColor, ThemeIcon } from 'vscode';
import { getConfig } from '../config';
import { ItemType } from '../types/changelog';
import { itemTypes } from '../util/changelog';

export function getIconFromItemType(type: ItemType) {
	const colorEnabled = getConfig<boolean>('icons.color.enabled') ?? true;
	const color = colorEnabled ? new ThemeColor(itemTypes[type].color) : undefined;
	return new ThemeIcon(itemTypes[type].icon, color);
}

export function getIconColorFromItemType(type: ItemType) {
	return new ThemeColor(itemTypes[type].color);
}
