import Head from "next/head";

import { siteDescription, siteTitle, siteUrl, twitterUsername } from "../lib/config";

export interface CommonHeadProps {
	subtitle?: string;
}

export const CommonHead: React.FC<CommonHeadProps> = (props) => (
	<Head>
		<title>
			{siteTitle}
			{props.subtitle ? ` – ${props.subtitle}` : ""}
		</title>
		<meta content={siteDescription} property="og:description" />
		<meta content={siteTitle} property="og:title" />
		<meta content={siteUrl} property="og:site_name" />
		<meta content={siteUrl + "/images/cover.jpg"} property="og:image" />
		<meta content="summary_large_image" name="twitter:card" />
		{twitterUsername && (
			<>
				<meta content={`@${twitterUsername}`} name="twitter:site" />
				<meta content={`@${twitterUsername}`} name="twitter:creator" />
			</>
		)}
	</Head>
);
