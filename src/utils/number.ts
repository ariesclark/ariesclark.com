export function toOptionalFixed(value: number, digits: number): number {
	return Number.parseFloat(value.toFixed(digits));
}

/**
 * A random number between min and max.
 *
 * @param min The minimum value, inclusive.
 * @param max The maximum value, inclusive.
 */
export function random(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
