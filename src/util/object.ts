export function findKey<T extends {}, K = keyof T[keyof T]>(
	obj: T,
	key: K,
	value: any
): keyof T | undefined {
	const v = Object.values(obj).find((x: any) => x[key] === value);
	const k = Object.keys(obj).find((x) => (obj as any)[x] === v);
	return k ? (k as keyof T) : undefined;
}
