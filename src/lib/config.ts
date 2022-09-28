/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getYearSince } from "./date";

export const fullName = "Aries Clark";
export const birthDay = new Date("May 29, 2002");

export const siteTitle = fullName;
export const siteDescription = "Canadian software engineer";
export const siteDomain = "ariesclark.com";
export const siteUrl = `https://${siteDomain}`;

export const ctaTitle = "Software Engineer";
export const ctaSummary = `
I'm a proud Canadian software engineer with a passion for 
creating (and occasionally designing) things and services that 
challenge our perceptions of the every changing internet. 
`;

export const aboutSummary = `
I'm Aries, a ${getYearSince(birthDay)}-year-old Canadian with a 
burning desire to improve the status of the web through 
software development.

I began developing software when I was pretty young, at the age of eleven.
I've done a lot of various things in those ${getYearSince(
	new Date(2011, 0, 1)
)} years, from building Minecraft mods in Java to writing a 
lot of terrible PHP websites to getting to where I am now. 


Recently, I've been concentrating on using current languages like 
TypeScript to build web-based applications and services using React 
and Next.js, among other tools.

Here are a few technologies I've been working with recently:
`;

export const fctaSummary = `I enjoy a challenge.
I'll do my best to answer your message, whether it's a question or just a kind hello!
Try your luck and message me. `;

