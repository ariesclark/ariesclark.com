/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const bornAt = new Date(process.env["NEXT_PUBLIC_BORN_AT"]!);

export const recentTechnologies = [
	{
		name: "Elixir",
		description:
			"Elixir is a dynamic, functional language for building scalable and maintainable applications.",
		href: "https://elixir-lang.org/"
	},
	{
		name: "Phoenix",
		description:
			"Phoenix is a framework written in Elixir to provide highly performant web applications.",
		href: "https://www.typescriptlang.org/"
	},
	{
		name: "TypeScript",
		description: "A strongly typed programming language that builds on JavaScript.",
		href: "https://www.typescriptlang.org/"
	},
	{
		name: "Tailwind CSS",
		description: "A utility-first CSS framework for rapid UI development.",
		href: "https://tailwindcss.com/"
	},
	{
		name: "Next.js",
		description:
			"A framework for server-side rendering and generating static websites using React and Node.js.",
		href: "https://nextjs.org/"
	},
	{
		name: "React.js",
		description: "A JavaScript library for building user interfaces.",
		href: "https://reactjs.org/"
	},
	{
		name: "Node.js",
		description: "A runtime built on Chrome's V8 JavaScript engine.",
		href: "https://nodejs.org/en/"
	}
];

import { SiGithub, SiGmail, SiLinkedin, SiTwitter } from "@icons-pack/react-simple-icons";

export const connections = [
	{
		name: "Email",
		href: "mailto:me@ariesclark.com",
		Icon: SiGmail
	},
	{
		name: "LinkedIn",
		href: "https://linkedin.com/in/ariesclark",
		Icon: SiLinkedin
	},
	{
		name: "Twitter",
		href: "https://twitter.com/ariesrclark",
		Icon: SiTwitter
	},
	{
		name: "GitHub",
		href: "https://github.com/ariesclark",
		Icon: SiGithub
	}
];

import LogoStudioPaprika from "~/../public/images/logos/studio-paprika.png";
import LogoRunesSecurity from "~/../public/images/logos/runes-security.png";
import LogoAltarHost from "~/../public/images/logos/altarhost.png";
import LogoPloxHost from "~/../public/images/logos/ploxhost.jpg";
import GoneImage from "~/../public/images/gone.png";

export const experience = [
	{
		name: "Studio Paprika",
		logo: LogoStudioPaprika,
		href: "https://studiopaprika.io/",
		type: "Full Time",
		title: "Software Engineer",
		from: new Date("September 26, 2022"),
		to: null,
		description: `Building the first VR dating app, Flirtual. We're helping thousands of people 
meet in VR. With the new-and-improved Flirtual, we'll connect millions more VR users for dates, 
friendship, and everything in between.`
	},
	{
		name: "Runes Security",
		logo: LogoRunesSecurity,
		logoBackgroundColor: "black",
		href: "https://runes.sh",
		title: "Software Engineer",
		from: new Date("April 15, 2022"),
		to: new Date("August 15, 2022"),
		description: `During my time at Runes Security, I worked on developing an open-source password 
manager that provides a non-intrusive, seamless secret management experience.`
	},
	{
		name: "Altar Host",
		logo: LogoAltarHost,
		href: GoneImage.src,
		title: "Software Engineer",
		from: new Date("December 4, 2020"),
		to: new Date("February 2, 2022"),
		description: `In order to establish a hosting provider, I independently engineered software to 
control and handle client billing, server deployment, and many other essential business processes.`
	},
	{
		name: "Plox Host",
		logo: LogoPloxHost,
		href: "https://plox.host",
		title: "System Admin, Software Engineer",
		from: new Date("February 14, 2016"),
		to: new Date(2020, 0, 1),
		description: `
Over the years, I've worked with Plox Host to tackle infrastructure challenges, 
software issues, and a slew of other issues related to the management of a hosting company.`
	}
];

const vercelUrl = process.env["NEXT_PUBLIC_VERCEL_URL"]!;
export const siteUrl = vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000";
export const localSiteUrl = typeof window === "undefined" ? siteUrl : "/";

// Social connections
export const emailAddress = process.env["NEXT_PUBLIC_EMAIL_ADDRESS"]!;
export const twitterUsername = process.env["NEXT_PUBLIC_TWITTER_USERNAME"]!;
export const githubUsername = process.env["NEXT_PUBLIC_GITHUB_USERNAME"]!;

export const emailHref = connections.find(({ href }) => href.includes("mailto"))!.href;
export const twitterHref = connections.find(({ href }) => href.includes("twitter.com"))!.href;

/** Google Analytics */
export const gaMeasurementId = process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"]!;
