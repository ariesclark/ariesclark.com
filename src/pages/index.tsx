import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { Button } from "../components/Button";
import { CallToAction } from "../components/CallToAction";
import { BackgroundCanvas } from "../components/Canvas";
import { FeaturedProject } from "../components/FeaturedProject";
import { FixedSidebar } from "../components/FixedSidebar";
import { Header } from "../components/Header";
import { IconGitHub } from "../components/icons/GitHub";
import { useWindowSize } from "../lib/useWindowSize";
import ImageSelf from "../../public/images/self.jpg";
import ImageCover from "../../public/images/cover.jpg";
import ImagePortfolioScreenshot from "../../public/images/portfolio_screenshot.png";
import ImageNextjsJobsScreenshot from "../../public/images/nextjs_jobs_screenshot.png";

export default function RootIndexPage () {
	const windowSize = useWindowSize();

	return (
		<>
			<Head>
				<title>Aries Clark</title>
				<meta
					property="og:description"
					content="Vestibulum feugiat mollis dictum.
				Sed volutpat quam sit amet risus accumsan posuere.Duis placerat ut odio eu venenatis.
				Nulla mauris elit, fermentum nec dui et, tristique aliquam turpis."
				/>
				<meta property="og:title" content="Aries Clark" />
				<meta property="og:site_name" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:image" content={process.env.NEXT_PUBLIC_URI + ImageCover.src} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@ariesrclark" />
				<meta name="twitter:creator" content="@ariesrclark" />
			</Head>
			<div className="relative h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-transparent">
				<div className="fixed">
					<BackgroundCanvas
						canvasSize={windowSize}
						offsetSpeed={1.5}
						stepSize={48*2}
					/>
				</div>
				<div className="absolute top-0 z-20 flex flex-col w-full transition-all text-neutral-200">
					<Header />
					<FixedSidebar />
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
											<p>Vestibulum feugiat mollis dictum. Sed volutpat quam sit amet risus accumsan posuere.
												Duis placerat ut odio eu venenatis. Nulla mauris elit, fermentum nec dui et,
												tristique aliquam turpis. Vivamus nibh odio, molestie in pharetra sit amet,
												convallis et justo. Nunc lorem libero, tempor eu magna at, pretium ultricies diam.
												Quisque ullamcorper elit nec erat venenatis congue.
											</p>
											<p>Curabitur blandit rhoncus lacus, sed pretium felis suscipit vitae.
												In cursus hendrerit nibh, vitae imperdiet sapien commodo sit amet.
												Curabitur id felis a lorem sodales consectetur sit amet non augue.
												Praesent a quam ac ante consequat feugiat in ut tellus. Duis gravida bibendum cursus.
												Pellentesque blandit sapien tincidunt mauris sagittis euismod.
												Aenean ante neque, vestibulum in tortor ac,
												convallis consequat orci.
											</p>
											<ul className="flex flex-wrap text-sm list-inside gap-x-8 gap-y-2 list-[square]">
												<li>Vestibulum nec felis justo</li>
												<li>Integer gravida enim non</li>
												<li>Vivamus venenatis nisi urna</li>
												<li>Aenean viverra pulvinar</li>
												<li>Proin rhoncus dignissim</li>
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
										<FeaturedProject
											name="Personal portfolio (you're here)"
											description="Morbi sit amet vulputate est, aliquam consectetur mi.
										Morbi laoreet eget massa eget molestie. Class aptent taciti sociosqu ad
										litora torquent per conubia nostra, per inceptos himenaeos."
											href="https://ariesclark.com/"
											image={ImagePortfolioScreenshot}
											keywords={[
												{ name: "React", href: "https://reactjs.org/" },
												{ name: "Next.js", href: "https://nextjs.org/" },
												{ name: "Tailwind.css", href: "https://tailwindcss.com/" },
												{ name: "TypeScript", href: "https://typescriptlang.org/" },
												{ name: "Vercel", href: "https://vercel.com/" },
											]}
											links={[
												{ name: "GitHub", href: "https://github.com/ariesclark/ariesclark.com", icon: IconGitHub }
											]}
											alignRight
										/>
										<FeaturedProject
											name="Next.js job board"
											description="Morbi sit amet vulputate est, aliquam consectetur mi.
										Morbi laoreet eget massa eget molestie. Class aptent taciti sociosqu ad
										litora torquent per conubia nostra, per inceptos himenaeos."
											href="https://nextjs-jobs-rubybb.vercel.app/"
											image={ImageNextjsJobsScreenshot}
											keywords={[
												{ name: "React", href: "https://reactjs.org/" },
												{ name: "Next.js", href: "https://nextjs.org/" },
												{ name: "Tailwind.css", href: "https://tailwindcss.com/" },
												{ name: "GitHub API", href: "https://docs.github.com/en/graphql" },
												{ name: "GraphQL", href: "https://graphql.org/" },
												{ name: "TypeScript", href: "https://typescriptlang.org/" },
												{ name: "Vercel", href: "https://vercel.com/" },
											]}
											links={[
												{ name: "GitHub", href: "https://github.com/ariesclark/nextjs-jobs", icon: IconGitHub }
											]}
										/>
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

									<p className="max-w-md">Proin pulvinar venenatis purus eget sagittis. Nulla vitae tortor non enim tempor mattis vel eget libero. Cras commodo ultricies metus, in vulputate turpis egestas quis. Donec sit amet ipsum ut est consectetur accumsan. Aliquam a finibus metus. Donec quis porttitor est, et fermentum nibh. Morbi finibus lectus tortor, sit amet scelerisque velit fermentum vitae.</p>
									<div className="w-48 h-10">
										<Link href="mailto:me@ariesclark.com" passHref>
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
								<span>
									Designed and developed by Aries Clark
								</span>
								<span className="mx-auto text-neutral-300">
									with inspiration from
									<Link href="https://brittanychiang.com">
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
