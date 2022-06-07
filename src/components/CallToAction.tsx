import { ctaSummary, ctaTitle, fullName } from "../lib/config";

import { Button } from "./Button";
import { CanadaFlag } from "./CanadaFlag";
import { Link } from "./Link";

export const CallToAction: React.FC = function () {
	return (
		<div className="my-16 mx-auto max-w-4xl sm:my-32">
			<div className="flex flex-col space-y-8">
				<div className="flex flex-col space-y-2">
					<h3 className="font-mono text-red-400">Hi, my name is</h3>
					<h1 className="font-inter text-5xl font-bold sm:text-7xl md:text-8xl">{fullName}.</h1>
					<div className="flex space-x-8">
						<h2 className="flex-none py-2 px-4 w-fit h-fit font-inter text-2xl font-bold text-neutral-900 bg-red-500 rounded sm:text-5xl md:text-6xl">
							{ctaTitle}
						</h2>
						<CanadaFlag className="my-auto w-16 rounded sm:w-32" />
					</div>
				</div>
				<p className="max-w-lg">{ctaSummary}</p>
				<div className="w-64 h-10">
					<Link href="#about">
						<Button name="Learn more" />
					</Link>
				</div>
			</div>
		</div>
	);
};
