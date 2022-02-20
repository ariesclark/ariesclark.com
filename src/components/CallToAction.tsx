import { Button } from "./Button";
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
					<h2 className="px-4 py-2 text-2xl font-bold text-black bg-red-500 sm:text-5xl md:text-6xl font-inter w-fit">
						Software Engineer
					</h2>
				</div>
				<p className="max-w-lg">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pellentesque tempus diam,
					id scelerisque quam sodales at. Pellentesque tincidunt condimentum libero, vitae tempor quam ullamcorper nec.
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
