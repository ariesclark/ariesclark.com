"use client";

import { m, AnimatePresence } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import ms from "ms";

import RiskAstleyImage from "~/assets/rick-astley.gif";
import { random } from "~/utils/number";
import { getHeartrate } from "~/upstream/pulsoid-action";
import { useCursor } from "~/hooks/cursor";

import { TweenNumber } from "./tweet-number";
import { Indicator, IndicatorProps } from "./indicator";

export const Heart: FC = () => {
	const cursor = useCursor();

	const { data = null } = useSWR(
		"heartrate",
		async () => {
			const data = await getHeartrate();
			if (!data) return null;

			return {
				...data,
				latency: Date.now() - data.at
			};
		},
		{
			refreshInterval: 1000,
			fallbackData: null
		}
	);

	const live = data && Date.now() - data.at < ms("1m");

	const audioStage = useRef<number>(0);
	const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
	const [bpmOverride, setBpmOverride] = useState<number | null>(null);

	const [indicators, setIndicators] = useState<Array<IndicatorProps>>([]);
	const indicatorCount = useRef(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndicators((previous) =>
				previous.filter(({ created, ttl }) => Date.now() - created < ttl)
			);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const [increment, setIncrement] = useState(0);

	useEffect(() => {
		// Natural decay.
		const interval = setInterval(() => {
			setIncrement((previous) => Math.max(0, previous - 10));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const bpm = bpmOverride || (data ? data.value + increment : 0);
	const bps = bpm / 60;

	return (
		<AnimatePresence>
			<button
				className="relative size-64 cursor-pointer select-none focus:outline-none lg:size-80"
				type="button"
				onClick={() => {
					// We're in the middle of a Rick Roll, don't interrupt.
					if (backgroundImage) return;

					if (increment > 100 && audioStage.current < 5) audioStage.current = 5;
					// if (increment > 1000 && audioStage.current < 3) audioStage.current = 3;
					// if (increment > 200 && audioStage.current < 1) audioStage.current = 1;

					const audioClip =
						audioStage.current === 5
							? "/sounds/rick-astley.mp3"
							: audioStage.current === 3
								? "/sounds/too-bad.mp3"
								: audioStage.current === 1
									? "/sounds/slowdown.mp3"
									: "/sounds/click.mp3";
					const audio = new Audio(audioClip);
					if (audioStage.current === 5) {
						setBackgroundImage(RiskAstleyImage.src);
						setBpmOverride(113);
						setIncrement(0);

						audio.addEventListener(
							"ended",
							() => {
								setBackgroundImage(null);
								setBpmOverride(null);
							},
							{
								once: true,
								passive: true
							}
						);
					} else {
						audio.playbackRate = random(0.8, 1.2);
					}

					audio.volume = 0.5;
					void audio.play();

					if (audioStage.current === 5) audioStage.current = 6;
					if (audioStage.current === 3) audioStage.current = 4;
					if (audioStage.current === 1) audioStage.current = 2;

					setIndicators((previous) => {
						const { x, y } = cursor.get();

						// Between 1 and 10 weighted to lower values.
						const offset = Math.floor(Math.random() ** 2 * 10) + 1;
						setIncrement((previous) => previous + offset);

						const newIndicator = {
							id: indicatorCount.current++,
							created: Date.now(),
							offset,
							ttl: 1000,
							scale: offset * 0.1 + 0.5,
							x,
							y
						};

						return [...previous, newIndicator];
					});
				}}
			>
				<div
					className="relative size-full animate-heartbeat text-neutral-50"
					style={{
						animationDuration: `${Math.max(1 / bps, 0.15).toFixed(2)}s`
					}}
				>
					<svg
						className="size-full fill-pink-400"
						version="1.0"
						viewBox="0 0 645 585"
						xmlns="http://www.w3.org/2000/svg"
					>
						{backgroundImage && (
							<defs>
								<pattern
									height="800"
									id="heart-image"
									patternUnits="userSpaceOnUse"
									width="800"
								>
									<image
										height="800"
										href={backgroundImage}
										width="800"
										x="0"
										y="0"
									/>
								</pattern>
							</defs>
						)}
						<path
							d="m297.3 550.87c-13.775-15.436-48.171-45.53-76.435-66.874-83.744-63.242-95.142-72.394-129.14-103.7-62.685-57.72-89.306-115.71-89.214-194.34 0.044512-38.384 2.6608-53.172 13.41-75.797 18.237-38.386 45.1-66.909 79.445-84.355 24.325-12.356 36.323-17.845 76.944-18.07 42.493-0.23483 51.439 4.7197 76.435 18.452 30.425 16.714 61.74 52.436 68.213 77.811l3.9981 15.672 9.8596-21.585c55.716-121.97 233.6-120.15 295.5 3.0316 19.638 39.076 21.794 122.51 4.3801 169.51-22.715 61.309-65.38 108.05-164.01 179.68-64.681 46.974-137.88 118.05-142.98 128.03-5.9155 11.588-0.28216 1.8159-26.408-27.461z"
							fill={backgroundImage ? "url(#heart-image)" : undefined}
						/>
					</svg>
					{data && !backgroundImage && (
						<m.div
							className="absolute inset-0 -top-4 flex size-full items-center justify-center"
							animate={{
								opacity: 1
							}}
							exit={{
								opacity: 0
							}}
							initial={{
								opacity: 0
							}}
						>
							<div className="flex flex-col items-center">
								{increment !== 0 && (
									<span>
										+
										<TweenNumber value={increment} />
									</span>
								)}
								<span className="text-3xl font-medium">
									<TweenNumber value={bpm} /> bpm
								</span>
								<span className="text-sm">
									<TweenNumber fixed={2} value={bps} /> beats per second
								</span>
							</div>
						</m.div>
					)}
				</div>
				{live && data && (
					<m.div
						className="absolute -right-16 -top-8 flex w-24 rotate-12 flex-col px-2 lg:-right-8"
						animate={{
							opacity: 1
						}}
						exit={{
							opacity: 0
						}}
						initial={{
							opacity: 0
						}}
					>
						<div className="flex items-center gap-2">
							<span className="font-medium uppercase leading-none">Live</span>
							<div className="size-3 animate-pulse rounded-full bg-red-600" />
						</div>
						<span className="w-fit whitespace-nowrap text-xs opacity-80">
							<TweenNumber value={data.latency / 1000} />s delay
						</span>
					</m.div>
				)}
				{indicators.map((value) => (
					<Indicator key={value.id} {...value} />
				))}
			</button>
		</AnimatePresence>
	);
};
