import { ArrowTopRightOnSquareIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

import { experience } from "~/config";
import { formatDateRange } from "~/utilities";

import { Section } from "./section";

export const SectionExperience: React.FC = () => (
	<Section
		className="bg-black-100 text-white-100 flex flex-col gap-4 h-full"
		flagClassName="bg-red-100"
		label="Experience"
		labelIcon={<BuildingOffice2Icon />}
	>
		<div className="flex flex-col gap-4">
			{experience.map((value, experienceIdx) => (
				<div
					className="group relative focus:outline-none bg-black-200 md:h-52 md:hocus-within:h-60 p-4 lg:p-8 gap-4 flex flex-col rounded-lg shadow-highlight"
					key={experienceIdx}
					tabIndex={0}
				>
					<div className="flex gap-4 items-center">
						<div
							className="p-2 h-16 rounded-lg grow-0 shrink-0 w-16"
							style={{ backgroundColor: value.logoBackgroundColor ?? "white" }}
						>
							<Image alt={`Logo for ${value.name}`} className="w-full" src={value.logo} />
						</div>
						<div className="font-nunito flex flex-col">
							<span className="font-bold text-lg">{value.name}</span>
							<span className="">{value.title}</span>
							<span className="text-xs text-white-400">
								{formatDateRange(value.from, value.to)}
							</span>
						</div>
						<Link
							className="focus:outline-none rounded ml-auto mb-auto before:absolute before:w-full before:h-full before:top-0 before:right-0"
							href={value.href}
							target="_blank"
						>
							<ArrowTopRightOnSquareIcon className="w-6" />
						</Link>
					</div>
					<span className="font-nunito">
						{value.description.slice(0, 124)}
						{value.description.length > 124 && (
							<>
								<span className="opacitiy-100 hidden lg:inline-block group-hocus-within:opacity-0 w-0">
									…
								</span>
								<span className="lg:opacity-0 group-hocus-within:opacity-100">
									{value.description.slice(124, value.description.length)}
								</span>
							</>
						)}
					</span>
				</div>
			))}
		</div>
	</Section>
);
