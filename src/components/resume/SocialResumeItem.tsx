import { classes } from "../../lib/classes";
import { socials } from "../../lib/config";
import { prettyUrl } from "../../lib/url";
import { getIcon } from "../icons";
import { Link } from "../Link";

export const SocialResumeItem: React.FC<{ print: boolean; item: typeof socials[number] }> = ({
	print,
	item
}) => {
	const Icon = getIcon(item.name);

	return (
		<Link
			href={item.href}
			className={classes([
				"group flex gap-2 justify-end items-center text-sm hover:text-inherit",
				print || "sm:flex-row flex-row-reverse"
			])}
		>
			<span className="shrink-0 text-xs">{prettyUrl(item.href)}</span>
			<Icon className="w-5 h-5 text-neutral-600 group-hover:text-black" />
		</Link>
	);
};
