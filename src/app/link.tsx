"use client";

import LinkPrimitive, { LinkProps } from "next/link";
import { ComponentProps, FC, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { random } from "~/utils/number";

const hoverSoundDelay = 100;

export const Link: FC<ComponentProps<"a"> & LinkProps> = ({
	"aria-disabled": disabled = false,
	className,
	children,
	onPointerEnter,
	onPointerLeave,
	onClick,
	...props
}) => {
	const hovering = useRef<ReturnType<typeof setTimeout>>();

	return (
		<LinkPrimitive
			aria-disabled={disabled ? "true" : undefined}
			className={twMerge(
				"rounded outline-offset-2 outline-white focus:outline",
				className
			)}
			onClick={(event) => {
				onClick?.(event);

				if (disabled) {
					//event.preventDefault();
					return;
				}

				const audio = new Audio("/sounds/woosh.mp3");

				audio.volume = 0.5;
				audio.playbackRate = random(0.9, 1.1);

				void audio.play();
			}}
			onPointerEnter={(event) => {
				if (disabled) {
					event.preventDefault();
					return;
				}

				const audio = new Audio("/sounds/hover.mp3");

				audio.volume = 0.5;
				audio.playbackRate = random(0.9, 1.1);

				hovering.current = setTimeout(() => {
					if (!hovering.current) return;
					//return audio.play();
				}, hoverSoundDelay);

				onPointerEnter?.(event);
			}}
			onPointerLeave={(event) => {
				clearTimeout(hovering.current);
				onPointerLeave?.(event);
			}}
			{...props}
		>
			{children}
		</LinkPrimitive>
	);
};
