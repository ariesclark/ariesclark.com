import { Button } from "./Button";
import { CanadaFlag } from "./CanadaFlag";
import { ScrollableLink } from "./ScrollableLink";

export const CallToAction: React.FC = function () {
	return (
		<div className="max-w-4xl mx-auto my-16 sm:my-32">
			<div className="flex flex-col space-y-8">
				<div className="flex flex-col space-y-2">
					<h3 className="font-mono text-red-400">
						Hi, my name is
					</h3>
					<h1 className="text-5xl font-bold sm:text-7xl md:text-8xl font-inter">
						Aries Clark.
					</h1>
					<div className="flex space-x-8">
						<h2 className="flex-none px-4 py-2 text-2xl font-bold bg-red-500 rounded text-neutral-900 h-fit sm:text-5xl md:text-6xl font-inter w-fit">
							Software Engineer
						</h2>
						<CanadaFlag className="w-16 my-auto rounded sm:w-32" />
					</div>

				</div>
				<p className="max-w-lg">
					I&apos;m a proud Canadian software engineer with a passion for developing (and occasionally designing) products and
					services that change the way we look at the ever expanding internet.
				</p>
				<div className="w-64 h-10">
					<ScrollableLink href="#about">
						<Button name="Learn more" />
					</ScrollableLink>
				</div>
			</div>

		</div>
	);
};