export const aboutRecentTechnologies = [
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

/** Google Analytics */
export const gaMeasurementId = "G-JYF8EMX65Z";

export const socials = [
	{
		name: "Email",
		href: "mailto:me@ariesclark.com"
	},
	{
		name: "LinkedIn",
		href: "https://linkedin.com/in/ariesclark"
	},
	{
		name: "Twitter",
		href: "https://twitter.com/ariesrclark"
	},
	{
		name: "GitHub",
		href: "https://github.com/ariesclark"
	}
];

export const experience = [
	{
		name: "Studio Paprika",
		logo: "/images/logos/studio-paprika.png",
		href: "https://studiopaprika.io/",
		type: "Full Time",
		title: "Senior Software Engineer",
		from: new Date("September 26, 2022"),
		to: null,
		description: `Building the first VR dating app, Flirtual. We're helping thousands of people meet in VR. With the new-and-improved Flirtual, we'll connect millions more VR users for dates, friendship, and everything in between.`
	},
	{
		name: "Runes Security",
		logo: "https://avatars.githubusercontent.com/u/101889654?s=200&v=4",
		logoBackgroundColor: "black",
		href: "https://runes.sh",
		type: "Full Time",
		title: "Senior Software Engineer",
		from: new Date("April 15, 2022"),
		to: new Date("August 15, 2022"),
		description: `During my time at Runes Security, I worked on developing an open-source password 
manager that provides a non-intrusive, seamless secret management experience. `
	},
	{
		name: "Altar Host",
		logo: "/images/altarhost.png",
		href: "/images/gone.png",
		type: "Full Time",
		title: "Senior Software Engineer",
		from: new Date("December 4, 2020"),
		to: new Date("February 2, 2022"),
		description: `In order to establish a hosting provider, I independently wrote software to 
control client billing, server deployment, and other essential business processes. `
	},
	{
		name: "Plox Host",
		logo: "https://pbs.twimg.com/profile_images/1288978871115812865/rehp8Pwo_400x400.jpg",
		href: "https://plox.host",
		type: "Various Contracts",
		title: "System Admin, Software Engineer",
		from: new Date("February 14, 2016"),
		to: new Date(2020, 0, 1),
		description: `
Over the years, I've worked with Plox Host to tackle infrastructure challenges, 
software issues, and a slew of other issues related to the establishment of a hosting company.
`
	}
];

export const projects = {
	featured: [
		{
			name: "VRChat API Documentation",
			image: "/images/vrchatapi.png",
			href: "https://vrchatapi.github.io",
			description: `
Back in 2018 (just over ${getYearSince(
				new Date(2018, 0, 1)
			)} years ago!), I was the sole maintainer of this project, 
but as time went on, documenting the rapid changes in the VRChat environment 
became increasingly laborious.

As a result, I sought assistance from the community and assigned the majority 
of the work to fantastic volunteers who were prepared to devote time to the project 
in order to take it forward. Since then, we've constructed an automated mechanism 
for releasing SDKs in a variety of languages based on the OpenAPI definition, 
which we manage.`,
			keywords: [
				{
					name: "OpenAPI",
					href: "https://github.com/vrchatapi/specification"
				},
				{
					name: "Redocly",
					href: "https://redoc.ly/"
				},
				{
					name: "GitHub Pages",
					href: "https://pages.github.com/"
				},
				{
					name: "TypeScript",
					href: "https://github.com/vrchatapi/vrchatapi-javascript"
				},
				{
					name: "Python",
					href: "https://github.com/vrchatapi/vrchatapi-python"
				},
				{
					name: "C Sharp",
					href: "https://github.com/vrchatapi/vrchatapi-csharp"
				},
				{
					name: "Dart",
					href: "https://github.com/vrchatapi/vrchatapi-dart"
				},
				{
					name: "Rust",
					href: "https://github.com/vrchatapi/vrchatapi-rust"
				},
				{
					name: "Java",
					href: "https://github.com/vrchatapi/vrchatapi-java"
				}
			],
			links: [
				{
					name: "GitHub",
					href: "https://github.com/vrchatapi/",
					icon: "GitHub"
				}
			]
		},
		{
			name: "Next.js job board",
			image: "/images/nextjs_jobs.png",
			href: "https://nextjs-jobs.ariesclark.com",
			description: `
I learned about the monthly GitHub Discussion for posting Next.js job requests 
after joining the official Next.js discord. I was intrigued by the way they were 
leveraging GitHub Discussions, so I cracked open VS Code to design and develop 
an interface for all this great data that was made publicly available in 
a relatively nice fashion.`,
			keywords: [
				{
					name: "React",
					href: "https://reactjs.org/"
				},
				{
					name: "Next.js",
					href: "https://nextjs.org/"
				},
				{
					name: "Tailwind CSS",
					href: "https://tailwindcss.com/"
				},
				{
					name: "GitHub API",
					href: "https://docs.github.com/en/graphql"
				},
				{
					name: "GraphQL",
					href: "https://graphql.org/"
				},
				{
					name: "TypeScript",
					href: "https://typescriptlang.org/"
				},
				{
					name: "Vercel",
					href: "https://vercel.com/"
				}
			],
			links: [
				{
					name: "GitHub",
					href: "https://github.com/ariesclark/nextjs-jobs",
					icon: "GitHub"
				}
			]
		},
		{
			name: "Personal portfolio",
			image: "/images/portfolio.png",
			href: "https://ariesclark.com/",
			description: `
Prior to this project, I didn't have a professional web presence to show 
off my skills. Brittany Chiang's gorgeous portfolio served as a major 
inspiration for the design. I created a site in a few days using 
Next.js, Tailwind.css, and TypeScript.
			`,
			keywords: [
				{
					name: "React",
					href: "https://reactjs.org/"
				},
				{
					name: "Next.js",
					href: "https://nextjs.org/"
				},
				{
					name: "Tailwind CSS",
					href: "https://tailwindcss.com/"
				},
				{
					name: "TypeScript",
					href: "https://typescriptlang.org/"
				},
				{
					name: "Vercel",
					href: "https://vercel.com/"
				}
			],
			links: [
				{
					name: "GitHub",
					href: "https://github.com/ariesclark/ariesclark.com",
					icon: "GitHub"
				}
			]
		}
	]
};

export const emailHref = socials.find(({ href }) => href.includes("mailto"))!.href;
export const twitterHref = socials.find(({ href }) => href.includes("twitter.com"))!.href;
export const twitterUsername = twitterHref?.match(/twitter\.com\/([^/]+)/i)?.[1];
