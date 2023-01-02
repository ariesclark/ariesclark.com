import React from "react";
import { Inter, Nunito } from "@next/font/google";
import { twMerge } from "tailwind-merge";

import { siteUrl, twitterUsername } from "~/config";

import { Cursor } from "./cursor";
import { ClientScripts } from "./client-scripts";

import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
	<html>
		<head>
			<title>Aries Clark</title>
			<meta content="width=device-width, initial-scale=1.0" name="viewport" />
			<meta content="Aries Clark" property="og:title" />
			<meta content="ariesclark.com" property="og:site_name" />
			<meta content="summary_large_image" name="twitter:card" />
			<meta content={twitterUsername} name="twitter:site" />
			<meta content={twitterUsername} name="twitter:creator" />
			<meta content={`${siteUrl}/api/og`} property="og:image" />
			<ClientScripts />
		</head>
		<body
			className={twMerge(
				"h-screen w-screen overflow-hidden bg-black-200 text-white-100",
				inter.variable,
				nunito.variable
			)}
		>
			<Cursor />
			{children}
		</body>
	</html>
);

export default RootLayout;
