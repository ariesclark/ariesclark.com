import { useEffect, useState } from "react";

import { useMetadata } from "./use-metadata";

function toTimeZone(date: Date, timeZone: string) {
	return new Date(date.toLocaleString("en-US", { timeZone }));
}

export function useDate() {
	const { timeZone } = useMetadata();

	const [localDate, setLocalDate] = useState(new Date());
	const [date, setDate] = useState(toTimeZone(localDate, timeZone.name));

	// Time difference in hours between timezones.
	const timeDifference = (Math.floor((localDate.getTime() - date.getTime()) / 1000) * 1000) / 3.6e6;

	useEffect(() => {
		const handle = setInterval(() => {
			const localDate = new Date();

			setLocalDate(localDate);
			setDate(toTimeZone(localDate, timeZone.name));
		}, 1);

		return () => clearInterval(handle);
	}, [timeZone]);

	return { date, localDate, timeZone, timeDifference };
}
