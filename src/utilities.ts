const ONE_YEAR_IN_MILLISECONDS = 3.154e10;

export function getYearSince(date: Date, since: Date = new Date()): number {
	return Math.floor((since.getTime() - date.getTime()) / ONE_YEAR_IN_MILLISECONDS);
}

export function getMonthYear(date: Date): string {
	return date.toLocaleDateString("en-ca", {
		month: "short",
		year: "numeric"
	});
}

export function formatDateRange(from: Date, to: Date | null): string {
	const totalYears = to ? getYearSince(from, to) : 0;

	return `${getMonthYear(from)} to ${to ? getMonthYear(to) : "present"}${
		totalYears > 0 ? ` — ${totalYears} year${totalYears === 1 ? "" : "s"}` : ""
	}.`;
}
