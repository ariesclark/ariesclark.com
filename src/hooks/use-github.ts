import useSWR from "swr";

import { siteUrl } from "~/config";
import { GitHubMetadata } from "~/connections/github";

const githubUrl = new URL("/api/github", siteUrl);

const getGitHubMetadata = (): Promise<GitHubMetadata | null> => {
	return fetch(githubUrl).then(async (response) => {
		if (!response.ok) return null;
		return response.json();
	});
};

export function useGitHub(): GitHubMetadata | null {
	const { data: metadata } = useSWR("github", getGitHubMetadata);
	return metadata ?? null;
}
