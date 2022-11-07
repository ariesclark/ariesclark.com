import { getCurrentSpotifyTrack } from "~/connections/spotify";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res
		.status(200)
		.setHeader("cache-control", "public, s-maxage=4, stale-while-revalidate=20")
		.json(await getCurrentSpotifyTrack());
};
