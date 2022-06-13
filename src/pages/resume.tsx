/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect } from "react";
import QRCode from "react-qr-code";

import { CommonHead } from "../components/CommonHead";
import { Link } from "../components/Link";
import { ExperienceResumeItem } from "../components/resume/ExperienceResumeItem";
import { ProjectResumeItem } from "../components/resume/ProjectResumeItem";
import { SocialResumeItem } from "../components/resume/SocialResumeItem";
import {
	ctaTitle,
	siteUrl,
	fullName,
	socials,
	experience,
	projects,
	aboutRecentTechnologies
} from "../lib/config";
import { resumePdfUrl } from "../lib/resume";
import { prettyUrl } from "../lib/url";

export const getServerSideProps: GetServerSideProps<{ pdf: boolean }> = async (context) => {
	return { props: { pdf: "pdf" in context.query } };
};

export const ResumePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
	pdf
}) => {
	useEffect(() => {
		/**
		 * We need to prevent the print of resume page,
		 * because it doesn't contain the proper contents
		 * and formatting when directly printing.
		 *
		 * To do this; we block the print dialog from finishing preview,
		 * and redirect the page to the properly rendered PDF file.
		 */
		function onBeforePrint(event: Event) {
			/**
			 * These don't prevent printing for some reason,
			 * but we call them anyways in case they do eventually.
			 */
			event.preventDefault();
			event.stopPropagation();

			window.location.href = resumePdfUrl;

			/**
			 * Blocking action, freezes all page content
			 * including the print preview dialog.
			 */
			alert();
		}

		if (!pdf) window.addEventListener("beforeprint", onBeforePrint);
	}, [pdf]);

	return (
		<>
			<CommonHead subtitle="Resume" />
			<div className="flex overflow-x-hidden w-full min-h-screen font-lato bg-neutral-900">
				<div className="flex relative flex-col mx-auto w-full max-w-[850px] h-max bg-white">
					<div className="flex flex-col justify-center items-center w-full h-32 text-neutral-100 bg-zinc-800">
						<h1 className="text-4xl font-light">{fullName}</h1>
						<span className="text-2xl font-light text-neutral-300">{ctaTitle}</span>
					</div>
					<div className="flex flex-col w-full md:flex-row">
						<div className="flex flex-col shrink-0 gap-4 py-4 px-8 bg-neutral-200 md:w-64 md:text-right">
							<div className="flex flex-col gap-2">
								<span className="text-xl font-medium">Contact information</span>
								<SocialResumeItem
									item={{
										name: "Website",
										href: siteUrl
									}}
								/>
								{socials.map((item, idx) => (
									<SocialResumeItem item={item} key={idx} />
								))}
							</div>
							<div className="flex flex-col gap-2">
								<span className="text-xl font-medium">Recent technologies</span>
								<ul className="flex flex-col gap-1">
									{aboutRecentTechnologies.map((item, idx) => (
										<li className="flex flex-col text-xs md:items-end" key={idx}>
											<span className="font-semibold">{item.name}</span>
											<span>{item.description}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="flex flex-col gap-4 items-end mt-auto">
								{pdf ? (
									<>
										<span className="text-xs">
											This document&apos;s content may be out of date; you may view the most recent
											version on my website. <br />
											<br />
											Scan the code below, or visit{" "}
											<Link href={`${siteUrl}/resume`}>{prettyUrl(`${siteUrl}/resume`)}</Link>
										</span>
										<QRCode className="rounded" size={96} value={`${siteUrl}/resume`} />
									</>
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
		</>
	);
};

export default ResumePage;
