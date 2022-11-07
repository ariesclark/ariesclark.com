"use client";

import { Github } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
	GithubContributionCalendar,
	GithubContributionCalenderDay,
	GithubContributionCalenderWeek
} from "~/connections/github";
import { useGitHub } from "~/hooks/use-github";

const ContributionCalendarDay: React.FC<{ day: GithubContributionCalenderDay }> = ({ day }) => {
	const backgroundColor = day.contributionCount > 0 ? day.color : "";
	const date = new Date(day.date);

	return (
		<div
			className="h-auto aspect-square w-full bg-black-100"
			style={{ backgroundColor }}
			title={`${day.contributionCount} commits on ${date.toLocaleDateString()}`}
		/>
	);
};

const ContributionCalendarWeek: React.FC<{ week: GithubContributionCalenderWeek }> = ({ week }) => (
	<div className="flex flex-col grow gap-0.5">
		{week.contributionDays.map((day, dayIdx) => (
			<ContributionCalendarDay day={day} key={dayIdx} />
		))}
	</div>
);

const ContributionCalendar: React.FC<{ calendar: GithubContributionCalendar }> = ({ calendar }) => {
	return (
		<div className="flex gap-0.5">
			{calendar.weeks.slice(8, -1).map((week, weekIdx) => (
				<ContributionCalendarWeek key={weekIdx} week={week} />
			))}
		</div>
	);
};

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
			<div className="p-4">
				<ContributionCalendar calendar={user.contributionsCollection.contributionCalendar} />
			</div>
		</div>
	);
};
