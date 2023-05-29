// eslint-disable-next-line import/named
import { cache } from "react";

import { getHeartrate, Heartrate } from "~/pulsoid";
import { getCurrentSpotifyTrack, SpotifyTrack } from "~/spotify";

export interface Metadata {
	timeZone: {
		shortCode: string;
		name: string;
		now: number;
	};
	spotify: SpotifyTrack | null;
	alive: boolean;
	heartrate: Heartrate;
}

const dayInMs = 8.64e7;

export const getMetadata = cache(async (): Promise<Metadata> => {
	const [heartrate, spotify] = await Promise.all([getHeartrate(), getCurrentSpotifyTrack()]);
	const alive = heartrate.value !== 0 && Date.now() - heartrate.measuredAt <= dayInMs;

	return {
		timeZone: {
			shortCode: "MT",
			name: "Canada/Mountain",
			now: Date.now()
		},
		spotify,
		alive,
		heartrate
	};
});

export async function GET() {
	return new Response(JSON.stringify(await getMetadata()), {
		status: 200,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "public, s-maxage=1, stale-while-revalidate=4"
		}
	});
}
