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
					name: "Canada/Mountain"
				},
				spotify: null,
				alive: true,
				heartrate: 80
			}
		}
	);

	return { ...(data as Metadata), mutate };
}
