import {
	SiDiscord,
	SiGithub,
	SiLinkedin,
	SiTwitter
} from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";

import { urls } from "~/environment";

import { Link } from "./link";

import type { ComponentProps, FC } from "react";

const SocialItem: FC<{
	Icon: FC<ComponentProps<"svg">>;
	href: string;
	last?: boolean;
}> = ({ Icon, href, last = false }) => (
	<>
		<Link
			className="transition-all hover:scale-110"
			href={href}
			target="_blank"
		>
			<Icon className="size-7 lg:size-8" />
		</Link>
		{!last && (
			<hr className="h-0.5 w-3 rounded-full border-none bg-black/50 dark:bg-white/50 lg:rotate-90" />
		)}
	</>
);

export const SocialList: FC = () => {
	return (
		<div className="sticky top-0 flex h-full items-center gap-4 lg:flex-col">
			<SocialItem href={urls.socials.email} Icon={Mail} />
			<SocialItem href={urls.socials.twitter} Icon={SiTwitter} />
			<SocialItem href={urls.socials.github} Icon={SiGithub} />
			<SocialItem href={urls.socials.linkedin} Icon={SiLinkedin} />
			<SocialItem last href={urls.socials.discord} Icon={SiDiscord} />
		</div>
	);
};
