import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { ChevronsRight } from "lucide-react";

import { experience } from "~/environment";

import { Link } from "./link";

import type { FC } from "react";

export const WorkAndExperience: FC = () => {
	return (
		<div className="relative mx-auto flex w-full max-w-[1920px] grow flex-col rounded-b-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-white lg:-mt-16 2xl:px-64">
			<section
				className="flex size-full grow scroll-pt-32 flex-col gap-16 px-6 py-16 pt-0 lg:p-16 lg:pb-24"
				id="work"
			>
				<div className="flex flex-col">
					<span className="text-3xl font-bold">Work & Experiences</span>
					<span className="max-w-screen-md text-balance brightness-75">
						Over the years, I&apos;ve had the pleasure of working with some
						amazing companies and individuals — here&apos;s a few of the
						highlights.
					</span>
				</div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{experience.map(
						({ name, logo, description, media, from, to, url }, index) => {
							return (
								<div
									className="group relative flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-neutral-50 p-6 dark:bg-black/10"
									key={index}
								>
									<div className="flex flex-col justify-between gap-x-4 lg:h-10 lg:flex-row lg:items-center">
										<Link
											className="origin-left scale-100 transition-all delay-100 hover:scale-105"
											href={url ?? "/"}
											target="_blank"
										>
											{logo ? (
												<Image alt={name} className="h-10 w-fit" src={logo} />
											) : (
												<span className="inline-flex whitespace-nowrap text-xl font-bold">
													{name}
												</span>
											)}
										</Link>
										{from && (
											<span className="brightness-75">
												{from.toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "2-digit"
												})}{" "}
												{to
													? `– ${to.toLocaleDateString("en-US", {
															year: "numeric",
															month: "long",
															day: "2-digit"
														})}`
													: "– Present"}
											</span>
										)}
									</div>
									<p>{description}</p>
									{media && (
										<div className="grid grid-cols-3 gap-2">
											{media.map(({ image }, index) => (
												<Link
													className="aspect-video w-full overflow-hidden rounded-lg bg-black/20 transition-all hover:scale-105"
													href={image.src}
													key={index}
													target="_blank"
												>
													<Image
														alt=""
														className="size-full shrink-0 object-cover"
														loading="lazy"
														placeholder="blur"
														src={image}
													/>
												</Link>
											))}
										</div>
									)}
								</div>
							);
						}
					)}
					<Link
						href="/#contact"
						className={twMerge(
							"group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-white/5 p-6 text-neutral-50 transition-all hover:bg-pink-400",
							experience.length % 2 === 1
								? "col-span-1"
								: "col-span-1 lg:col-span-2"
						)}
					>
						<div className="flex items-center gap-4 text-lg">
							<span>& many more, let&apos;s chat about what&apos;s next! </span>
							<ChevronsRight className="ml-0 w-6 shrink-0 transition-all group-hover:ml-2" />
						</div>
					</Link>
				</div>
			</section>
		</div>
	);
};
