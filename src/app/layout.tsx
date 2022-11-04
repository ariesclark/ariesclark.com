import React from "react";
import { Inter, Nunito } from "@next/font/google";
import { twMerge } from "tailwind-merge";

import { ClientScripts } from "./client-scripts";
import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
	<html>
		<head>
			<title>Aries Clark</title>
			<ClientScripts />
		</head>
		<body className={twMerge("text-white bg-black-200", inter.variable, nunito.variable)}>
			{children}
		</body>
	</html>
);

export default RootLayout;
