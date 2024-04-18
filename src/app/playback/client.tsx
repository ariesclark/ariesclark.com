"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";

import { Playback } from "~/upstream/spotify";

export const InteractivePlayback: FC<{
	initialValue: Playback | null;
	get: () => Promise<Playback | null>;
}> = ({ initialValue, get }) => {
	const { data = null } = useSWR("playback", get, {
		refreshInterval: 1000,
		fallbackData: initialValue
	});

	const [progress, setProgress] = useState<number | null>(null);

	useEffect(() => {
		if (!data?.playing) return;
		setProgress(data?.progress ?? null);

		const every = 100;
		const interval = setInterval(() => {
			setProgress((previous) => (previous ?? 0) + every);
		}, every);

		return () => clearInterval(interval);
	}, [data?.playing, data?.progress]);

	if (!data || !data.playing) return null;
	const { name, url, image, artists, length } = data;

	return (
		<div className="relative flex w-96 flex-col gap-4 rounded-xl p-8">
			{/* <div className="bg-white-300 absolute -left-4 -top-4 rounded-full p-4">
				<SiSpotify className="text-brand-spotify size-8" />
			</div> */}
			<div className="flex gap-4">
				<Link className="shrink-0" href={url}>
					<Image
						className="size-12 rounded-xl"
						height={image.height}
						src={image.url}
						width={image.width}
						alt={`Song cover for ${name} by ${artists
							.map((artist) => artist.name)
							.join(", ")}`}
					/>
				</Link>
				<div className="flex w-full flex-col gap-2">
					<div className="flex flex-col text-neutral-200">
						<span className="text-xs leading-none opacity-80">
							Listening to
						</span>
						<span className="break-words text-sm">
							<>
								<Link href={url}>{name}</Link> by{" "}
								{artists.map((artist, artistIndex) => (
									<span key={artist.id}>
										<Link href={artist.url}>{artist.name}</Link>
										{artists.length - 1 !== artistIndex && ", "}
									</span>
								))}
								.
							</>
						</span>
					</div>
					<div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
						<motion.div
							className="h-2 bg-pink-400"
							animate={{
								width: `${((progress ?? 0) / length) * 100}%`
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
