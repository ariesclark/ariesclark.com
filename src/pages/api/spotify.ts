import { getCurrentSpotifyTrack } from "~/connections/spotify";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json(await getCurrentSpotifyTrack());
};
