import useSWR from "swr";

import { Metadata } from "~/pages/api/metadata";

export function useMetadata() {
	const { data, mutate } = useSWR<Metadata>(
		"metadata",
		() => fetch("/api/metadata").then((r) => r.json()),
		{
			refreshInterval: 1000,
			fallbackData: {
				timeZone: {
					shortCode: "MST",
					name: "Canada/Mountain",
					now: Date.now()
				},
				spotify: null,
				alive: true,
				heartrate: {
					measuredAt: 0,
					value: 0
				}
			}
		}
	);

	return { ...(data as Metadata), mutate };
}
