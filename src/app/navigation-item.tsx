"use client";

import { twMerge } from "tailwind-merge";

import { Link } from "./link";

import type { FC, PropsWithChildren } from "react";

export const NavigationItem: FC<
	PropsWithChildren<{ href?: string; disabled?: boolean }>
> = ({ href, disabled, children }) => {
	return (
		<Link
			href={href ?? "/"}
			className={twMerge(
				"cursor-pointer p-2 uppercase transition-all",
				disabled && "opacity-75"
			)}
		>
			{children}
		</Link>
	);
};
