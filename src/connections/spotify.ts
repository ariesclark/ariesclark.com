/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { randomBytes } from "crypto";

import Spotify from "spotify-web-api-node";

import {
	spotifyAccessToken,
	spotifyClientId,
	spotifyClientSecret,
	spotifyRefreshToken
} from "~/config";

const spotify = new Spotify({
	clientId: spotifyClientId,
	clientSecret: spotifyClientSecret,
	accessToken: spotifyAccessToken,
	refreshToken: spotifyRefreshToken,
	redirectUri: "http://localhost:300/spotify"
});

/* console.log(
	spotify.createAuthorizeURL(
		["user-read-currently-playing", "user-read-playback-state"],
		randomBytes(8).toString("base64")
	)
); */

/* void spotify
	.authorizationCodeGrant(
		"AQBAILoKB5daX322R0hw3ax2OwLtEuz4u5ouVt13E9fLOgrTuIy0EO3xp1JfxpMUO5Crt5jzQ_LPd0a417NtmGA2VfXqooaj4PzpSqAxvkk1k8XpFfcoKXzMqYiA16uxOhUnCx7KKZ7oXuLwDnXGEZwZNYLutiah_pHQOH59M8O8_fcCIv1_yM0SOkiWgeaeEIb5POHB6aMiQdJYkThFpWT7rCLxnxPWAAspaL56psQWq9SB3F3C"
	)
	.then(console.log); */

export async function getCurrentSpotifyTrack() {
	const {
		body: { access_token }
	} = await spotify.refreshAccessToken();
	spotify.setAccessToken(access_token);

	const { item, progress_ms } = (await spotify.getMyCurrentPlaybackState()).body;
	if (!item || !("album" in item)) return null;

	return {
		name: item.name,
		image: item.album.images[0],
		artists: item.artists.map((artist) => artist.name),
		previewUrl: item.preview_url,
		url: item.external_urls.spotify,
		progress: progress_ms,
		length: item.duration_ms
	};
}
