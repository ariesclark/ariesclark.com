import JinxxyLogo from "./assets/brands/jinxxy.svg";
import DuskviewMedia1 from "./assets/brands/duskview/media-1.png";
import DuskviewMedia2 from "./assets/brands/duskview/media-2.png";
import DuskviewMedia3 from "./assets/brands/duskview/media-3.png";
import FlirtualLogo from "./assets/brands/flirtual/logo.svg";
import FlirtualMedia1 from "./assets/brands/flirtual/media-1.jpg";
import FlirtualMedia2 from "./assets/brands/flirtual/media-2.png";
import FlirtualMedia3 from "./assets/brands/flirtual/media-3.png";
import AdlilyLogo from "./assets/brands/adlily/logo.svg";
import AdlilyMedia1 from "./assets/brands/adlily/media-1.png";
import AdlilyMedia2 from "./assets/brands/adlily/media-2.png";
import AdlilyMedia3 from "./assets/brands/adlily/media-3.png";

export const experience = [
	{
		name: "Jinxxy",
		logo: JinxxyLogo,
		description: (
			<>
				Your one-stop-shop for all things virtual, featuring a vast selection of
				assets for avatars, environments, and every creative need.
			</>
		),
		from: new Date("March 4, 2024"),
		url: "https://jinxxy.com"
	},
	{
		name: "Duskview City",
		url: "https://duskview.city",
		description: (
			<>
				A virtual-reality &quot;bar-as-a-service&quot; platform that provides a
				unique nightlife experience. I was responsible for the development of
				the platform&apos;s infrastructure and the integration of various APIs.
			</>
		),
		media: [
			{ image: DuskviewMedia1 },
			{ image: DuskviewMedia2 },
			{ image: DuskviewMedia3 }
		],
		from: new Date("January 24, 2024")
	},
	{
		name: "Adlily",
		logo: AdlilyLogo,
		url: "https://adli.ly",
		description: (
			<>
				The first-ever VR advertising & analytics platform, enabled creators to
				monetize content and offered advertisers a new niche audience. As
				co-founder and CTO, I spearheaded the platform&apos;s development and
				direction.
			</>
		),
		media: [
			{ image: AdlilyMedia3 },
			{ image: AdlilyMedia1 },
			{ image: AdlilyMedia2 }
		],
		from: new Date("July 5, 2023"),
		to: new Date("December 13, 2023")
	},
	{
		name: "Flirtual",
		logo: FlirtualLogo,
		description: (
			<>
				The first VR dating app, connects millions for dates, friendship, and
				more. I upgraded the infrastructure using Elixir & Next.js 13,
				integrated Elasticsearch and PostgreSQL, and employed AI for proactive
				platform moderation.
			</>
		),
		media: [
			{ image: FlirtualMedia2 },
			{ image: FlirtualMedia3 },
			{ image: FlirtualMedia1 }
		],
		from: new Date("September 26, 2022"),
		to: new Date("October 27, 2023"),
		url: "https://flirtu.al"
	}
	/* {
		name: "Runes Security",
		url: "https://runes.sh",
		from: new Date("April 15, 2022"),
		to: new Date("August 15, 2022"),
		description: `During my time at Runes Security, I worked on developing an open-source password 
manager that provides a non-intrusive, seamless secret management experience.`
	},
	{
		name: "Altar Host",
		from: new Date("December 4, 2020"),
		to: new Date("February 2, 2022"),
		description: `In order to establish a hosting provider, I independently engineered software to 
control and handle client billing, server deployment, and many other essential business processes.`
	},
	{
		name: "Plox Host",
		url: "https://plox.host",
		from: new Date("February 14, 2016"),
		to: new Date(2020, 0, 1),
		description: `
Over the years, I've worked with Plox Host to tackle infrastructure challenges, 
software issues, and a slew of other issues related to the management of a hosting company.`
	} */
];

export const birthday = new Date("May 29, 2002");

export function age() {
	const difference = Date.now() - birthday.getTime();
	const age = new Date(difference);

	return Math.abs(age.getUTCFullYear() - 1970);
}

export const twitterUsername = "ariesrclark";
export const discordId = "128267277308002304";

export const gitCommitSha =
	process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "local";
export const gitCommitShaShort = gitCommitSha.slice(0, 8);

export const urls = {
	socials: {
		email: `mailto:me.${gitCommitShaShort}@ariesclark.com`,
		linkedin: "https://linkedin.com/in/ariesclark",
		twitter: `https://twitter.com/${twitterUsername}`,
		github: "https://github.com/ariesclark",
		discord: `https://discord.com/users/${discordId}`
	}
};

export const discordContactWebhook = process.env
	.DISCORD_CONTACT_WEBHOOK as string;

export const pulsoidAccessToken = process.env["PULSOID_ACCESS_TOKEN"] as string;

export const spotifyClientId = process.env["SPOTIFY_CLIENT_ID"] as string;
export const spotifyClientSecret = process.env[
	"SPOTIFY_CLIENT_SECRET"
] as string;
export const spotifyRefreshToken = process.env[
	"SPOTIFY_REFRESH_TOKEN"
] as string;

export const origin = new URL(
	process.env.NEXT_PUBLIC_ORIGIN ||
		(process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
			: "")
);

export const googleAnalyticsId = process.env
	.NEXT_PUBLIC_GA_MEASUREMENT_ID as string;
export const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY as string;

export const posthogHost =
	(process.env.NEXT_PUBLIC_POSTHOG_HOST as string) ||
	new URL("/analytics", origin.href).href;
