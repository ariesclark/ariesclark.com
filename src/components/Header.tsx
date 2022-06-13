import { Button } from "./Button";
import { Link } from "./Link";

interface HeaderItemProps {
	label: string;
	href: string;
}
const HeaderItem: React.VFC<HeaderItemProps> = function (props) {
	const { label, href } = props;

	return (
		<li className="my-auto marker:text-red-400 rounded border border-transparent">
			<Link href={href}>
				<span className="text-neutral-200 hover:text-red-400 hover:underline">{label}</span>
			</Link>
		</li>
	);
};

export const Header: React.FC = function () {
	return (
		<header className="flex">
			<div className="container flex flex-col p-8 mx-auto font-mono text-sm md:flex-row">
				<div className="grow" />
				<div className="flex flex-col gap-x-16 gap-y-4 md:flex-row">
					<ul className="flex flex-wrap gap-x-10 justify-between list-inside">
						<HeaderItem href="#about" label="About" />
						<HeaderItem href="#experience" label="Experience" />
						<HeaderItem href="#projects" label="Work" />
						<HeaderItem href="/resume" label="Resume" />
					</ul>
					<div className="ml-auto w-full h-10 sm:w-32">
						<Link href="#contact">
							<Button name="Contact" />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
