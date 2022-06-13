import { projects } from "../../lib/config";
import { Link } from "../Link";
import { Markdown } from "../Markdown";

export const ProjectResumeItem: React.FC<{ item: typeof projects.featured[number] }> = ({
	item: { name, href, description, keywords }
}) => (
	<Link className="flex flex-col gap-2 hover:text-inherit" href={href}>
		<div className="flex flex-col">
			<span className="font-bold">{name}</span>
			<ul className="flex flex-wrap gap-x-2 text-xs">
				{keywords.map((item, idx) => (
					<li className="shrink-0" key={idx}>
						{item.name}
					</li>
				))}
			</ul>
		</div>
		<Markdown className="pl-2 max-w-lg text-sm border-l-2 border-black/40">{`${description
			.slice(0, 256)
			.trim()}...`}</Markdown>
	</Link>
);
