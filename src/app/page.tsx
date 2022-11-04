import React from "react";

import { InlineLink } from "~/components/inline-link";

import { Section } from "./section";
import { SectionAbout } from "./section-about";
import { SectionExperience } from "./section-experience";
import { SectionFlag } from "./section-flag";
import { SectionConnections } from "./section-connections";

const RootIndexPage: React.FC = () => {
	return (
		<div className="flex flex-col h-screen font-nunito">
			<div className="flex grow w-full">
				<SectionConnections />
				<SectionAbout />
				<SectionExperience />
				<Section className="bg-white-300" />
				<SectionFlag />
				<Section className="bg-white-300" />
				<Section className="bg-red-100" />
				<Section className="bg-red-200" />
				<Section className="bg-red-300" />
			</div>
			<footer className="py-8 px-16 bg-black-200 text-white-100 shrink-0 text-lg">
				<span>
					Copyright © <InlineLink href="/">Aries Clark</InlineLink>, {new Date().getFullYear()}
				</span>
			</footer>
		</div>
	);
};

export default RootIndexPage;
