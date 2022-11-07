import { LinkIcon } from "@heroicons/react/24/solid";
import { Gmail } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import Image from "next/image";

import { emailAddress } from "~/config";
import SelfImage from "~/../public/images/self1.jpeg";

import { ConnectionGitHub } from "./connection-github";
import { ConnectionSpotify } from "./connection-spotify";
import { ConnectionTwitter } from "./connection-twitter";
import { Section } from "./section";

export const SectionConnections: React.FC = () => {
	return (
		<Section
			className="bg-black-300 text-white-100 order-last lg:order-first"
			flagClassName="bg-red-300"
			label="Connections"
			labelIcon={<LinkIcon />}
		>
			<div className="flex gap-4 justify-between flex-col">
				<ConnectionSpotify />
				<div className="w-full rounded-lg shadow-highlight bg-black-200 relative flex flex-col overflow-hidden">
					<div className="items-center flex p-4 gap-4">
						<Image
							alt="An image of myself"
							className="rounded-lg h-12 w-12 object-cover"
							src={SelfImage}
						/>
						<Link
							className="select-none flex flex-col justify-center before:absolute before:w-full before:h-full before:top-0 before:left-0"
							href={`mailto:${emailAddress}`}
							target="_blank"
						>
							<span className="font-bold leading-none select-text">{emailAddress}</span>
							<span className="text-white-400 text-sm select-none">
								Send me an interesting email
							</span>
						</Link>
						<div className="ml-auto mr-4 flex gap-4 shrink-0">
							<Gmail className="w-8 h-8" />
						</div>
					</div>
				</div>
				<ConnectionGitHub />
				{/* @ts-expect-error: Server Component */}
				<ConnectionTwitter />
			</div>
		</Section>
	);
};
