import { siteDomain } from "./config";

const resumeUrl = `${siteDomain}/resume?pdf`;
export const resumePdfUrl = `https://raphtalia.ariesclark.com/puppeteer/${
	typeof btoa === "undefined" ? Buffer.from(resumeUrl, "utf-8").toString("base64") : btoa(resumeUrl)
}/pdf?options=${JSON.stringify({ printBackground: true })}`;
