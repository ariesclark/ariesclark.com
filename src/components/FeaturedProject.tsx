import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { markdownComponents } from "../lib/markdown";

import { getIcon, iconMap } from "./icons";

interface KeywordDescriptor {
	name: string;
	href: string;
}
interface LinkDescriptor {
	name: string;
	href: string;
	icon: keyof typeof iconMap;
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
			<Link href={href}>
				<a
					className="group relative grow-0 mr-4 mb-4 w-fit h-fit md:w-[32rem] lg:w-[48rem] xl:w-[64rem]    "
					target="_blank"
				>
					<div className="block absolute z-0 w-full h-full rounded border-2 border-red-400 translate-x-4 group-hover:translate-x-3 translate-y-4 group-hover:translate-y-3" />
					<div className="block absolute z-20 w-full h-full bg-red-400 rounded opacity-40 group-hover:opacity-0" />
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						alt={`Screenshot of ${name}`}
						className="rounded brightness-90 group-hover:brightness-100 contrast-100 grayscale group-hover:grayscale-0"
						src={image}
					/>
				</a>
			</Link>
			<div
				className={`flex flex-col w-full mt-8 md:mt-0 space-y-4 ${
					alignRight ? "text-right md:-ml-16" : "text-left md:-mr-16"
				}`}
			>
				<div className={`flex flex-col ${alignRight ? "md:ml-24" : "md:mr-24"}`}>
					<span className="font-mono text-sm text-red-400">Featured Project</span>
					<Link href={href}>
						<a className="font-inter text-xl font-bold lg:text-2xl" target="_blank">
							{name}
						</a>
					</Link>
				</div>
				<div
					className={`z-30 p-6 rounded bg-neutral-800 text-neutral-300 shadow-2xl border-red-400 flex flex-col space-y-4 ${
						alignRight ? "border-r-2" : "border-l-2"
					}`}
				>
					<ReactMarkdown components={markdownComponents}>{description}</ReactMarkdown>
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
									<Link href={descriptor.href}>
										<a className="hover:text-red-400 hover:underline" target="_blank">
											{descriptor.name}
										</a>
									</Link>
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
										<a
											className="hover:text-red-400 hover:scale-125"
											target="_blank"
											title={descriptor.name}
										>
											<Icon className="h-6" />
										</a>
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
