import React from "react";
import { Inter, Nunito } from "@next/font/google";
import { twMerge } from "tailwind-merge";

import { ClientScripts } from "./client-scripts";

import "~/styles/globals.css";
import { siteUrl } from "~/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
	<html>
		<head>
			<title>Aries Clark</title>
			<meta content="width=device-width, initial-scale=1.0" name="viewport" />
			<meta content={`${siteUrl}/api/og`} property="og:image" />
			<ClientScripts />
		</head>
		<body className={twMerge("text-white bg-black-200", inter.variable, nunito.variable)}>
			{children}
		</body>
	</html>
);

export default RootLayout;
