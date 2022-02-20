import { Button } from "./Button";
import { ScrollableLink } from "./ScrollableLink";

type HeaderItemProps = { label: string, href: string };
const HeaderItem: React.VFC<HeaderItemProps> = function (props) {
	const { label, href } = props;

	return (
		<li className="my-auto border border-transparent rounded marker:text-red-400">
			<ScrollableLink href={href}>
				<span className="text-neutral-200 hover:text-red-400 hover:underline">
					{label}
				</span>
			</ScrollableLink>
		</li>
	);
};

export const Header: React.FC = function () {
	return (
		<header className="flex">
			<div className="container flex flex-col px-8 py-8 mx-auto font-mono text-sm md:flex-row ">
				<div className="flex-grow" />
				<div className="flex flex-col gap-x-16 gap-y-4 md:flex-row">
					<ul className="flex flex-wrap justify-between gap-x-10 list-[decimal-leading-zero] list-inside">
						<HeaderItem label="About" href="#about" />
						<HeaderItem label="Experience" href="#experience" />
						<HeaderItem label="Work" href="#projects" />
						<HeaderItem label="Resume" href="/" />
					</ul>
					<div className="w-full h-10 ml-auto sm:w-32">
						<ScrollableLink href="#contact">
							<Button name="Contact" />
						</ScrollableLink>
					</div>
				</div>
			</div>
		</header>
	);
};
