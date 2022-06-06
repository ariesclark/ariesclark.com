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

interface RootIndexPageProps {
	paths: Array<string>;
	content: {
		[key: string]: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			[key: string]: any;
		};
	};
}

const ONE_YEAR_IN_MILLISECONDS = 3.154e10;
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

export default function RootIndexPage(props: RootIndexPageProps) {
	const { content } = props;

	const now = Date.now();
	const age = Math.floor((now - BIRTH_DATE.getTime()) / ONE_YEAR_IN_MILLISECONDS);

	return (
		<>
			<Head>
				<title>Aries Clark</title>
				<meta content="Canadian software engineer" property="og:description" />
				<meta content="Aries Clark" property="og:title" />
				<meta content={process.env.NEXT_PUBLIC_DOMAIN} property="og:site_name" />
				<meta content={process.env.NEXT_PUBLIC_URI + "/images/cover.jpg"} property="og:image" />
				<meta content="summary_large_image" name="twitter:card" />
				<meta content="@ariesrclark" name="twitter:site" />
				<meta content="@ariesrclark" name="twitter:creator" />
			</Head>
			{/* eslint-disable-next-line tailwindcss/no-custom-classname */}
			<div className="overflow-x-hidden overflow-y-auto relative h-screen bg-neutral-900 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-transparent">
				<div className="fixed">
					<BackgroundCanvas />
				</div>
				<div className="flex absolute top-0 z-20 flex-col w-full text-neutral-200 transition-all">
					<Header />
					<FixedSidebar items={content.generic.socials as Array<SocialDescriptor>} />
					<div className="sm:ml-16">
						<div className="container grow px-8 mx-auto">
							<CallToAction />
							<div className="flex flex-col space-y-32">
								<section
									className="flex flex-col pt-8 mx-auto space-y-8 max-w-4xl sm:pt-32"
									id="about"
								>
									<h4 className="flex space-x-4 text-2xl">
										<span className="font-mono text-red-400">01.</span>
										<span className="font-inter">About me</span>
									</h4>
									<div className="flex flex-wrap gap-16 justify-between">
										<div className="flex flex-col space-y-4 max-w-md">
											<p>
												I&apos;m Aries, a {age} year old Canadian citizen with a burning passion for
												software development and improving the state of the web.
											</p>
											<p>
												I started software development when I was quite young — 13 years old in
												fact. In those{" "}
												{Math.floor(
													(now - new Date(2016, 0, 1).getTime()) / ONE_YEAR_IN_MILLISECONDS
												)}{" "}
												years I&apos;ve done so many different things ranging from developing
												Minecraft mods in Java, writing quite a few horrible PHP websites, and all
												the way to where I am now.
											</p>
											<p>
												As of late, my focus has been on using modern languages like TypeScript to
												create web based applications and services with React and Next.js among
												other libraries.
											</p>
											<p>Here are a few technologies I&apos;ve been working with recently:</p>
											<ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm list-[square] list-inside sm:gap-x-8">
												<li>
													TypeScript{" "}
													<span className="text-xs text-neutral-300">
														{" "}
														— A strongly typed programming language that builds on JavaScript.
													</span>
												</li>
												<li>
													Next.js{" "}
													<span className="text-xs text-neutral-300">
														{" "}
														— A framework for server-side rendering and generating static websites
														using React and Node.js.
													</span>
												</li>
												<li>
													React{" "}
													<span className="text-xs text-neutral-300">
														{" "}
														— A JavaScript library for building user interfaces.
													</span>
												</li>
												<li>
													Node.js{" "}
													<span className="text-xs text-neutral-300">
														{" "}
														— A runtime built on Chrome&apos;s V8 JavaScript engine.
													</span>
												</li>
												<li>
													Tailwind CSS{" "}
													<span className="text-xs text-neutral-300">
														— A utility-first CSS framework for rapid UI development.
													</span>
												</li>
											</ul>
										</div>
										<div className="shrink-0">
											<div className="group relative mr-4 mb-4 w-64 h-64 sm:w-80 sm:h-80">
												<div className="block absolute z-0 w-full h-full rounded border-2 border-red-400 translate-x-4 group-hover:translate-x-3 translate-y-4 group-hover:translate-y-3" />
												<div className="block absolute z-20 w-full h-full bg-red-400 opacity-40 group-hover:opacity-0" />
												<Image
													alt="Picture of Aries Clark"
													className="block object-cover object-center absolute z-10 h-full rounded group-hover:contrast-100 grayscale group-hover:grayscale-0"
													placeholder="blur"
													quality={100}
													src={"/images/self.jpg"}
												/>
											</div>
										</div>
									</div>
								</section>
								<section
									className="flex flex-col pt-8 mx-auto space-y-8 max-w-5xl sm:pt-32"
									id="projects"
								>
									<h4 className="flex space-x-4 text-2xl">
										<span className="font-mono text-red-400">03.</span>
										<span className="font-inter">A few creations</span>
									</h4>
									<div className="flex flex-col space-y-32">
										{Object.entries<FeaturedProjectProps>(content["projects/featured"]).map(
											([key, item], index) => {
												return <FeaturedProject key={key} {...item} alignRight={index % 2 === 0} />;
											}
										)}
									</div>
								</section>
								<section
									className="flex flex-col pt-8 mx-auto space-y-8 max-w-4xl sm:pt-32"
									id="contact"
								>
									<div className="flex flex-col space-y-4">
										<div className="flex space-x-4 text-lg">
											<span className="font-mono text-red-400">04.</span>
											<span className="font-inter">What&apos;s next?</span>
										</div>
										<div className="flex space-x-4 text-4xl">
											<span className="font-inter font-bold">Reach out</span>
										</div>
									</div>

									<p className="max-w-md sm:w-96">
										I&apos;m always open for an opportunity. Whether you have a question or just
										want to say hi, I&apos;ll try my best to get back to you! Take the chance and
										message me.
									</p>
									<div className="w-48 h-10">
										<Link passHref href="mailto:me@ariesclark.com">
											<a>
												<Button name="Email me" />
											</a>
										</Link>
									</div>
								</section>
							</div>
						</div>
					</div>
					<footer className="mt-32">
						<div className="container flex p-8 mx-auto">
							<div className="flex flex-col mx-auto text-sm">
								<span>Designed and developed by Aries Clark</span>
								<span className="mx-auto text-neutral-300">
									with inspiration from
									<Link href="https://github.com/bchiang7">
										<a className="ml-1 hover:underline" target="_blank">
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
