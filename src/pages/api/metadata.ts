import { getHeartrate } from "~/pulsoid";
import { kv } from "~/kv";
import { getCurrentSpotifyTrack, SpotifyTrack } from "~/spotify";

import type { NextApiRequest, NextApiResponse } from "next";

export interface Metadata {
	heartClickCount: number;
	timeZone: {
		shortCode: string;
		name: string;
	};
	spotify: SpotifyTrack | null;
	alive: boolean;
	heartrate: number;
}

export default async (req: NextApiRequest, res: NextApiResponse<Metadata>) => {
	const [heartrate, spotify, heartClickCount] = await Promise.all([
		getHeartrate().catch(() => 0),
		getCurrentSpotifyTrack().catch(() => null),
		kv
			.get("heartClickCount")
			.then(Number.parseInt)
			.catch(() => 0)
	]);

	const alive = heartrate !== 0;

	res
		.status(200)
		.setHeader("cache-control", "public, s-maxage=1, stale-while-revalidate=4")
		.json({
			heartClickCount,
			timeZone: {
				shortCode: "MST",
				name: "Canada/Mountain"
			},
			spotify,
			alive,
			heartrate
		});
};
