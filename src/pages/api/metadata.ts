import { getHeartrate, Heartrate } from "~/pulsoid";
import { getCurrentSpotifyTrack, SpotifyTrack } from "~/spotify";

import type { NextApiRequest, NextApiResponse } from "next";

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

export default async (req: NextApiRequest, res: NextApiResponse<Metadata>) => {
	const [heartrate, spotify] = await Promise.all([getHeartrate(), getCurrentSpotifyTrack()]);
	const alive = heartrate.value !== 0 && Date.now() - heartrate.measuredAt <= dayInMs;

	res
		.status(200)
		.setHeader("cache-control", "public, s-maxage=1, stale-while-revalidate=4")
		.json({
			timeZone: {
				shortCode: "MST",
				name: "Canada/Mountain",
				now: Date.now()
			},
			spotify,
			alive,
			heartrate
		});
};
