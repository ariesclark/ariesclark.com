import useSWR from "swr";

import { Metadata } from "~/pages/api/metadata";

export function useMetadata() {
	const { data: metadata } = useSWR<Metadata>(
		"metadata",
		() => fetch("/api/metadata").then((r) => r.json()),
		{
			refreshInterval: 1000,
			fallbackData: {
				alive: true,
				heartrate: 0
			}
		}
	);

	return metadata as Metadata;
}
