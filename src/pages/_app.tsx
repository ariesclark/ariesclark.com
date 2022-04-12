/* eslint-disable no-console */
import "../../styles/globals.scss";
import Script from "next/script";
import { useEffect } from "react";
import { random } from "@ariesclark/utils";

import type { AppProps } from "next/app";

let played: boolean = false;
export default function App ({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (random.range(0, 1) === 1) {
			console.log("Huh, what was that?");

			document.addEventListener("click", () => {
				setTimeout(() => {
					if (played) return;
					new Audio("/DiscordPingEffect.mp3").play();
					played = true;
				}, random.range(500, 2000));
			});
		}
	}, []);

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script
				id="google-analytics"
				strategy="afterInteractive"
			>
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){window.dataLayer.push(arguments);}
					gtag('js', new Date());
							
					gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
				`}
			</Script>
			<Component {...pageProps} />
		</>
	);
}
