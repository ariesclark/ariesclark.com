import { LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { connections } from "~/config";

import { Section } from "./section";

export const SectionConnections: React.FC = () => (
	<Section
		className="bg-black-300 text-white-100"
		flagClassName="bg-red-300"
		label="Connections"
		labelIcon={<LinkIcon />}
	>
		<div className="flex gap-4 justify-between">
			{connections.map(({ name, href, Icon }, connectionIdx) => (
				<Link className="flex gap-2 items-center" href={href} key={connectionIdx}>
					<Icon className="w-8" />
					<span className="font-nunito font-semibold text-lg">{name}</span>
				</Link>
			))}
		</div>
	</Section>
);
