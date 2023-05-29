import React from "react";
import { Inter, Nunito } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

import { twitterUsername } from "~/config";
import { SWRConfig } from "~/components/swr-config";
import { getMetadata } from "~/metadata";

import { Cursor } from "./cursor";
import { ClientScripts } from "./client-scripts";

import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
	title: "Aries Clark",
	description: "Canadian software engineer",
	viewport: "width=device-width, initial-scale=1.0",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const metadata = await getMetadata();

	return (
		<html lang="en">
			<head>
				<ClientScripts />
			</head>
			<SWRConfig
				value={{
					fallback: {
						metadata
					}
				}}
			>
				<body
					className={twMerge(
						"relative h-screen w-screen overflow-hidden bg-black-200 text-white-100",
						inter.variable,
						nunito.variable
					)}
				>
					<Cursor />
					{children}
				</body>
			</SWRConfig>
		</html>
	);
}
