export function findKey<T extends {}, K = keyof T[keyof T]>(
	obj: T,
	key: K,
	value: any
): keyof T | undefined {
	const v = Object.values(obj).find((x: any) => x[key] === value);
	const k = Object.keys(obj).find((x) => (obj as any)[x] === v);
	return k ? (k as keyof T) : undefined;
}

export function regexpFromString(value: string): RegExp {
	const parts = value.slice(1).split('/');

	const flags = parts[parts.length - 1];
	const pattern = parts.join('/').replace(`/${flags}`, '');

	return new RegExp(pattern, flags);
}
