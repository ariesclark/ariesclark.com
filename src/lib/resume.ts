import { siteDomain } from "./config";

export const resumePdfUrl = `https://raphtalia.ariesclark.com/puppeteer/${btoa(
	`${siteDomain}/resume?pdf`
)}/pdf?options={%22printBackground%22:true}`;
