/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Spotify from "spotify-web-api-node";

import { spotifyClientId, spotifyClientSecret, spotifyRefreshToken } from "~/config";

const spotify = new Spotify({
	clientId: spotifyClientId,
	clientSecret: spotifyClientSecret,
	refreshToken: spotifyRefreshToken,
	redirectUri: "http://localhost:300/spotify"
});

export type SpotifyTrack = NonNullable<Awaited<ReturnType<typeof getCurrentSpotifyTrack>>>;

export async function getCurrentSpotifyTrack() {
	const {
		body: { access_token }
	} = await spotify.refreshAccessToken();
	spotify.setAccessToken(access_token);

	const { item, progress_ms, is_playing } = (await spotify.getMyCurrentPlaybackState()).body;
	if (!item || !("album" in item)) return null;

	return {
		name: item.name,
		image: item.album.images[0],
		artists: item.artists.map((artist) => artist.name),
		previewUrl: item.preview_url,
		url: item.external_urls.spotify,
		playing: is_playing,
		progress: progress_ms,
		length: item.duration_ms
	};
}
