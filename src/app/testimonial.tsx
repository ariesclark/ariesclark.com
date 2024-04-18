import Image, { StaticImageData } from "next/image";
import { FC, PropsWithChildren } from "react";

export const TestimonialAuthor: FC<
	PropsWithChildren<{ picture: string | StaticImageData }>
> = ({ children, picture }) => (
	<div className="flex items-center gap-2 text-sm">
		<Image
			alt="Quote author's picture"
			className="aspect-square w-6 rounded"
			height={64}
			src={picture}
			width={64}
		/>
		{children}
	</div>
);

export const TestimonialAuthorAffiliation: FC<PropsWithChildren> = ({
	children
}) => <span className="text-sm brightness-75">{children}</span>;

export const TestimonialContent: FC<PropsWithChildren> = ({ children }) => (
	<span className="font-thin">“{children}”</span>
);

export const Testimonial: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col gap-2" key={1}>
			{children}
		</div>
	);
};
