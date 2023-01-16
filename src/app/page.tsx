"use client";

import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
	ArrowTrendingDownIcon
} from "@heroicons/react/24/outline";
import ms from "ms";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { connections } from "~/config";
import { useGlobalState } from "~/hooks/use-global-state";
import { useMetadata } from "~/hooks/use-metadata";

import { ExperienceAside } from "./experience-aside";
import { Heart } from "./heart";
import { IntroductionScreen } from "./introduction-screen";
import { SpotifyCard } from "./spotify";
import { Time } from "./time";

export type AsideType = "preview" | "left" | "center" | "right";

type AsideButtonProps = Omit<React.ComponentProps<"button">, "type"> & {
	type: Exclude<AsideType, "center">;
};

const AsideButton: React.FC<AsideButtonProps> = ({ type, ...props }) => {
	const Icon = type === "left" ? ArrowLongLeftIcon : ArrowLongRightIcon;

	return (
		<button
			type="button"
			{...props}
			className={twMerge(
				"absolute top-0 flex h-full justify-center px-8 transition-opacity md:items-center md:p-16 ",
				type === "left" ? "left-0" : "right-0",
				props.className
			)}
		>
			<div
				className={twMerge(
					"relative flex h-fit flex-row-reverse items-center gap-8 rounded-xl py-8",
					type === "left" ? "flex-row" : "flex-row-reverse"
				)}
			>
				<Icon
					className={twMerge(
						"h-10 w-10",
						type === "left" ? "animate-bounce-left" : "animate-bounce-right"
					)}
				/>
				<span className="text-lg">{type === "left" ? "Aries Clark" : "Jobs & experience"}</span>
			</div>
		</button>
	);
};

const minuteInMs = 60000;

const RootIndexPage: React.FC = () => {
	const [{ loaded }] = useGlobalState();
	const [aside, setAside] = useState<AsideType>("preview");

	const { heartrate, alive, spotify } = useMetadata();

	const [artificialBoost, setArtificialBoost] = useState(0);
	const [highestArtificialBoost, setHighestArtificialBoost] = useState(0);

	const bpm = heartrate.value + artificialBoost;

	useEffect(() => {
		setArtificialBoost(0);
	}, [heartrate]);

	useEffect(() => {
		if (loaded) setAside("center");
	}, [loaded]);

	const timeSinceMeasure = Math.abs(heartrate.measuredAt - Date.now());

	return (
		<>
			<IntroductionScreen />
			<div
				className={twMerge(
					"pointer-events-none fixed top-0 left-0 h-full backdrop-hue-rotate-180 backdrop-invert transition-all duration-300",
					aside === "right" || aside === "preview" ? "-translate-x-full" : "",
					aside === "center" ? "z-10 w-screen-1/2 delay-300" : "-z-10 w-full"
				)}
			/>
			<div
				className={twMerge(
					"flex h-screen w-full flex-col items-center justify-center gap-32 font-nunito transition-transform duration-300",
					loaded ? "opacity-100" : "opacity-0",
					aside === "right" ? "-translate-x-full" : ""
				)}
			>
				<div className="relative flex w-full max-w-2xl flex-col items-center gap-8 py-32">
					<div
						className={twMerge(
							"mb-8 flex select-none flex-col gap-4 font-inter transition-opacity",
							aside === "center" ? "delay-300" : "opacity-0"
						)}
					>
						<span className="text-6xl font-bold md:text-8xl">Aries Clark</span>
						<span className="text-2xl md:text-4xl">Software Engineer</span>
					</div>
					<div className="relative mb-16 flex h-full w-full max-w-md grid-cols-[1fr,max-content,1fr] flex-col items-center justify-center md:mb-0 md:grid">
						<div
							className={twMerge(
								"flex w-fit gap-4 text-white-100 md:z-20 md:flex-col md:text-black-100",
								aside === "center" ? "delay-500 duration-500" : "pointer-events-none opacity-0"
							)}
						>
							{connections.map(({ name, Icon, href }) => (
								<Link href={href} key={name} target="_blank">
									<Icon className="h-8 w-8" />
								</Link>
							))}
						</div>
						<Heart
							artificialBoost={artificialBoost}
							bpm={bpm}
							className="z-20 mt-8"
							onClick={() => {
								setArtificialBoost((artificialBoost) => {
									const newArtificialBoost = artificialBoost + 1;
									setHighestArtificialBoost((highestArtificialBoost) => {
										return newArtificialBoost > highestArtificialBoost
											? newArtificialBoost
											: highestArtificialBoost;
									});

									return newArtificialBoost;
								});
							}}
						/>
						<div
							className={twMerge(
								"absolute right-2 -bottom-16 flex w-fit rotate-12 flex-col-reverse items-end gap-2 transition-all md:right-0 md:bottom-auto md:-top-6 md:w-52 md:flex-col md:gap-4",
								aside === "center" ? "delay-1000 duration-500" : "pointer-events-none opacity-0"
							)}
						>
							<div className="flex w-full shrink-0 flex-col">
								<span className="select-none text-sm md:text-lg">
									{highestArtificialBoost >= 10
										? "Are you trying to kill me!?"
										: alive
										? "I'm still alive, somehow."
										: "I might be dead..?"}
								</span>
								<div className="flex select-none items-center gap-2 text-xs">
									{timeSinceMeasure < minuteInMs && (
										<span className="hidden rounded-md bg-gradient-to-br from-red-100 to-red-300 py-1 px-2 md:inline">
											LIVE
										</span>
									)}
									<span>
										{timeSinceMeasure < minuteInMs ? (
											<>Accurate within {ms(timeSinceMeasure, { long: true })}</>
										) : (
											<>Last measured {ms(timeSinceMeasure, { long: true })} ago</>
										)}
										.
									</span>
								</div>
							</div>
							<ArrowTrendingDownIcon
								className="mr-auto w-10 rotate-180 md:mr-4 md:rotate-90"
								strokeWidth={1}
							/>
						</div>
					</div>
					<div className="absolute z-10 mt-96 h-full w-8 bg-gradient-to-r from-red-100 to-red-300" />
					<div className="relative">
						{spotify && (
							<div
								className={twMerge(
									"absolute right-[-26rem] z-10 hidden md:flex",
									aside === "center" ? "delay-1000 duration-500" : "pointer-events-none opacity-0"
								)}
							>
								<SpotifyCard />
							</div>
						)}
						<Time
							className={twMerge("transition-all", aside === "center" ? "delay-300" : "opacity-0")}
						/>
					</div>
				</div>
			</div>
			<AsideButton
				className={twMerge("transition-all", aside === "center" && "pointer-events-none opacity-0")}
				type="left"
				onClick={() => setAside("center")}
			/>
			<AsideButton
				className={twMerge("transition-all", aside === "right" && "pointer-events-none opacity-0")}
				type="right"
				onClick={() => setAside((aside) => (aside === "left" ? "center" : "right"))}
			/>
			<ExperienceAside aside={aside} className={twMerge(aside === "right" && "opacity-100")} />
		</>
	);
};

export default RootIndexPage;
