import ThomalonePicture from "~/assets/testimonials/thomalone.png";
import LingiePicture from "~/assets/testimonials/lingie.png";
import RineyPicture from "~/assets/testimonials/riney.png";
import AnthonyTanPicture from "~/assets/testimonials/anthony-tan.jpg";

import {
	Testimonial,
	TestimonialAuthor,
	TestimonialAuthorAffiliation,
	TestimonialContent
} from "./testimonial";

import type { FC, PropsWithChildren } from "react";

const marqueeItems = [
	<Testimonial key={null}>
		<TestimonialContent>
			We have the wonderful Aries to thank for the website, it&apos;s much more
			convenient than having to [onboard users manually].
		</TestimonialContent>
		<TestimonialAuthor picture={ThomalonePicture}>Thomalone</TestimonialAuthor>
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
		<TestimonialAuthor picture={LingiePicture}>
			Lingie
			<TestimonialAuthorAffiliation>Duskview City</TestimonialAuthorAffiliation>
		</TestimonialAuthor>
	</Testimonial>,
	<Testimonial key={null}>
		<TestimonialContent>
			Aries is truly amazing. I need everyone to know that.
		</TestimonialContent>
		<TestimonialAuthor picture={RineyPicture}>
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
