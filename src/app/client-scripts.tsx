"use client";

import Script from "next/script";

import { gaMeasurementId } from "~/config";

export const ClientScripts: React.FC = () => (
	<>
		<Script
			src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
			strategy="worker"
		/>
		<Script id="google-analytics" strategy="worker">
			{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){window.dataLayer.push(arguments);}
				gtag('js', new Date());
							
				gtag('config', '${gaMeasurementId}');
			`}
		</Script>
	</>
);
