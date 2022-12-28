import React from "react";
import { Inter, Nunito, Itim } from "@next/font/google";
import { twMerge } from "tailwind-merge";

import { siteUrl } from "~/config";

import { ClientScripts } from "./client-scripts";

import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const itim = Itim({ weight: "400", subsets: ["latin"], variable: "--font-itim" });

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
	<html>
		<head>
			<title>Aries Clark</title>
			<meta content="width=device-width, initial-scale=1.0" name="viewport" />
			<meta content="Aries Clark" property="og:title" />
			<meta content="ariesclark.com" property="og:site_name" />
			<meta content="summary_large_image" name="twitter:card" />
			<meta content={`${siteUrl}/api/og`} name="twitter:image" />
			<meta content={`${siteUrl}/api/og`} property="og:image" />
			<ClientScripts />
		</head>
		<body
			className={twMerge(
				"bg-black-200 text-white-100",
				inter.variable,
				nunito.variable,
				itim.variable
			)}
		>
			{children}
		</body>
	</html>
);

export default RootLayout;
