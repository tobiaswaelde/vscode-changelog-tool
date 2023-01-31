import { ThemeColor, ThemeIcon } from 'vscode';
import { getConfig } from '../config';
import { ItemType } from '../types/changelog';
import { itemTypes } from '../util/changelog';

export function getIconFromItemType(type: ItemType) {
	const colorEnabled = getConfig<boolean>('icons.color.enabled') ?? true;
	const color = colorEnabled ? getIconColorFromItemType(type) : undefined;
	const icon = getConfig<string>(`icons.${type}.icon`) ?? itemTypes[type].icon;

	return new ThemeIcon(icon, color);
}

export function getIconColorFromItemType(type: ItemType): ThemeColor | undefined {
	const color = getConfig<string>(`icons.${type}.color`) ?? itemTypes[type].color;
	return new ThemeColor(color);
}
