import { IdentificationIcon } from "@heroicons/react/24/solid";

import { getYearSince } from "~/utilities";
import SelfImage from "~/../public/images/self.jpeg";
import Self1Image from "~/../public/images/self1.jpeg";
import Self2Image from "~/../public/images/self2.jpeg";
import Self3Image from "~/../public/images/self3.jpeg";
import { birthday, recentTechnologies } from "~/config";
import { InlineLink } from "~/components/inline-link";

import { Section } from "./section";
import { ImageGallery } from "./image-gallery";

export const SectionAbout: React.FC = () => (
	<Section
		defaultFocus
		className="bg-black-200 text-white-100"
		flagClassName="bg-red-200"
		label="Aries Clark"
		labelIcon={<IdentificationIcon />}
	>
		<div className="flex flex-col gap-8">
			<ImageGallery
				images={[
					[SelfImage, "Picture of Aries Clark"],
					[Self1Image, "Picture of Aries Clark"],
					[Self2Image, "Picture of Aries Clark"],
					[Self3Image, "Picture of Aries Clark"]
				]}
			/>
			<div className="flex flex-col gap-4">
				<p>
					<span>
						I&apos;m Aries, a {getYearSince(birthday)}-year-old Canadian with a burning desire to
						improve the status of the web through software development. I began developing software
						when I was pretty young, at the age of eleven. I&apos;ve done a lot of various things in
						those {getYearSince(new Date(birthday.getFullYear() + 11, 1, 1))} years, from building
						Minecraft mods in Java to writing a lot of terrible PHP websites to where I am now.
					</span>
					<br />
					<br />
					<span>
						Recently, I&apos;ve been concentrating on using current languages like TypeScript to
						build web-based applications and services using React and Next.js, among other tools.
						Here are a few technologies I&apos;ve been working with recently:
					</span>
				</p>
				<ul className="grid grid-cols-2 gap-x-4 gap-y-2">
					{recentTechnologies.map((value, valueIdx) => (
						<li key={valueIdx}>
							<InlineLink href={value.href}>{value.name}</InlineLink>
							<span className="text-xs text-white-400"> — {value.description}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	</Section>
);
