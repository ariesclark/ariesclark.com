import useSWR from "swr";

import { localSiteUrl } from "~/config";
import { GitHubMetadata } from "~/connections/github";

export const getGitHubMetadata = (): Promise<GitHubMetadata | null> => {
	return fetch(`${localSiteUrl}api/github`).then(async (response) => {
		if (!response.ok) return null;
		return response.json();
	});
};

export function useGitHub(): GitHubMetadata | null {
	const { data: metadata } = useSWR("github", getGitHubMetadata);
	return metadata ?? null;
}
