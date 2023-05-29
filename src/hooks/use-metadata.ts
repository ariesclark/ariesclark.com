import useSWR from "swr";

import { Metadata } from "~/app/api/metadata/route";

export function useMetadata() {
	const { data, mutate } = useSWR<Metadata>(
		"metadata",
		() => fetch("/api/metadata").then((r) => r.json()),
		{
			refreshInterval: 1000
		}
	);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return { ...data!, mutate };
}
