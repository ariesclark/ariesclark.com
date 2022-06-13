export function omit<T, O extends Array<keyof T>>(value: T, keys: O): Omit<T, O[number]> {
	const newValue = Object.assign({}, value);

	for (const key of keys) delete newValue[key];
	return newValue;
}
