import { getIcon } from "./icons";
import { Link } from "./Link";

export interface SocialDescriptor {
	name: string;
	href: string;
}

export const FixedSidebar: React.VFC<{ items: Array<SocialDescriptor> }> = function (props) {
	const { items } = props;

	return (
		<aside className="flex items-center px-8 sm:fixed sm:py-8 sm:h-screen">
			<ul className="flex gap-6 w-full sm:flex-col">
				{items.map((descriptor) => {
					const Icon = getIcon(descriptor.name);

					return (
						<li className="flex h-full" key={descriptor.name}>
							<Link className="my-auto" href={descriptor.href}>
								<Icon className="w-6 hover:text-red-400 hover:scale-150" />
							</Link>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};
