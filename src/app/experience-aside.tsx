import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { experience } from "~/config";

import { AsideType } from "./page";

function timeSince(from: Date, to: Date) {
	if (to.getTime() - from.getTime() > 3.154e10)
		return `${to.getFullYear() - from.getFullYear()} years`;
	return `${Math.floor((to.getTime() - from.getTime()) / 2.628e9)} months`;
}

type ExperienceAsideProps = React.ComponentProps<"div"> & { aside: AsideType };

export const ExperienceAside: React.FC<ExperienceAsideProps> = ({ aside, ...props }) => {
	return (
		<div
			{...props}
			className={twMerge(
				"absolute top-0 flex h-screen w-screen p-8 opacity-0 transition-opacity md:items-center md:justify-center",
				props.className
			)}
		>
			<div className="mt-16 flex flex-col gap-8">
				<span className="font-inter text-2xl font-bold">Jobs & experience</span>
				<div className="flex h-full flex-col gap-4 overflow-y-auto">
					{experience.map((item, itemIdx) => (
						<div
							key={itemIdx}
							className={twMerge(
								"flex w-full max-w-xl select-none gap-4 rounded-xl bg-black-100 p-4 transition-opacity",
								aside === "right" ? "opacity-100" : "opacity-0"
							)}
							style={{
								transitionDelay: `${itemIdx / 5}s`
							}}
						>
							<Link
								className="aspect-square h-fit w-12 shrink-0 rounded-xl object-contain p-2 md:w-16"
								href={item.href}
								style={{ backgroundColor: item.logoBackgroundColor ?? "white" }}
								target="_blank"
							>
								<Image alt={`Icon for ${item.name}`} className="h-full w-full" src={item.logo} />
							</Link>
							<div className="flex flex-col gap-2">
								<div className="flex flex-col items-baseline gap-1 md:flex-row md:gap-2">
									<Link className="font-semibold leading-none" href={item.href} target="_blank">
										{item.name}
									</Link>
									<span className="text-xs text-white-400">
										{item.to
											? `${item.title} for ${timeSince(item.from, item.to)}.`
											: `${item.title} since ${item.from.toLocaleString("en-CA", {
													month: "long",
													year: "numeric"
											  })}.`}
									</span>
								</div>
								<p className="text-xs md:text-sm">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
