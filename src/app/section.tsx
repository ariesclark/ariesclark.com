/* eslint-disable import/no-named-as-default-member */
"use client";

import { atom, useAtom } from "jotai";
import React, { useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";

export type SectionProps = React.ComponentProps<"section"> & {
	defaultFocus?: boolean;
	desktopOnly?: boolean;
	flagTrigger?: boolean;
	flagClassName?: string;
	focusClassName?: string;
	label?: string;
	labelIcon?: React.ReactElement<React.ComponentProps<"svg">>;
};

const focusedSectionAtom = atom<HTMLElement | null>(null);
const flagFocusedAtom = atom<boolean>(false);

export const Section: React.FC<SectionProps> = (props) => {
	const {
		defaultFocus = false,
		desktopOnly = false,
		flagTrigger = false,
		flagClassName,
		focusClassName,
		label,
		labelIcon,
		...elementProps
	} = props;

	const [focusedSection, setFocusedSection] = useAtom(focusedSectionAtom);
	const [flagFocused, setFlagFocused] = useAtom(flagFocusedAtom);

	const ref = useRef<HTMLElement>(null);

	const focused = useMemo(() => {
		if (ref.current === null) return defaultFocus;
		return ref.current === focusedSection;
	}, [focusedSection, defaultFocus]);

	const expandable = !!labelIcon;

	return (
		<section
			{...elementProps}
			ref={ref}
			tabIndex={expandable ? 0 : -1}
			className={twMerge(
				props.className,
				"overflow-hidden flex-col focus:outline-none gap-8",
				desktopOnly ? "hidden lg:flex" : "flex",
				flagFocused && flagClassName,
				focused && focusClassName,
				focused ? "shrink-0 lg:w-100" : "lg:w-screen-1/9 min-w-0"
			)}
			onFocus={({ currentTarget }) => {
				if (!expandable) return;
				setFocusedSection(currentTarget);
				setFlagFocused(flagTrigger);
			}}
			onMouseEnter={({ currentTarget }) => {
				if (!expandable) return;
				setFocusedSection(currentTarget);
				setFlagFocused(flagTrigger);
			}}
		>
			<div
				className={twMerge(
					"flex w-full whitespace-nowrap p-8 md:p-16 lg:pb-0 pb-0 relative",
					flagFocused && "lg:opacity-0",
					focused ? "" : "px-8"
				)}
			>
				{label && desktopOnly && (
					<div
						className={twMerge(
							"flex absolute pointer-events-none top-0 pt-32 z-50 left-0 w-full justify-center delay-[0ms] duration-100",
							focused ? "opacity-0" : "opacity-100"
						)}
					>
						<span
							className={twMerge("text-xl font-nunito font-bold")}
							style={{ writingMode: "sideways-rl", textOrientation: "sideways" }}
						>
							{label}
						</span>
					</div>
				)}
				<div
					className={twMerge(
						"flex w-full items-center md:justify-center",
						focused ? "gap-8" : "gap-8 md:gap-0"
					)}
				>
					{labelIcon &&
						React.cloneElement(labelIcon, {
							className: twMerge("shrink-0 w-9 h-9", focused ? "" : "md:grow")
						})}
					{label && (
						<span
							className={twMerge(
								"text-xl font-nunito font-bold",
								focused ? "opacity-100 grow w-fit" : "lg:opacity-0 lg:w-0 lg:grow-0"
							)}
						>
							{label}
						</span>
					)}
				</div>
			</div>
			<div
				className={twMerge(
					"grow lg:w-100 p-8 lg:p-16 lg:pt-0 pt-0 h-full overflow-y-auto",
					focused ? "opacity-100" : "lg:opacity-0"
				)}
			>
				{props.children}
			</div>
		</section>
	);
};
