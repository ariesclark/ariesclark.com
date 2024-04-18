import { Prompt } from "next/font/google";
import { twMerge } from "tailwind-merge";

import { origin, twitterUsername } from "~/environment";
import { AnimationProvider } from "~/framer";

import { AnalyticProvider } from "./analytics";

import type { Metadata } from "next";

import "./globals.css";

const inter = Prompt({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
	title: "Aries Clark",
	metadataBase: origin,
	twitter: {
		card: "summary_large_image",
		site: twitterUsername,
		creator: twitterUsername
	},
	openGraph: {
		siteName: "ariesclark.com",
		title: "Aries Clark"
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className="dark [font-size:13px] md:[font-size:14px] lg:[font-size:16px]"
			lang="en"
		>
			<AnimationProvider>
				<body
					className={twMerge(
						"flex min-h-svh w-svw flex-col overflow-x-hidden bg-pink-400 p-2",
						inter.className
					)}
				>
					<AnalyticProvider>{children}</AnalyticProvider>
				</body>
			</AnimationProvider>
		</html>
	);
}
