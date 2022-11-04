import React from "react";

import { InlineLink } from "~/components/inline-link";

import { Section } from "./section";
import { SectionAbout } from "./section-about";
import { SectionExperience } from "./section-experience";
import { SectionFlag } from "./section-flag";
import { SectionConnections } from "./section-connections";

const RootIndexPage: React.FC = () => {
	return (
		<div className="w-screen grid grid-cols-1 [grid-template-rows:minmax(0,1fr)_max-content] h-screen font-nunito">
			<main className="flex grow w-full">
				<SectionConnections />
				<SectionAbout />
				<SectionExperience />
				<Section className="bg-white-300" />
				<SectionFlag />
				<Section className="bg-white-300" />
				<Section className="bg-red-100" />
				<Section className="bg-red-200" />
				<Section className="bg-red-300" />
			</main>
			<footer className="py-8 px-16 bg-black-200 text-white-100 shrink-0 text-lg">
				<span>
					Copyright © <InlineLink href="/">Aries Clark</InlineLink>, {new Date().getFullYear()}
				</span>
			</footer>
		</div>
	);
};

export default RootIndexPage;
