/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TwitterApi, TTweetv2UserField } from "twitter-api-v2";

import { twitterBearerToken } from "~/config";

export interface TwitterUser {
	url: string;
	id: string;
	profile_image_url: string;
	name: string;
	username: string;
}

export interface Tweet {
	id: string;
	url: string;
	text: string;
	authorId: string;
	author: TwitterUser;
	retweet: boolean;
}

export const twitter = new TwitterApi(twitterBearerToken);

const UserFields: Array<TTweetv2UserField> = ["profile_image_url", "id", "name", "username"];

export async function getTwitterTimeline() {
	const user = (
		await twitter.readOnly.v2.userByUsername("ariesrclark", {
			"user.fields": UserFields
		})
	).data as TwitterUser;
	user.url = `https://twitter.com/${user.username}`;

	const {
		data: { data: timeline }
	} = await twitter.readOnly.v2.userTimeline(user.id!, {
		"tweet.fields": [
			"attachments",
			"text",
			"public_metrics",
			"created_at",
			"entities",
			"id",
			"referenced_tweets",
			"author_id"
		],
		expansions: ["author_id", "referenced_tweets.id", "referenced_tweets.id.author_id"],
		"media.fields": ["url", "type", "width", "height", "alt_text", "preview_image_url"]
	});

	const tweets: Array<Partial<Tweet>> = timeline.map((tweet) => {
		const retweet = tweet.text.startsWith("RT");
		const retweetAuthorEntity = tweet.entities!.mentions.find((mention) => mention.start === 3)!;
		const authorId = retweet ? retweetAuthorEntity.id! : user.id;

		const text = retweet ? tweet.text.slice(retweetAuthorEntity.end + 2) : tweet.text;

		return { id: tweet.id, text, retweet, authorId };
	});

	const users: Array<TwitterUser> = (
		await twitter.readOnly.v2.users(
			tweets.map((tweet) => tweet.authorId!),
			{ "user.fields": UserFields }
		)
	).data.map((user) => ({
		id: user.id,
		url: `https://twitter.com/${user.username}`,
		profile_image_url: user.profile_image_url!,
		name: user.name,
		username: user.username
	}));

	return {
		user,
		tweets: tweets.map((tweet) => {
			const author = users.find((user) => user.id === tweet.authorId)!;
			return { ...tweet, author, url: `https://twitter.com/${author.username}/status/${tweet.id}` };
		}) as Array<Tweet>
	};
}
