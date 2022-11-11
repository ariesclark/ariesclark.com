import React from "react";

import { InlineLink } from "~/components/inline-link";

import { Section } from "./section";
import { SectionAbout } from "./section-about";
import { SectionExperience } from "./section-experience";
import { SectionFlag } from "./section-flag";
import { SectionConnections } from "./section-connections";

const RootIndexPage: React.FC = () => {
	return (
		<div className="w-screen flex flex-col md:grid md:grid-cols-1 md:[grid-template-rows:minmax(0,1fr)_max-content] h-screen font-nunito">
			<main className="flex grow w-full flex-col md:flex-row">
				<SectionConnections />
				<SectionAbout />
				<SectionExperience />
				<Section desktopOnly className="bg-white-300" />
				<SectionFlag />
				<Section desktopOnly className="bg-white-300" />
				<Section desktopOnly className="bg-red-100" />
				<Section desktopOnly className="bg-red-200" />
				<Section desktopOnly className="bg-red-300" />
			</main>
			<footer className="p-8 lg:px-16 bg-black-200 text-white-100 shrink-0 text-lg">
				<span>
					Copyright © <InlineLink href="/">Aries Clark</InlineLink>, {new Date().getFullYear()}
				</span>
			</footer>
		</div>
	);
};

export default RootIndexPage;
