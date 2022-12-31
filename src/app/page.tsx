"use client";

import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
	ArrowTrendingDownIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { connections, experience } from "~/config";
import { useGlobalState } from "~/hooks/use-global-state";

import { Heart } from "./heart";
import { IntroductionScreen } from "./introduction-screen";
import { Time } from "./time";

type AsideType = "preview" | "left" | "center" | "right";

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
				"absolute top-0 flex h-full items-center justify-center p-8 transition-opacity md:p-16",
				type === "left" ? "left-0" : "right-0",
				props.className
			)}
		>
			<div
				className={twMerge(
					"relative items-center gap-8 md:flex",
					type === "left" ? "" : "flex-row-reverse"
				)}
			>
				<Icon
					className={twMerge(
						"h-10 w-10",
						type === "left" ? "animate-bounce-left" : "animate-bounce-right"
					)}
				/>
				<span className="text-xs md:text-lg">
					{type === "left" ? "Resources" : "Jobs & experience"}
				</span>
			</div>
		</button>
	);
};

const RootIndexPage: React.FC = () => {
	const [{ loaded }] = useGlobalState();
	const [aside, setAside] = useState<AsideType>("preview");

	useEffect(() => {
		if (loaded) setAside("center");
	}, [loaded]);

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
					aside === "left" ? "translate-x-1/2" : "",
					aside === "right" ? "-translate-x-1/2" : ""
				)}
			>
				<div className="relative flex w-full max-w-2xl flex-col items-center gap-8 py-32">
					<div
						className={twMerge(
							"mb-8 flex flex-col gap-4 font-inter transition-opacity",
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
						<Heart className="z-20 mt-8" />
						<div
							className={twMerge(
								"absolute right-8 -bottom-10 flex rotate-12 flex-col-reverse items-end gap-2 transition-all md:right-0 md:bottom-auto md:top-0 md:flex-col md:gap-4",
								aside === "center" ? "delay-1000 duration-500" : "pointer-events-none opacity-0"
							)}
						>
							<span className="font-itim text-xs md:text-lg">I&apos;m still alive, somehow.</span>
							<ArrowTrendingDownIcon
								className="mr-auto w-10 rotate-180 md:mr-4 md:rotate-90"
								strokeWidth={1}
							/>
						</div>
					</div>
					<div className="absolute z-10 mt-96 h-full w-8 bg-gradient-to-r from-red-100 to-red-300" />
					<Time
						className={twMerge("transition-all", aside === "center" ? "delay-300" : "opacity-0")}
					/>
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
			<div
				className={twMerge(
					"pointer-events-none absolute top-0 flex h-screen w-screen items-center justify-center p-8 opacity-0 transition-opacity",
					aside === "right" && "opacity-100"
				)}
			>
				<div className="flex flex-col gap-4">
					{experience.map((item, itemIdx) => (
						<div className="flex w-full max-w-xl gap-4 rounded-xl bg-black-100 p-4" key={itemIdx}>
							<div
								className="aspect-square h-fit w-16 shrink-0 rounded-xl object-contain p-2"
								style={{ backgroundColor: item.logoBackgroundColor ?? "white" }}
							>
								<Image alt={`Icon for ${item.name}`} className="h-full w-full" src={item.logo} />
							</div>
							<div className="flex flex-col gap-2">
								<span className="font-semibold leading-tight">{item.name}</span>
								<p className="text-sm">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default RootIndexPage;
