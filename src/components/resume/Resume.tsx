/* eslint-disable @next/next/no-img-element */
import QRCode from "react-qr-code";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { classes } from "../../lib/classes";
import {
	aboutRecentTechnologies,
	ctaTitle,
	experience,
	fullName,
	projects,
	siteUrl,
	socials,
	emailHref
} from "../../lib/config";
import { resumePdfUrl } from "../../lib/resume";
import { prettyUrl } from "../../lib/url";

import { ExperienceResumeItem } from "./ExperienceResumeItem";
import { ProjectResumeItem } from "./ProjectResumeItem";
import { SocialResumeItem } from "./SocialResumeItem";

export const Resume: React.FC<{ print: boolean }> = ({ print }) => {
	return (
		<div className="flex overflow-x-hidden w-full min-h-screen font-lato bg-neutral-900">
			<div className="flex overflow-hidden relative flex-col mx-auto w-full max-w-[850px] h-fit bg-white">
				<div className="flex flex-col justify-center p-8 w-full h-32 text-neutral-100 bg-zinc-800">
					<h1 className="text-4xl font-light">{fullName}</h1>
					<span className="text-2xl font-light text-neutral-300">{ctaTitle}</span>
					<div className="absolute right-8">
						{print ? (
							<div className="flex gap-4 items-center text-xs text-right">
								<span className="text-gray-300">
									This document was last generated on
									<br />
									<span className="font-semibold">
										{new Date().toLocaleString("en-US", {
											year: "numeric",
											month: "long",
											day: "2-digit"
										})}
									</span>{" "}
									and may be outdated.
									<br />
									<br />
									<span>
										Scan the code or visit <br />
										<Link href={`${siteUrl}/resume`}>
											<a className="font-semibold">{prettyUrl(`${siteUrl}/resume`)}</a>
										</Link>{" "}
										for the latest <br />
										available version of this document.
									</span>
								</span>
								<QRCode className="rounded" size={96} value={`${siteUrl}/resume`} />
							</div>
						) : (
							<Link href={resumePdfUrl}>
								<a className="flex gap-4 justify-between items-center py-2 px-3 w-full text-black bg-white rounded">
									<span>Download Resume</span>
									<ArrowDownTrayIcon className="w-4 h-4" />
								</a>
							</Link>
						)}
					</div>
				</div>
				<div className={classes(["flex w-full", print || "flex-col sm:flex-row"])}>
					<div
						className={classes([
							"flex flex-col shrink-0 gap-4 py-4 px-8 bg-neutral-200",
							print ? "w-64" : "sm:w-64"
						])}
					>
						<div className="flex flex-col gap-2">
							<img className="mb-2 rounded" src="/images/self.jpeg" />
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
								{aboutRecentTechnologies.slice(0, 6).map((item, idx) => (
									<li className="flex flex-col text-xs" key={idx}>
										<span className="font-semibold">{item.name}</span>
										<span>{item.description}</span>
									</li>
								))}
							</ul>
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
							{projects.featured.slice(0, 2).map((item, idx) => (
								<ProjectResumeItem item={item} key={idx} />
							))}
						</div>
					</div>
				</div>
				<Link href={emailHref}>
					<a>
						<div className="flex justify-center items-center p-4 text-neutral-100 bg-neutral-900">
							<span>
								Interested in me? — Make an offer via{" "}
								<span className="font-semibold">{prettyUrl(emailHref)}</span>.
							</span>
						</div>
					</a>
				</Link>
			</div>
		</div>
	);
};
