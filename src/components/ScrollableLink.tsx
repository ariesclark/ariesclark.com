import Link from "next/link";
import React, { EventHandler, useCallback } from "react";

export const ScrollableLink: React.FC<{ href: string }> = function (props) {
	const { href, children } = props;

	const handle = useCallback<EventHandler<never>>((event: Event) => {
		if (!href.startsWith("#") || !document.querySelector(href)) return;

		event.preventDefault();
		document.querySelector(href)?.scrollIntoView({
			behavior: "smooth",
		});
	}, [href]);

	return (
		<Link href={href} passHref>
			<a role="link" tabIndex={0} onClick={handle} onKeyDown={handle}>
				{children}
			</a>
		</Link>
	);
};
