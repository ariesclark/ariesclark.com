import fs from "fs/promises";
import path from "path";

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { GetStaticProps } from "next";
import { glob } from "glob";
import YAML from "yaml";

import { Button } from "../components/Button";
import { CallToAction } from "../components/CallToAction";
import { BackgroundCanvas } from "../components/Canvas";
import { FeaturedProject, FeaturedProjectProps } from "../components/FeaturedProject";
import { FixedSidebar, SocialDescriptor } from "../components/FixedSidebar";
import { Header } from "../components/Header";
import { useWindowSize } from "../lib/useWindowSize";
import ImageSelf from "../../public/images/self.jpg";
import ImageCover from "../../public/images/cover.jpg";

interface RootIndexPageProps {
	paths: string[],
	content: {
		[key: string]: {
			[key: string]: any
		}
	}
}

const ONE_YEAR_IN_MILLISECONDS = 3.154e+10;
const BIRTH_DATE = new Date(2002, 4, 29);

export const getStaticProps: GetStaticProps<RootIndexPageProps> = async function () {
	const paths = glob.sync("**/*.yaml", { cwd: "./data" });
	const content: RootIndexPageProps["content"] = {};

	for (let i = 0; i < paths.length; i += 1) {
		const relativePath = paths[i];
		const group = path.dirname(relativePath);
		const name = path.basename(relativePath, ".yaml");

		const fileContent = await fs.readFile(path.resolve("./data", relativePath), "utf-8");
		const yamlContent = YAML.parse(fileContent);

		content[group] ??= {};
		content[group][name] = yamlContent;
	}

	return {
		props: {
			paths,
			content
		}
	};
};

export default function RootIndexPage (props: RootIndexPageProps) {
	const windowSize = useWindowSize();
	const { content } = props;

	const now = Date.now();
	const age = Math.floor((now - BIRTH_DATE.getTime()) / ONE_YEAR_IN_MILLISECONDS);

	return (
		<>
			<Head>
				<title>Aries Clark</title>
				<meta property="og:description" content="Canadian software engineer" />
				<meta property="og:title" content="Aries Clark" />
				<meta property="og:site_name" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:image" content={process.env.NEXT_PUBLIC_URI + ImageCover.src} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@ariesrclark" />
				<meta name="twitter:creator" content="@ariesrclark" />
			</Head>
			<div className="relative h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-transparent bg-neutral-900">
				<div className="fixed">
					<BackgroundCanvas
						canvasSize={windowSize}
						offsetSpeed={1.5}
						stepSize={48 * 2}
					/>
				</div>
				<div className="absolute top-0 z-20 flex flex-col w-full transition-all text-neutral-200">
					<Header />
					<FixedSidebar items={content.generic.socials as SocialDescriptor[]} />
					<div className="sm:ml-16">
						<div className="container flex-grow px-8 mx-auto">
							<CallToAction />
							<div className="flex flex-col space-y-32">
								<section id="about" className="flex flex-col max-w-4xl pt-8 mx-auto space-y-8 sm:pt-32">
									<h4 className="flex space-x-4 text-2xl">
										<span className="font-mono text-red-400">01.</span>
										<span className="font-inter">About me</span>
									</h4>
									<div className="flex flex-wrap justify-between gap-16">
										<div className="flex flex-col max-w-md space-y-4">
											<p>I&apos;m Aries, a {age} year old Canadian citizen with a burning passion for
												software development and improving the state of the web.
											</p>
											<p>
												I started software development when I was quite young — 13 years old in fact. In
												those {Math.floor((now - new Date(2016, 0, 1).getTime()) / ONE_YEAR_IN_MILLISECONDS)} years
												I&apos;ve done so many different things ranging from developing Minecraft mods in Java,
												writing quite a few horrible PHP websites, and all the way to where I am now.
											</p>
											<p>
												As of late, my focus has been on using modern languages like TypeScript to create web based
												applications and services with React and Next.js among other libraries.
											</p>
											<p>Here are a few technologies I&apos;ve been working with recently:
											</p>
											<ul className="text-sm list-inside list-[square] grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2">
												<li>
													TypeScript <span className="text-xs text-neutral-300"> — A strongly typed programming language that builds on JavaScript.</span>
												</li>
												<li>
													Next.js <span className="text-xs text-neutral-300"> — A framework for server-side rendering and generating static websites using React and Node.js.</span>
												</li>
												<li>
													React <span className="text-xs text-neutral-300"> — A JavaScript library for building user interfaces.</span>
												</li>
												<li>
													Node.js <span className="text-xs text-neutral-300"> — A runtime built on Chrome&apos;s V8 JavaScript engine.</span>
												</li>
												<li>
													Tailwind CSS <span className="text-xs text-neutral-300">— A utility-first CSS framework for rapid UI development.</span>
												</li>
											</ul>
										</div>
										<div className="flex-shrink-0">
											<div className="relative w-64 h-64 mb-4 mr-4 sm:h-80 sm:w-80 group">
												<div className="absolute z-0 block w-full h-full translate-x-4 translate-y-4 border-2 border-red-400 rounded group-hover:translate-x-3 group-hover:translate-y-3" />
												<div className="absolute z-20 block w-full h-full bg-red-400 opacity-40 group-hover:opacity-0" />
												<Image className="absolute z-10 block object-cover object-center h-full rounded grayscale group-hover:grayscale-0 group-hover:contrast-100" src={ImageSelf} quality={100} placeholder="blur" alt="Picture of Aries Clark" />
											</div>
										</div>
									</div>
								</section>
								<section id="projects" className="flex flex-col max-w-5xl pt-8 mx-auto space-y-8 sm:pt-32">
									<h4 className="flex space-x-4 text-2xl">
										<span className="font-mono text-red-400">03.</span>
										<span className="font-inter">A few creations</span>
									</h4>
									<div className="flex flex-col space-y-32">
										{Object.entries<FeaturedProjectProps>(content["projects/featured"]).map(([key, item], index) => {
											return (<FeaturedProject key={key} {...item} alignRight={index % 2 === 0} />);
										})}
									</div>
								</section>
								<section id="contact" className="flex flex-col max-w-4xl pt-8 mx-auto space-y-8 sm:pt-32">
									<div className="flex flex-col space-y-4">
										<div className="flex space-x-4 text-lg">
											<span className="font-mono text-red-400">04.</span>
											<span className="font-inter">What&apos;s next?</span>
										</div>
										<div className="flex space-x-4 text-4xl">
											<span className="font-bold font-inter">Reach out</span>
										</div>
									</div>

									<p className="max-w-md sm:w-96">
										I&apos;m always open for an opportunity. Whether you have a question or just want to say hi,
										I&apos;ll try my best to get back to you! Take the chance and message me.
									</p>
									<div className="w-48 h-10">
										<Link href="mailto:me@ariesclark.com" passHref>
											<a><Button name="Email me" /></a>
										</Link>
									</div>
								</section>
							</div>
						</div>
					</div>
					<footer className="mt-32">
						<div className="container flex p-8 mx-auto">
							<div className="flex flex-col mx-auto text-sm">
								<span>
									Designed and developed by Aries Clark
								</span>
								<span className="mx-auto text-neutral-300">
									with inspiration from
									<Link href="https://github.com/bchiang7">
										<a target="_blank" className="ml-1 hover:underline">
											Brittany Chiang
										</a>
									</Link>
								</span>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
}
