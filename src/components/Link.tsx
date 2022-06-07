import NextLink from "next/link";
import { useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { siteUrl } from "../lib/config";

export const Link: React.FC<
	Omit<
		React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
		"onClick" | "onKeyDown"
	>
> = (props) => {
	const href = props.href || "#";
	const url = useMemo(() => new URL(href, siteUrl), [href]);

	const onHandle = useCallback<React.EventHandler<never>>(
		(event: Event) => {
			if (!href || href === "#" || !href.startsWith("#") || !document.querySelector(href)) return;

			event.preventDefault();
			document.querySelector(href)?.scrollIntoView({
				behavior: "smooth"
			});
		},
		[href]
	);

	return (
		<NextLink href={href}>
			<a
				{...props}
				className={twMerge("hover:text-red-400 hover:underline", props.className)}
				tabIndex={props.tabIndex ?? 0}
				target={props.target || url.origin === siteUrl ? "_self" : "_blank"}
				onClick={onHandle}
				onKeyDown={onHandle}
			>
				{props.children}
			</a>
		</NextLink>
	);
};
