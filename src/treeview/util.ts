import { ThemeColor, ThemeIcon } from 'vscode';
import { getConfig } from '../config';
import { ItemType } from '../types/changelog';
import { getItemTypes } from '../util/changelog';

export function getIconFromItemType(type: ItemType) {
	const itemTypes = getItemTypes();
	const colorEnabled = getConfig<boolean>('icons.color.enabled') ?? true;
	const color = colorEnabled ? new ThemeColor(itemTypes[type].color) : undefined;
	return new ThemeIcon(itemTypes[type].icon, color);
}

export function getIconColorFromItemType(type: ItemType) {
	const itemTypes = getItemTypes();
	return new ThemeColor(itemTypes[type].color);
}
