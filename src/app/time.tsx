"use client";

import React from "react";

import { SubtleLink } from "~/components/subtle-link";
import { useDate } from "~/hooks/use-date";

import { VeinyCard } from "./veiny-card";

export const Time: React.FC<React.ComponentProps<"div">> = (props) => {
	const { date, timeZone, timeDifference } = useDate();

	return (
		<VeinyCard {...props} veinStyle={{ top: "over" }}>
			<div className="flex select-none flex-col">
				<span suppressHydrationWarning className="">
					{date.toLocaleString("en-CA", { dateStyle: "full" })}
				</span>
				<span suppressHydrationWarning className="text-3xl">
					{date.toLocaleString("en-CA", { timeStyle: "medium" })}{" "}
					<SubtleLink external href={`https://time.is/${timeZone.shortCode}`}>
						{timeZone.shortCode}
					</SubtleLink>
				</span>
			</div>
			<span suppressHydrationWarning className="z-30 select-none">
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
