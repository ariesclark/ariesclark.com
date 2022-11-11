import useSWR from "swr";

import { localSiteUrl } from "~/config";
import { SpotifyTrack } from "~/connections/spotify";

const fetcher = (): Promise<SpotifyTrack | null> => {
	return fetch(`${localSiteUrl}api/spotify`).then(async (response) => {
		if (!response.ok) return null;
		return response.json();
	});
};

export function useSpotify(): SpotifyTrack | null {
	const { data: track } = useSWR("spotify", fetcher, { refreshInterval: 5000 });
	return track ?? null;
}
