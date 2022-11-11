/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { graphql as github } from "@octokit/graphql";

import { githubBearerToken, githubUsername } from "~/config";

const graphql = github.defaults({
	headers: {
		authorization: `token ${githubBearerToken}`
	}
});

export interface GithubContributionCalenderDay {
	color: string;
	contributionCount: number;
	date: string;
	weekday: number;
}

export interface GithubContributionCalenderWeek {
	contributionDays: Array<GithubContributionCalenderDay>;
	firstDay: string;
}

export interface GithubContributionCalendar {
	colors: Array<string>;
	totalContributions: number;
	weeks: Array<GithubContributionCalenderWeek>;
}

export interface GitHubUser {
	name: string;
	displayName: string;
	biography: string;
	avatarUrl: string;
	url: string;
	contributionsCollection: {
		contributionCalendar: GithubContributionCalendar;
	};
}
export interface GitHubMetadata {
	user: GitHubUser;
}

export async function getGitHubMetadata(): Promise<GitHubMetadata | null> {
	const data: any = await graphql(`query {
    user(login: "${githubUsername}") {
      name: login
    	displayName: name
    	biography: bio
    	avatarUrl
    	url
      itemShowcase {
        items(first: 10) {
          nodes {
            ... on Repository {
              id
              name
              owner {
              	name: login
                displayName: 
                avatarUrl
                url
            	}
              description
              stargazerCount
              forkCount
              languages(first: 5) {
              	nodes {
                  name
                  id
                  color
                }
              }
              url
            }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          colors
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
              weekday
            }
            firstDay
          }
        }
      }
    }
  }`);

	if (!data?.user) return null;

	/* const {
		data: { items: repositories }
	} = await github.rest.search.repos({
		q: `user:${githubUsername}`
	}); */

	return {
		user: data.user
		/* repositories: repositories.map((repository) => ({
			name: repository.name,
			owner: repository.owner!.login,
			ownerAvatarUrl: repository.owner!.avatar_url,
			ownerUrl: repository.owner!.html_url,
			url: repository.html_url,
			metrics: {
				stars: repository.stargazers_count,
				watchers: repository.watchers_count,
				forks: repository.forks_count
			}
		})) */
	};
}
