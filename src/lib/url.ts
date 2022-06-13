export function prettyUrl(url: string): string {
	return url.replace(/mailto:|(https:\/\/)/i, "");
}
