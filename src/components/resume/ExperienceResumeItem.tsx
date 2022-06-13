import { experience } from "../../lib/config";
import { getMonthYear, getYearSince } from "../../lib/date";
import { Link } from "../Link";
import { Markdown } from "../Markdown";

export const ExperienceResumeItem: React.FC<{ item: typeof experience[number] }> = ({ item }) => (
	<Link className="flex flex-col hover:text-inherit" href={item.href}>
		<span className="font-bold">{item.name}</span>
		<div className="flex flex-col">
			<span>{item.title}</span>
			<span className="font-mono text-xs text-black/80">
				{getMonthYear(item.from)} to {item.to ? getMonthYear(item.to) : "present"}
				{item.to && <span> — {item.to ? getYearSince(item.from, item.to) : ""} years</span>}
			</span>
		</div>
		<Markdown className="max-w-lg text-sm">{item.description}</Markdown>
	</Link>
);
