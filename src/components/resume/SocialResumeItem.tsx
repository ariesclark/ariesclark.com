import { socials } from "../../lib/config";
import { prettyUrl } from "../../lib/url";
import { getIcon } from "../icons";
import { Link } from "../Link";

export const SocialResumeItem: React.FC<{ item: typeof socials[number] }> = ({ item }) => {
	const Icon = getIcon(item.name);

	return (
		<Link
			className="group flex gap-2 justify-end items-center text-sm hover:text-inherit"
			href={item.href}
		>
			<span className="shrink-0 text-xs">{prettyUrl(item.href)}</span>
			<Icon className="w-5 h-5 text-neutral-600 group-hover:text-black" />
		</Link>
	);
};
