/* eslint-disable @next/next/no-img-element */
import { twMerge } from "tailwind-merge";

import { omit } from "../lib/omit";

export const OutlinedImage: React.FC<
	React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = (props) => (
	<div className={twMerge("group relative mr-4 mb-4 w-full h-full", props.className)}>
		<div className="block absolute z-0 w-full h-full rounded border-2 border-red-400 translate-x-4 group-hover:translate-x-3 translate-y-4 group-hover:translate-y-3" />
		<img
			{...omit(props, ["className"])}
			className="block object-cover object-center absolute z-10 h-full bg-white rounded brightness-90 group-hover:brightness-100"
			src={props.src}
		/>
	</div>
);
