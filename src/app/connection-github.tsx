"use client";

import { Github } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";

import { GithubContributionCalendar } from "~/connections/github";
import { useGitHub } from "~/hooks/use-github";

const ContributionCalandar: React.FC<{ calendar: GithubContributionCalendar }> = ({ calendar }) => (
	<div className="flex gap-0.5">
		{calendar.weeks.slice(0, -1).map((week, weekIdx) => {
			return (
				<div className="flex flex-col grow gap-0.5" key={weekIdx}>
					{week.contributionDays.map((day, dayIdx) => {
						const date = new Date(day.date);
						const backgroundColor = day.contributionCount > 0 ? day.color : "";

						return (
							<div
								className="h-auto aspect-square w-full"
								key={dayIdx}
								style={{ backgroundColor }}
								title={date.toLocaleDateString()}
							/>
						);
					})}
				</div>
			);
		})}
	</div>
);

export const ConnectionGitHub: React.FC = () => {
	const metadata = useGitHub();

	if (!metadata) return null;
	const { user } = metadata;

	return (
		<div className="w-full rounded-lg shadow-highlight bg-black-100 relative flex flex-col overflow-hidden">
			<div className="items-center flex p-4 gap-4 bg-black-200">
				<Image
					alt={`GitHub profile picture for @${user.name}`}
					className="rounded-lg"
					height={48}
					src={user.avatarUrl}
					width={48}
				/>
				<div className="flex flex-col justify-center">
					<span className="text-lg font-bold leading-none">{user.displayName}</span>
					<span className="text-white-400">{`@${user.name}`}</span>
				</div>
				<Link
					className="ml-auto mr-4 before:absolute before:w-full before:h-full before:top-0 before:left-0"
					href={user.url}
					target="_blank"
				>
					<Github className="w-8 h-8" />
				</Link>
			</div>
			<ContributionCalandar calendar={user.contributionsCollection.contributionCalendar} />
		</div>
	);
};
