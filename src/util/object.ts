// export function findInObj<T = any, K = keyof T>(
// 	obj: { [key in keyof T]: T },
// 	key: string,
// 	value: any
// ): T | undefined {
// 	const keys = Object.keys(obj);
// 	const item = keys.map((x) => obj[x as keyof T][key] === value);
// }

// export function findInObj<T>(
// 	obj: { [key: string]: T },
// 	key: keyof T,
// 	value: T[keyof T]
// ): T | undefined {
// 	const values = Object.values(obj);
// 	return values.find((x) => x[key] === value);
// }

// export function findKey<T, K>(obj: T, key: keyof T[keyof T], value: T[keyof T]) {
// 	const v = findInObj(obj, key, value);
// 	if (!v) {
// 		return undefined;
// 	}

// 	const keys = Object.keys(obj) as (keyof T)[];
// 	return keys.find((x) => obj[x] === v);
// }

// export function findKey<O extends { [key: string]: {} }, K, T>(
// 	obj: O,
// 	key: K,
// 	value: any
// ): keyof O {
// return Object.keys(obj).find(x=>{
//   obj[x]
// })

// 	return Object.keys(obj)[0] as keyof O;
// }
