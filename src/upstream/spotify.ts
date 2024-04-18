import "server-only";

import { unstable_cache } from "next/cache";
import Spotify from "spotify-web-api-node";

import {
	spotifyClientId,
	spotifyClientSecret,
	spotifyRefreshToken
} from "~/environment";

const spotify = new Spotify({
	clientId: spotifyClientId,
	clientSecret: spotifyClientSecret,
	refreshToken: spotifyRefreshToken
	// redirectUri: "http://localhost:3000/spotify"
});

export type Playback = NonNullable<
	Awaited<ReturnType<typeof getCurrentPlayback>>
>;

let accessToken: string | null = null;

const refreshAccessToken = unstable_cache(
	async () => {
		console.log("refreshAccessToken");

		const {
			body: { access_token }
		} = await spotify.refreshAccessToken();

		return access_token;
	},
	[],
	{ revalidate: 60 }
);

export const getCurrentPlayback = unstable_cache(
	async () => {
		console.log("getCurrentPlayback");

		// eslint-disable-next-line require-atomic-updates
		if (!accessToken) accessToken = await refreshAccessToken();
		spotify.setAccessToken(accessToken);

		const { body: value } = await spotify
			.getMyCurrentPlaybackState()
			.catch(async (reason) => {
				if (!(reason instanceof Error)) throw reason;

				if (!("statusCode" in reason) || reason.statusCode !== 401)
					throw reason;

				accessToken = await refreshAccessToken();
				spotify.setAccessToken(accessToken);

				return spotify.getMyCurrentPlaybackState();
			});

		const { item, progress_ms, is_playing } = value;
		if (!item || !("album" in item)) return null;

		return {
			name: item.name,
			image: item.album.images[0],
			artists: item.artists.map((artist) => ({
				id: artist.id,
				name: artist.name,
				url: artist.external_urls.spotify
			})),
			previewUrl: item.preview_url,
			url: item.external_urls.spotify,
			playing: is_playing,
			progress: progress_ms,
			length: item.duration_ms
		};
	},
	[],
	{ revalidate: 5 }
);
