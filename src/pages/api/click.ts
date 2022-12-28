import { getHeartClickCount, kv } from "~/kv";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const heartClickCount = await getHeartClickCount();
	await kv.set("heartClickCount", (heartClickCount + 1).toString());

	res.status(204).end();
};
