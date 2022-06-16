export function classes(values: Array<string | boolean>): string {
	return values
		.filter((v) => typeof v === "string")
		.join(" ")
		.trim();
}
