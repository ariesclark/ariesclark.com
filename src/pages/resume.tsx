import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect } from "react";

import { CommonHead } from "../components/CommonHead";
import { Resume } from "../components/resume/Resume";
import { resumePdfUrl } from "../lib/resume";

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
		return () => window.removeEventListener("beforeprint", onBeforePrint);
	}, [pdf]);

	return (
		<>
			<CommonHead subtitle="Resume" />
			<Resume print={pdf} />
		</>
	);
};

export default ResumePage;
