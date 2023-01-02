"use client";

import React, { useEffect, useId, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { useGlobalState } from "~/hooks/use-global-state";

export type HeartProps = Omit<React.ComponentProps<"div">, "children"> & {
	bpm?: number;
	artificialBoost?: number;
	noAudio?: boolean;
	noText?: boolean;
	children?: React.ReactNode;
};

type HeartGradientProps = React.ComponentProps<"svg"> & { animate?: boolean };

const HeartGradient: React.FC<HeartGradientProps> = ({ animate = true, ...props }) => {
	const gradientId = useId();

	return (
		<svg
			{...props}
			className={twMerge("w-full text-red-100", animate && "animate-heartbeat", props.className)}
			version="1.0"
			viewBox="0 0 645 585"
			xmlns="http://www.w3.org/2000/svg"
		>
			<linearGradient id={gradientId}>
				<stop offset="0%" stopColor="#cf4f4f" />
				<stop offset="100%" stopColor="#c03535" />
			</linearGradient>
			<path
				d="m297.3 550.87c-13.775-15.436-48.171-45.53-76.435-66.874-83.744-63.242-95.142-72.394-129.14-103.7-62.685-57.72-89.306-115.71-89.214-194.34 0.044512-38.384 2.6608-53.172 13.41-75.797 18.237-38.386 45.1-66.909 79.445-84.355 24.325-12.356 36.323-17.845 76.944-18.07 42.493-0.23483 51.439 4.7197 76.435 18.452 30.425 16.714 61.74 52.436 68.213 77.811l3.9981 15.672 9.8596-21.585c55.716-121.97 233.6-120.15 295.5 3.0316 19.638 39.076 21.794 122.51 4.3801 169.51-22.715 61.309-65.38 108.05-164.01 179.68-64.681 46.974-137.88 118.05-142.98 128.03-5.9155 11.588-0.28216 1.8159-26.408-27.461z"
				fill={`url(#${gradientId})`}
			/>
		</svg>
	);
};

export const Heart: React.FC<HeartProps> = ({
	bpm = 0,
	artificialBoost: artificialBoost = 0,
	noAudio,
	noText,
	...props
}) => {
	const [{ loaded, muted }] = useGlobalState();
	const audioRef = useRef<HTMLAudioElement>(null);

	// Beats per second.
	const bps = bpm / 60;

	useEffect(() => {
		if (!audioRef.current || noAudio) return;
		audioRef.current.playbackRate = bps;
	}, [bps, noAudio]);

	useEffect(() => {
		if (!audioRef.current || !loaded || noAudio) return;

		audioRef.current.volume = muted ? 0 : 1;
		void audioRef.current.play();
	}, [loaded, muted, noAudio]);

	return (
		<div
			{...props}
			className={twMerge(
				"relative flex w-64 cursor-pointer select-none items-center justify-center",
				props.className
			)}
		>
			<HeartGradient
				className="w-full animate-heartbeat text-red-100"
				style={{ animationDuration: `${(1 / bps).toFixed(1)}s` }}
			/>
			{!noAudio && <audio loop ref={audioRef} src="/heartbeat.wav" />}
			{!noText && (
				<div className="absolute -mt-4 flex flex-col items-center font-nunito text-white-100">
					{artificialBoost !== 0 && (
						<span className="absolute -top-4 text-xs text-white-300">+{artificialBoost}</span>
					)}
					<span className="text-3xl font-bold">{bpm} bpm</span>
					<span className="text-sm">{bps.toFixed(1)} beats per second</span>
				</div>
			)}
		</div>
	);
};
