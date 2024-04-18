import { FC, PropsWithChildren } from "react";

import AnthonyTanPicture from "~/assets/testimonials/anthony-tan.jpg";

import {
	Testimonial,
	TestimonialAuthor,
	TestimonialAuthorAffiliation,
	TestimonialContent
} from "./testimonial";

const marqueeItems = [
	<Testimonial key={null}>
		<TestimonialContent>
			We have the wonderful Aries to thank for the website, it&apos;s much more
			convenient than having to [onboard users manually].
		</TestimonialContent>
		<TestimonialAuthor picture="https://cdn.discordapp.com/avatars/398136278568140802/1c5995a52f7b41720ea854d4349aac5d.webp">
			Thomalone
		</TestimonialAuthor>
	</Testimonial>,
	<Testimonial key={null}>
		<TestimonialContent>
			Aries led our major product port of Flirtual. They&apos;re a brilliant
			developer, has high initiative and is easy & great to work with.
		</TestimonialContent>
		<TestimonialAuthor picture={AnthonyTanPicture}>
			Anthony Tan
			<TestimonialAuthorAffiliation>Flirtual</TestimonialAuthorAffiliation>
		</TestimonialAuthor>
	</Testimonial>,

	<Testimonial key={null}>
		<TestimonialContent>
			[Aries] made this super possible, everyone getting a clean interface, and
			things just going in without (much) assistance if any.
		</TestimonialContent>
		<TestimonialAuthor picture="https://cdn.discordapp.com/avatars/90976937261961216/ec3e5942eaead727ddaf6be5c476c6a3.webp">
			Lingie
			<TestimonialAuthorAffiliation>Duskview City</TestimonialAuthorAffiliation>
		</TestimonialAuthor>
	</Testimonial>,
	<Testimonial key={null}>
		<TestimonialContent>
			Aries is truly amazing. I need everyone to know that.
		</TestimonialContent>
		<TestimonialAuthor picture="https://cdn.discordapp.com/avatars/202163004245016586/2205046e530dd362b2e8eeb5e829f448.webp?size=1024&format=webp&width=0&height=400">
			Riney
			<TestimonialAuthorAffiliation>Duskview City</TestimonialAuthorAffiliation>
		</TestimonialAuthor>
	</Testimonial>
];

const MarqueeItem: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="ml-2 flex h-40 w-[30rem] shrink-0 items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-neutral-50 lg:text-lg">
			{children}
		</div>
	);
};
export const Marquee: FC = () => {
	return (
		<div className="group/marquee absolute bottom-0 left-0 z-10 w-full">
			<div className="relative flex origin-bottom-right translate-x-4 -rotate-2 scale-105 bg-pink-400 px-16 py-2">
				<div className="relative flex -translate-x-10">
					<div className="flex size-full animate-marquee group-hover/marquee:[animation-play-state:paused]">
						{marqueeItems.map((item, index) => (
							<MarqueeItem key={index}>{item}</MarqueeItem>
						))}
					</div>
					<div className="absolute top-0 flex size-full animate-marquee-inverse group-hover/marquee:[animation-play-state:paused]">
						{marqueeItems.map((item, index) => (
							<MarqueeItem key={index}>{item}</MarqueeItem>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
