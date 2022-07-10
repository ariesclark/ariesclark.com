import { getIcon } from "./icons";
import { Link } from "./Link";
import { Markdown } from "./Markdown";
import { OutlinedImage } from "./OutlinedImage";

interface KeywordDescriptor {
	name: string;
	href: string;
}
interface LinkDescriptor {
	name: string;
	href: string;
	icon: string;
}

export interface FeaturedProjectProps {
	name: string;
	description: string;
	href: string;
	image: string;
	keywords: Array<KeywordDescriptor>;
	links: Array<LinkDescriptor>;
	alignRight?: boolean;
}

export const FeaturedProject: React.VFC<FeaturedProjectProps> = function (props) {
	const { name, description, href, image, keywords, links, alignRight } = props;

	return (
		<div
			className={`relative flex flex-wrap md:flex-nowrap ${
				alignRight ? "flex-row" : "flex-row-reverse"
			}`}
		>
			<Link className="aspect-video w-full" href={href}>
				<OutlinedImage alt={`Screenshot of ${name}`} src={image} />
			</Link>
			<div
				className={`flex flex-col w-full mt-8 md:mt-0 space-y-4 ${
					alignRight ? "text-right md:-ml-16" : "text-left md:-mr-16"
				}`}
			>
				<div className={`flex flex-col ${alignRight ? "md:ml-24" : "md:mr-24"}`}>
					<span className="font-mono text-sm text-red-400">Featured Project</span>
					<Link className="hover:text-white" href={href}>
						<span className="font-inter text-xl font-bold lg:text-2xl">{name}</span>
					</Link>
				</div>
				<div
					className={`z-30 p-6 rounded bg-neutral-800 text-neutral-300 shadow-2xl border-red-400 flex flex-col space-y-4 ${
						alignRight ? "border-r-2" : "border-l-2"
					}`}
				>
					<Markdown>{description}</Markdown>
				</div>
				<div className={`flex flex-col space-y-4 ${alignRight ? "md:ml-24" : "md:mr-24"}`}>
					<div className="flex font-mono text-sm text-neutral-300">
						<ul
							className={`flex flex-wrap gap-x-4 ${
								alignRight ? "flex-row-reverse ml-auto" : "flex-row"
							}`}
						>
							{keywords.map((descriptor) => (
								<li key={descriptor.name}>
									<Link href={descriptor.href}>{descriptor.name}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className={`flex gap-x-4 ${alignRight ? "flex-row-reverse" : "flex-row"}`}>
						{[{ name, href, icon: "ExternalLink" } as LinkDescriptor, ...links].map(
							(descriptor) => {
								const Icon = getIcon(descriptor.icon);

								return (
									<Link href={descriptor.href} key={descriptor.name}>
										<Icon className="h-6" />
									</Link>
								);
							}
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
