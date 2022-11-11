import { getGitHubMetadata } from "~/connections/github";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res
		.status(200)
		.setHeader("cache-control", "public, s-maxage=60, stale-while-revalidate=180")
		.json(await getGitHubMetadata());
};
