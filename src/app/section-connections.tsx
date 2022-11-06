import { LinkIcon } from "@heroicons/react/24/solid";

import { ConnectionSpotify } from "./connection-spotify";
import { ConnectionTwitter } from "./connection-twitter";
import { Section } from "./section";

export const SectionConnections: React.FC = () => {
	return (
		<Section
			className="bg-black-300 text-white-100"
			flagClassName="bg-red-300"
			label="Connections"
			labelIcon={<LinkIcon />}
		>
			<div className="flex gap-4 justify-between flex-col">
				<ConnectionSpotify />
				{/* @ts-expect-error: Server Component */}
				<ConnectionTwitter />
			</div>
		</Section>
	);
};
