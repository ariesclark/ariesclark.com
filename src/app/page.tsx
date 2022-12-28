"use client";

import {
	ArrowTrendingDownIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon
} from "@heroicons/react/24/outline";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { connections } from "~/config";
import { useMetadata } from "~/hooks/use-metadata";

const globalStateAtom = atom({ muted: false, loaded: false });

const CursorInvert: React.FC = () => {
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onMouseMove(event: MouseEvent) {
			if (!elementRef.current) return;

			elementRef.current.style.transform = `translate(${event.pageX}px,${event.pageY}px)`;
		}

		document.addEventListener("mousemove", onMouseMove);
		return () => document.removeEventListener("mousemove", onMouseMove);
	});

	return (
		<div
			className="pointer-events-none fixed z-50 transition-none will-change-transform"
			ref={elementRef}
		>
			<div className="mt-[-50%] ml-[-50%] h-64 w-64 rounded-full backdrop-hue-rotate-180 backdrop-invert" />
		</div>
	);
};

const Heart: React.FC = () => {
	const [{ loaded, muted }] = useAtom(globalStateAtom);
	const { heartrate: bpm } = useMetadata();

	// Beats per second.
	const bps = bpm / 60;

	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (!audioRef.current) return;
		audioRef.current.playbackRate = bps;
	}, [bps]);

	useEffect(() => {
		if (!audioRef.current || !loaded) return;

		audioRef.current.volume = muted ? 0 : 1;
		void audioRef.current.play();
	}, [loaded, muted]);

	return (
		<div className="relative flex w-64 items-center justify-center">
			<svg
				className="w-full animate-heartbeat text-red-100"
				fill="currentColor"
				style={{ animationDuration: `${(1 / bps).toFixed(1)}s` }}
				version="1.0"
				viewBox="0 0 645 585"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="m297.3 550.87c-13.775-15.436-48.171-45.53-76.435-66.874-83.744-63.242-95.142-72.394-129.14-103.7-62.685-57.72-89.306-115.71-89.214-194.34 0.044512-38.384 2.6608-53.172 13.41-75.797 18.237-38.386 45.1-66.909 79.445-84.355 24.325-12.356 36.323-17.845 76.944-18.07 42.493-0.23483 51.439 4.7197 76.435 18.452 30.425 16.714 61.74 52.436 68.213 77.811l3.9981 15.672 9.8596-21.585c55.716-121.97 233.6-120.15 295.5 3.0316 19.638 39.076 21.794 122.51 4.3801 169.51-22.715 61.309-65.38 108.05-164.01 179.68-64.681 46.974-137.88 118.05-142.98 128.03-5.9155 11.588-0.28216 1.8159-26.408-27.461z" />
			</svg>
			<audio loop ref={audioRef} src="/heartbeat.wav" />
			<div className="absolute -mt-4 flex flex-col items-center font-nunito text-white-100">
				<span className="text-3xl font-bold ">{bpm} bpm</span>
				<span className="text-sm">{bps.toFixed(1)} beats per second</span>
			</div>
		</div>
	);
};

const RootIndexPage: React.FC = () => {
	const [{ loaded, muted }, setGlobalState] = useAtom(globalStateAtom);

	return (
		<>
			<CursorInvert />
			<div
				className={twMerge(
					"fixed top-0 left-0 z-40 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-8 bg-black-100",
					loaded ? "pointer-events-none opacity-0" : "opacity-100"
				)}
				onClick={() => setGlobalState((globalState) => ({ ...globalState, loaded: true }))}
			>
				<button
					className="relative"
					type="button"
					onClick={(event) => {
						setGlobalState((globalState) => ({ ...globalState, muted: !globalState.muted }));
						event.stopPropagation();
					}}
				>
					{muted ? (
						<SpeakerXMarkIcon className="h-16 w-16" />
					) : (
						<SpeakerWaveIcon className="h-16 w-16" />
					)}
					<div className="absolute -top-16 -right-16 flex rotate-12 flex-col items-end gap-4">
						<span className="font-itim">{muted ? "Unmute audio" : "Mute audio"}.</span>
						<ArrowTrendingDownIcon className="mr-4 w-10 rotate-90" strokeWidth={1} />
					</div>
				</button>
				<span className="max-w-md">
					This site uses audio to enhance the experience, I recommend using headphones, and avoid
					opening this website in any public spaces, thank you.
				</span>
				<hr className="w-16 border-white-400" />
				<span>Click anywhere to continue</span>
				<span className="mt-32">
					Aries Clark, on behalf of Arie Studios Ltd. <br />
					Copyright © {new Date().getFullYear()}, All rights reserved.
				</span>
			</div>
			<div className="pointer-events-none fixed top-0 left-0 h-full w-1/2 backdrop-hue-rotate-180 backdrop-invert" />
			<div className="flex h-screen min-h-screen w-full flex-col items-center justify-center gap-32">
				<div className="mt-64 flex flex-col gap-4 font-inter">
					<span className="text-8xl font-bold">Aries Clark</span>
					<span className="text-4xl">Software Engineer</span>
				</div>

				<div className="relative flex h-full flex-col items-center">
					<div className="absolute -left-24 -top-16 flex flex-col gap-4 text-black-100">
						{connections.map(({ name, Icon, href }) => (
							<Link href={href} key={name} target="_blank">
								<Icon className="h-8 w-8" />
							</Link>
						))}
					</div>
					<Heart />
					<div className="absolute -top-12 -right-24 flex rotate-12 flex-col items-end gap-4">
						<span className="font-itim text-lg">I&apos;m still alive, somehow.</span>
						<ArrowTrendingDownIcon className="mr-4 w-16 rotate-90" strokeWidth={1} />
					</div>
					<div className="z-10 -mt-16 h-full w-8 bg-red-100" />
				</div>
			</div>
		</>
	);
};

export default RootIndexPage;
