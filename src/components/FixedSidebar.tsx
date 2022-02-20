import Link from "next/link";
import { HTMLAttributes } from "react";

import { IconGitHub } from "./icons/GitHub";
import { IconLinkedIn } from "./icons/LinkedIn";
import { IconMail } from "./icons/Mail";
import { IconTwitter } from "./icons/Twitter";

interface ItemDescriptor {
    name: string,
    href: string,
    icon: React.FC<HTMLAttributes<SVGSVGElement>>
}

const items: ItemDescriptor[] = [
	{
		name: "Mail",
		href: "mailto:me@ariesclark.com",
		icon: IconMail
	},
	{
		name: "LinkedIn",
		href: "https://www.linkedin.com/in/ariesc/",
		icon: IconLinkedIn
	},
	{
		name: "Twitter",
		href: "https://twitter.com/ariesrclark/",
		icon: IconTwitter
	},
	{
		name: "GitHub",
		href: "https://github.com/ariesclark/",
		icon: IconGitHub
	}
];

export const FixedSidebar: React.VFC = function () {
	return (
		<aside className="flex items-center px-8 sm:py-8 sm:h-screen sm:fixed">
			<ul className="flex w-full gap-6 sm:flex-col">
				{items.map((descriptor) => {
					const Icon = descriptor.icon;

					return (
						<li key={descriptor.name} className="flex h-full">
							<Link href={descriptor.href}>
								<a target="_blank" className="my-auto">
									<Icon className="w-6 hover:scale-150 hover:text-red-400" />
								</a>
							</Link>

						</li>
					);
				})}
			</ul>
		</aside>
	);
};
