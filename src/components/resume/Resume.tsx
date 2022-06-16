import QRCode from "react-qr-code";

import { classes } from "../../lib/classes";
import {
	aboutRecentTechnologies,
	ctaTitle,
	experience,
	fullName,
	projects,
	siteUrl,
	socials
} from "../../lib/config";
import { resumePdfUrl } from "../../lib/resume";
import { prettyUrl } from "../../lib/url";
import { Link } from "../Link";

import { ExperienceResumeItem } from "./ExperienceResumeItem";
import { ProjectResumeItem } from "./ProjectResumeItem";
import { SocialResumeItem } from "./SocialResumeItem";

export const Resume: React.FC<{ print: boolean }> = ({ print }) => {
	return (
		<div className="flex overflow-x-hidden w-full min-h-screen font-lato bg-neutral-900">
			<div className="flex relative flex-col mx-auto w-full max-w-[850px] h-max bg-white">
				<div className="flex flex-col justify-center items-center w-full h-32 text-neutral-100 bg-zinc-800">
					<h1 className="text-4xl font-light">{fullName}</h1>
					<span className="text-2xl font-light text-neutral-300">{ctaTitle}</span>
				</div>
				<div className={classes(["flex w-full", print || "flex-col sm:flex-row"])}>
					<div
						className={classes([
							"flex flex-col shrink-0 gap-4 py-4 px-8 bg-neutral-200",
							print ? "w-64 text-right" : "sm:w-64 sm:text-right"
						])}
					>
						<div className="flex flex-col gap-2">
							<span className="text-xl font-medium">Contact information</span>
							<SocialResumeItem
								print={print}
								item={{
									name: "Website",
									href: siteUrl
								}}
							/>
							{socials.map((item, idx) => (
								<SocialResumeItem item={item} key={idx} print={print} />
							))}
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-xl font-medium">Recent technologies</span>
							<ul className="flex flex-col gap-1">
								{aboutRecentTechnologies.map((item, idx) => (
									<li
										className={classes(["flex flex-col text-xs", print || "sm:items-end"])}
										key={idx}
									>
										<span className="font-semibold">{item.name}</span>
										<span>{item.description}</span>
									</li>
								))}
							</ul>
						</div>
						<div
							className={classes([
								"flex flex-col gap-4",
								print ? "mt-4 sm:items-end sm:mt-auto" : "mt-auto"
							])}
						>
							{print ? (
								<div className="flex flex-col gap-4 items-end text-xs">
									<span className="max-w-[32ch]">
										This document&apos;s content may be out of date; you may view the most recent
										version on my website.
									</span>
									<span className="max-w-[32ch]">
										Scan the code below, or visit{" "}
										<Link href={`${siteUrl}/resume`}>{prettyUrl(`${siteUrl}/resume`)}</Link>
									</span>
									<QRCode className="rounded" size={96} value={`${siteUrl}/resume`} />
								</div>
							) : (
								<div className="flex w-full">
									<Link
										className="flex justify-center py-2 px-3 w-full text-white hover:text-white bg-neutral-800 hover:bg-neutral-900"
										href={resumePdfUrl}
									>
										<span>Download resume</span>
									</Link>
								</div>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-4 py-4 px-8 w-full">
						<div className="flex flex-col gap-2">
							<span className="text-xl font-medium">Work experience</span>
							{experience.map((item, idx) => (
								<ExperienceResumeItem item={item} key={idx} />
							))}
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-xl font-medium">Personal projects</span>
							{projects.featured.map((item, idx) => (
								<ProjectResumeItem item={item} key={idx} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
