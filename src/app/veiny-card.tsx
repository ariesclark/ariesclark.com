import { useEffect, useId, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useMetadata } from "~/hooks/use-metadata";

function getVeinPoints(nPoints: number, offset: number, height: number) {
	return new Array(nPoints).fill(1).map((_, lineIdx) => ({
		x: lineIdx === 0 || lineIdx === nPoints - 1 ? 0 : lineIdx % 2 === 1 ? offset : -offset,
		y: (height / (nPoints - 1)) * lineIdx
	}));
}

function getVeinLines(nPoints: number, offset: number, height: number) {
	const points = getVeinPoints(nPoints, offset, height);

	return points
		.filter((_, pointIdx) => !!points[pointIdx + 1])
		.map((point, pointIdx) => ({
			x1: point.x,
			y1: point.y,
			x2: points[pointIdx + 1].x,
			y2: points[pointIdx + 1].y
		}));
}

type VeinEdgeStyle = "direct" | "over" | "under" | "none";

interface HeartVeinProps {
	style?: { top?: VeinEdgeStyle; bottom?: Exclude<VeinEdgeStyle, "under"> };
}

const HeartVein: React.FC<HeartVeinProps> = ({ style = { top: "direct", bottom: "direct" } }) => {
	const {
		heartrate: { value: bpm }
	} = useMetadata();
	const gradientId = useId();

	const [offset, setOffset] = useState(0);
	const lines = getVeinLines(3, Math.cos(offset / (8 / (1 - (bpm / 60) * 1.2))) * 4, 128);

	useEffect(() => {
		const handle = setInterval(() => {
			setOffset((offset) => offset + 1);
		}, 1);

		return () => clearInterval(handle);
	}, []);

	return (
		<div className="pointer-events-none absolute top-0 flex h-full items-center">
			{style.top !== "none" && (
				<div className="absolute -top-3 flex h-8 w-16 justify-center rounded-xl bg-black-100">
					{style.top === "over" && (
						<div className="h-8 w-8 rounded-b-full bg-gradient-to-r from-red-100 to-red-300" />
					)}
				</div>
			)}
			{style.top !== "under" ? (
				<div className="w-16" />
			) : (
				<svg
					className="z-20 h-full min-h-full w-16 shrink-0"
					viewBox="-32 0 64 128"
					xmlns="http://www.w3.org/2000/svg"
				>
					<linearGradient id={gradientId}>
						<stop offset="0%" stopColor="#cf4f4f" />
						<stop offset="100%" stopColor="#c03535" />
					</linearGradient>
					<g stroke={`url(#${gradientId})`} strokeLinecap="round" strokeWidth={32}>
						{lines.map((lineProps, lineIdx) => (
							<line {...lineProps} key={lineIdx} />
						))}
					</g>
				</svg>
			)}
			{style.bottom !== "none" && (
				<div className="absolute -bottom-3 flex h-8 w-16 justify-center rounded-xl bg-black-100">
					{style.bottom === "over" && (
						<div className="h-8 w-8 rounded-t-full bg-gradient-to-r from-red-100 to-red-300" />
					)}
				</div>
			)}
		</div>
	);
};

export type VeinyCardProps = React.ComponentProps<"div"> & { veinStyle?: HeartVeinProps["style"] };

export const VeinyCard: React.FC<VeinyCardProps> = ({ veinStyle = {}, ...props }) => {
	return (
		<div
			{...props}
			className={twMerge(
				"relative z-20 flex flex-col items-center gap-4 rounded-xl bg-black-100 p-8 font-light",
				props.className
			)}
		>
			{props.children}
			<HeartVein style={veinStyle} />
		</div>
	);
};
