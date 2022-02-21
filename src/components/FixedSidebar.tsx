import Link from "next/link";

import { getIcon, iconMap } from "./icons";

export interface SocialDescriptor {
    name: string,
    href: string,
}

export const FixedSidebar: React.VFC<{ items: SocialDescriptor[] }> = function (props) {
	const { items } = props;

	return (
		<aside className="flex items-center px-8 sm:py-8 sm:h-screen sm:fixed">
			<ul className="flex w-full gap-6 sm:flex-col">
				{items.map((descriptor) => {
					const Icon = getIcon(descriptor.name);

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
