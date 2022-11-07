import useSWR from "swr";

import { siteUrl } from "~/config";
import { SpotifyTrack } from "~/connections/spotify";

const spotifyUrl = new URL("/api/spotify", siteUrl);

const fetcher = (): Promise<SpotifyTrack | null> => {
	return fetch(spotifyUrl).then(async (response) => {
		if (!response.ok) return null;
		return response.json();
	});
};

export function useSpotify(): SpotifyTrack | null {
	const { data: track } = useSWR("spotify", fetcher, { refreshInterval: 5000 });
	return track ?? null;
}
