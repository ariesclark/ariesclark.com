"use client";

import { SubtleLink } from "~/components/subtle-link";
import { useDate } from "~/hooks/use-date";

import { VeinyCard } from "./veiny-card";

export const Time: React.FC = () => {
	const { date, timeZone, timeDifference } = useDate();

	return (
		<VeinyCard className="w-96" veinStyle={{ top: "over" }}>
			<div className="z-30 flex flex-col">
				<span suppressHydrationWarning className="text-xl">
					{date.toLocaleString("en-CA", { dateStyle: "full" })}
				</span>
				<span suppressHydrationWarning className="text-4xl">
					{date.toLocaleString("en-CA", { timeStyle: "medium" })}{" "}
					<SubtleLink external href={`https://time.is/${timeZone.shortCode}`}>
						{timeZone.shortCode}
					</SubtleLink>
				</span>
			</div>
			<span suppressHydrationWarning className="z-30">
				{timeDifference === 0 ? (
					<>Within the same timezone.</>
				) : (
					`You are ${Math.abs(timeDifference)} hour${
						timeDifference !== 1 && timeDifference !== -1 ? "s" : ""
					} ${timeDifference > 0 ? "ahead" : "behind"}.`
				)}
			</span>
		</VeinyCard>
	);
};
