"use client";

import { ArrowTrendingDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { connections, experience } from "~/config";
import { useGlobalState } from "~/hooks/use-global-state";

import { Heart } from "./heart";
import { IntroductionScreen } from "./introduction-screen";
import { SpotifyCard } from "./spotify";
import { Time } from "./time";

const RootIndexPage: React.FC = () => {
	const [{ loaded }] = useGlobalState();

	return (
		<>
			<IntroductionScreen />
			<div className="pointer-events-none fixed top-0 left-0 z-10 h-full w-screen-1/2 backdrop-hue-rotate-180 backdrop-invert" />
			<div
				className={twMerge(
					"flex min-h-screen w-full flex-col items-center justify-center gap-32 font-nunito",
					loaded ? "opacity-100" : "opacity-0"
				)}
			>
				<div className="relative flex w-full max-w-2xl flex-col items-center gap-8 py-32">
					<div className="mb-8 flex flex-col gap-4 font-inter">
						<span className="text-6xl font-bold md:text-8xl">Aries Clark</span>
						<span className="text-2xl md:text-4xl">Software Engineer</span>
					</div>
					<div className="relative mb-16 flex h-full w-full max-w-md grid-cols-[1fr,max-content,1fr] flex-col items-center justify-center md:mb-0 md:grid">
						<div className="flex w-fit gap-4 text-white-100 md:z-20 md:flex-col md:text-black-100">
							{connections.map(({ name, Icon, href }) => (
								<Link href={href} key={name} target="_blank">
									<Icon className="h-8 w-8" />
								</Link>
							))}
						</div>
						<Heart className="z-20 mt-8" />
						<div className="absolute right-8 -bottom-8 flex rotate-12 flex-col-reverse items-end gap-2 md:right-0 md:bottom-auto md:top-0 md:flex-col md:gap-4">
							<span className="font-itim text-xs md:text-lg">I&apos;m still alive, somehow.</span>
							<ArrowTrendingDownIcon
								className="mr-auto w-10 rotate-180 md:mr-4 md:w-16 md:rotate-90"
								strokeWidth={1}
							/>
						</div>
					</div>
					<div className="absolute z-10 mt-96 h-full w-8 bg-gradient-to-r from-red-100 to-red-300" />
					<Time />
					<SpotifyCard />
					{/* <div className="flex flex-col gap-4">
						{experience.map((item, itemIdx) => (
							<VeinyCard className="mt-16 w-full max-w-xl" key={itemIdx}>
								<div className="z-30 flex w-full gap-4">
									<div
										className="aspect-square h-fit w-16 shrink-0 rounded-xl object-contain p-2"
										style={{ backgroundColor: item.logoBackgroundColor ?? "white" }}
									>
										<Image
											alt={`Icon for ${item.name}`}
											className="h-full w-full"
											src={item.logo}
										/>
									</div>
									<div className="flex flex-col">
										<span className="font-bold">{item.name}</span>
										<p className="text-sm">{item.description}</p>
									</div>
								</div>
							</VeinyCard>
						))}
					</div> */}
				</div>
			</div>
		</>
	);
};

export default RootIndexPage;
