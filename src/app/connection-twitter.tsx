import { ShareIcon } from "@heroicons/react/24/solid";
import { Twitter } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";

import { InlineLink } from "~/components/inline-link";
import { getTwitterTimeline, Tweet, TwitterUser } from "~/connections/twitter";

async function Tweet(props: { tweet: Tweet; user: TwitterUser }) {
	const { tweet, user } = props;

	return (
		<div className="flex flex-col gap-4 bg-black-200 shadow-highlight rounded-lg p-4 relative">
			{tweet.retweet && (
				<div className="flex gap-2 items-center">
					<ShareIcon className="h-4 w-4" />
					<span className="text-sm font-bold text-white-400">
						<InlineLink href={user.url} target="_blank">
							{user.name}
						</InlineLink>{" "}
						retweeted
					</span>
				</div>
			)}
			<div className="flex gap-4">
				<Link
					className="rounded-lg h-10 w-10 shrink-0 overflow-hidden"
					href={tweet.author.url}
					target="_blank"
				>
					<Image
						alt={`Twitter profile picture for @${tweet.author.username}`}
						height={48}
						src={tweet.author.profile_image_url}
						width={48}
					/>
				</Link>
				<div className="flex flex-col gap-2">
					<Link className="flex gap-2 items-center" href={tweet.author.url} target="_blank">
						<span className="font-semibold leading-none">{tweet.author.name}</span>
						<span className="text-white-400 text-sm leading-5">{`@${tweet.author.username}`}</span>
					</Link>
					<Link
						className="before:absolute before:w-full before:h-full before:top-0 before:left-0 before:-z-10"
						href={tweet.url}
						target="_blank"
					>
						{tweet.text}
					</Link>
				</div>
			</div>
		</div>
	);
}

export async function ConnectionTwitter() {
	const { user, tweets } = await getTwitterTimeline();

	return (
		<div className="w-full rounded-lg shadow-highlight flex flex-col overflow-hidden">
			<div className="items-center flex p-4 gap-4 bg-black-200 relative">
				<Image
					alt={`Twitter profile picture for @${user.username}`}
					className="rounded-lg"
					height={48}
					src={user.profile_image_url}
					width={48}
				/>
				<div className="flex flex-col justify-center">
					<span className="text-lg font-bold leading-none">{user.name}</span>
					<span className="text-white-400">{`@${user.username}`}</span>
				</div>
				<Link
					className="ml-auto mr-4 before:absolute before:w-full before:h-full before:top-0 before:left-0"
					href={user.url}
					target="_blank"
				>
					<Twitter className="w-8 h-8 text-brand-twitter" />
				</Link>
			</div>
			<div className="flex flex-col gap-4 p-4 bg-black-100 max-h-64 overflow-y-auto">
				{tweets.map((tweet) => (
					// @ts-expect-error: Server Component
					<Tweet key={tweet.id} tweet={tweet} user={user} />
				))}
			</div>
		</div>
	);
}
