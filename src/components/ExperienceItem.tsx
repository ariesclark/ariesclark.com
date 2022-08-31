import { experience } from "../lib/config";
import { getMonthYear, getYearSince } from "../lib/date";

import { IconExternalLink } from "./icons/ExternalLink";
import { Link } from "./Link";
import { Markdown } from "./Markdown";
import { OutlinedImage } from "./OutlinedImage";

export const ExperienceItem: React.FC<{
	item: typeof experience[number];
}> = ({ item }) => (
	<div className="flex flex-col grow gap-4 w-96 max-w-lg">
		<div className="flex gap-4 items-baseline ">
			<Link className="hover:text-white" href={item.href}>
				<span className="font-inter text-2xl font-semibold">{item.name}</span>
			</Link>
			<span className="font-mono text-xs text-neutral-300">
				{getMonthYear(item.from)} to {item.to ? getMonthYear(item.to) : "present"}
				{item.to && (
					<>
						{" — "}
						<span>{item.to ? getYearSince(item.from, item.to) : ""} year(s)</span>
					</>
				)}
			</span>
		</div>
		<div className="flex gap-4 ">
			<div className="flex flex-col gap-4">
				<Link href={item.href}>
					<OutlinedImage
						className="shrink-0 w-24 h-24"
						referrerPolicy="no-referrer"
						src={item.logo}
					/>
				</Link>

				<div className="flex gap-1 justify-end">
					<Link href={item.href}>
						<IconExternalLink className="h-8" />
					</Link>
				</div>
			</div>
			<div className="overflow-hidden w-full bg-neutral-800 rounded border-r-2 border-red-400 shadow-2xl">
				<div className="flex gap-2 py-3 px-4 text-sm bg-black/20">
					<span className="pr-2 border-r border-neutral-700">{item.title}</span>
					<span>{item.type}</span>
				</div>
				<div className="flex flex-col gap-4 py-3 px-4 w-full">
					<Markdown>{item.description}</Markdown>
				</div>
			</div>
		</div>
	</div>
);
