/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import { Button } from "../components/Button";
import { CallToAction } from "../components/CallToAction";
import { BackgroundCanvas } from "../components/Canvas";
import { FeaturedProject } from "../components/FeaturedProject";
import { FixedSidebar } from "../components/FixedSidebar";
import { Header } from "../components/Header";
import {
	aboutRecentTechnologies,
	aboutSummary,
	emailHref,
	experience,
	fctaSummary,
	fullName,
	projects,
	siteDescription,
	siteTitle,
	socials,
	twitterUsername
} from "../lib/config";
import { Markdown } from "../components/Markdown";
import { Link } from "../components/Link";
import { OutlinedImage } from "../components/OutlinedImage";
import { ExperienceItem } from "../components/ExperienceItem";

export default function RootIndexPage() {
	return (
		<>
			<Head>
				<title>{siteTitle}</title>
				<meta content={siteDescription} property="og:description" />
				<meta content={siteTitle} property="og:title" />
				<meta content={process.env.NEXT_PUBLIC_DOMAIN} property="og:site_name" />
				<meta content={process.env.NEXT_PUBLIC_URI + "/images/cover.jpg"} property="og:image" />
				<meta content="summary_large_image" name="twitter:card" />
				{twitterUsername && (
					<>
						<meta content={`@${twitterUsername}`} name="twitter:site" />
						<meta content={`@${twitterUsername}`} name="twitter:creator" />
					</>
				)}
			</Head>
			{/* eslint-disable-next-line tailwindcss/no-custom-classname */}
			<div className="overflow-x-hidden overflow-y-auto relative h-screen bg-neutral-900 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-transparent">
				<div className="fixed">
					<BackgroundCanvas />
				</div>
				<div className="flex absolute top-0 z-20 flex-col w-full text-neutral-200 transition-all">
					<Header />
					<FixedSidebar items={socials} />
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
											<Markdown>{aboutSummary}</Markdown>
											<ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm list-[square] list-inside sm:gap-x-8">
												{aboutRecentTechnologies.map(({ name, description, href }) => (
													<li key={name}>
														<Link href={href}>{name}</Link>
														<span className="text-xs text-neutral-300"> — {description}</span>
													</li>
												))}
											</ul>
										</div>
										<div className="shrink-0 w-80 h-80">
											<OutlinedImage alt={`Picture of ${fullName}`} src="/images/self.jpg" />
										</div>
									</div>
								</section>
								<section
									className="flex flex-col pt-8 mx-auto space-y-16 max-w-5xl sm:pt-32"
									id="experience"
								>
									<h4 className="flex space-x-4 text-2xl">
										<span className="font-mono text-red-400">02.</span>
										<span className="font-inter">Experience</span>
									</h4>
									<div className="flex flex-wrap gap-16 justify-around">
										{experience.map((item, idx) => (
											<ExperienceItem item={item} key={idx} />
										))}
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
										{projects.featured.map((item, idx) => (
											<FeaturedProject key={idx} {...item} alignRight={idx % 2 === 0} />
										))}
									</div>
								</section>
								<section
									className="flex flex-col gap-4 pt-8 mx-auto max-w-4xl sm:pt-32"
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
									<p className="max-w-md sm:w-96">{fctaSummary}</p>
									<div className="w-48 h-10">
										<Link href={emailHref}>
											<Button name="Email me" />
										</Link>
									</div>
								</section>
							</div>
						</div>
					</div>
					<footer className="mt-32">
						<div className="container flex p-8 mx-auto">
							<div className="flex flex-col mx-auto text-sm">
								{/**
								 * If you use this website for your own personal use,
								 * you must have at least one reference toLocaleDateString("en-ca") either the
								 * source responsory or ariesclark.com
								 */}
								<span>
									Designed and developed by <Link href="https://ariesclark.com">Aries Clark</Link>
								</span>
								{/**
								 * While not mandatory since nothing was copied from her site,
								 * A reference is always welcomed and encouraged.
								 */}
								<span className="mx-auto text-neutral-300">
									with inspiration from{" "}
									<Link href="https://github.com/bchiang7">Brittany Chiang</Link>
								</span>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
}
