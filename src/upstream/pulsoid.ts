import "server-only";
import { unstable_cache } from "next/cache";

import { pulsoidAccessToken } from "~/environment";

export interface Heartrate {
	value: number;
	at: number;
}

export const getHeartrate = unstable_cache(
	async (): Promise<Heartrate | null> => {
		return fetch("https://dev.pulsoid.net/api/v1/data/heart_rate/latest", {
			headers: {
				Authorization: `Bearer ${pulsoidAccessToken}`
			}
		}).then(async (response) => {
			if (!response.ok) return null;

			const json = (await response.json()) as {
				measured_at: number;
				data: {
					heart_rate: number;
				};
			};

			return {
				value: json.data.heart_rate,
				at: json.measured_at
			};
		});
	},
	[],
	{ revalidate: 5 }
);
