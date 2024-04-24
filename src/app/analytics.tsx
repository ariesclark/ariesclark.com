"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { type FC, type PropsWithChildren, use, useEffect } from "react";

import { googleAnalyticsId, posthogHost, posthogKey } from "~/environment";

async function getPosthog() {
	if (typeof window === "undefined") return null;

	const [{ posthog }, { PostHogProvider }] = await Promise.all([
		import("posthog-js"),
		import("posthog-js/react")
	]);

	posthog.init(posthogKey, {
		api_host: posthogHost,
		ui_host: "https://app.posthog.com",
		capture_pageview: false
	});

	return { posthog, PostHogProvider };
}

// eslint-disable-next-line unicorn/prefer-top-level-await
const posthogPromise = getPosthog();

const PosthogProvider = dynamic(
	async () => {
		const { posthog, PostHogProvider } = (await posthogPromise)!;

		// eslint-disable-next-line react/display-name
		return ({ children }: PropsWithChildren) => (
			<PostHogProvider client={posthog}>{children}</PostHogProvider>
		);
	},
	{ ssr: false }
);

const Pageview: FC = () => {
	const { posthog } = use(posthogPromise)!;

	const pathname = usePathname();
	const searchParameters = useSearchParams();

	useEffect(() => {
		if (!posthog || !pathname) return;

		const query =
			searchParameters.size > 0 ? `?${searchParameters.toString()}` : "";
		const url = `${window.origin}?${pathname}${query}`;

		posthog.capture("$pageview", {
			$current_url: url
		});
	}, [pathname, searchParameters, posthog]);

	return null;
};

export function AnalyticProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<SpeedInsights />
			<GoogleAnalytics gaId={googleAnalyticsId} />
			<PosthogProvider>
				<Pageview />
			</PosthogProvider>
			{children}
		</>
	);
}
