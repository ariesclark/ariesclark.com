import { getHeartrate } from "~/pulsoid";
import { getCurrentSpotifyTrack, SpotifyTrack } from "~/spotify";

import type { NextApiRequest, NextApiResponse } from "next";

export interface Metadata {
	timeZone: {
		shortCode: string;
		name: string;
	};
	spotify: SpotifyTrack | null;
	alive: boolean;
	heartrate: number;
}

export default async (req: NextApiRequest, res: NextApiResponse<Metadata>) => {
	const [heartrate, spotify] = await Promise.all([
		getHeartrate().catch(() => 0),
		getCurrentSpotifyTrack().catch(() => null)
	]);

	const alive = heartrate !== 0;

	res
		.status(200)
		.setHeader("cache-control", "public, s-maxage=1, stale-while-revalidate=4")
		.json({
			timeZone: {
				shortCode: "MST",
				name: "Canada/Mountain"
			},
			spotify,
			alive,
			heartrate
		});
};
