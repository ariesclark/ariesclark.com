import { getHeartrate } from "~/pulsoid";

import type { NextApiRequest, NextApiResponse } from "next";

export interface Metadata {
	alive: boolean;
	heartrate: number;
}

export default async (req: NextApiRequest, res: NextApiResponse<Metadata>) => {
	const [heartrate] = await Promise.all([getHeartrate()]);
	const alive = heartrate !== 0;

	res.status(200).setHeader("cache-control", "public, s-maxage=1, stale-while-revalidate=4").json({
		alive,
		heartrate
	});
};
