/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/named
import { cache } from "react";
import Spotify from "spotify-web-api-node";

export const spotifyClientId = process.env["SPOTIFY_CLIENT_ID"] as string;
export const spotifyClientSecret = process.env["SPOTIFY_CLIENT_SECRET"] as string;
export const spotifyRefreshToken = process.env["SPOTIFY_REFRESH_TOKEN"] as string;

const spotify = new Spotify({
	clientId: spotifyClientId,
	clientSecret: spotifyClientSecret,
	refreshToken: spotifyRefreshToken,
	redirectUri: "http://localhost:3000/spotify"
});

export type SpotifyTrack = NonNullable<Awaited<ReturnType<typeof getCurrentSpotifyTrack>>>;

export const getCurrentSpotifyTrack = cache(async () => {
	const {
		body: { access_token }
	} = await spotify.refreshAccessToken();
	spotify.setAccessToken(access_token);

	const { item, progress_ms, is_playing } = (await spotify.getMyCurrentPlaybackState()).body;
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
});
