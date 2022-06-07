import "../../styles/globals.scss";
import Script from "next/script";

import { gaMeasurementId } from "../lib/config";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){window.dataLayer.push(arguments);}
					gtag('js', new Date());
							
					gtag('config', '${gaMeasurementId}');
				`}
			</Script>
			<Component {...pageProps} />
		</>
	);
}
