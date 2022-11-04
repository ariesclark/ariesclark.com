/* eslint-disable import/no-named-as-default-member */
"use client";

import { atom, useAtom } from "jotai";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export type SectionProps = React.ComponentProps<"section"> & {
	defaultFocus?: boolean;
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

	const [footerHeight, setFooterHeight] = useState(0);
	useEffect(() => {
		if (typeof document === "undefined") return;
		setFooterHeight(document.querySelector("footer")?.getBoundingClientRect().height ?? 0);
	}, []);

	return (
		<section
			{...elementProps}
			ref={ref}
			tabIndex={expandable ? 0 : -1}
			className={twMerge(
				props.className,
				"overflow-hidden flex flex-col focus:outline-none gap-8",
				flagFocused && flagClassName,
				focused && focusClassName,
				focused ? "shrink-0 w-100 " : "w-screen-1/9 min-w-0"
			)}
			style={{
				height: `calc(100vh - ${footerHeight}px)`
			}}
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
					"flex w-full whitespace-nowrap p-16 pb-0 relative",
					flagFocused && "opacity-0",
					focused ? "" : "px-8"
				)}
			>
				{label && (
					<div
						className={twMerge(
							"absolute pointer-events-none top-0 pt-32 flex z-50 left-0 w-full justify-center delay-[0ms] duration-100",
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
						"flex w-full items-center justify-center",
						focused ? "gap-8" : "gap-0"
					)}
				>
					{labelIcon &&
						React.cloneElement(labelIcon, {
							className: twMerge("shrink-0 w-9 h-9", focused ? "" : "grow")
						})}
					{label && (
						<span
							className={twMerge(
								"text-xl font-nunito font-bold",
								focused ? "opacity-100 grow w-fit" : "opacity-0 w-0 grow-0"
							)}
						>
							{label}
						</span>
					)}
				</div>
			</div>
			<div
				className={twMerge(
					"grow w-100 p-16 pt-0 h-full overflow-y-scroll",
					focused ? "opacity-100" : "opacity-0"
				)}
			>
				{props.children}
			</div>
		</section>
	);
};
