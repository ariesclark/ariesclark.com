"use client";

import { SiSpotify } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SubtleLink } from "~/components/subtle-link";
import { useMetadata } from "~/hooks/use-metadata";

export const SpotifyCard: React.FC = () => {
	const { spotify } = useMetadata();

	const [inferredProgress, setInferredProgress] = useState(0);

	useEffect(() => {
		if (!spotify?.progress) return;
		setInferredProgress(0);
	}, [spotify?.progress]);

	useEffect(() => {
		const handle = setInterval(
			() => setInferredProgress((inferredProgress) => inferredProgress + 1),
			1
		);

		return () => clearInterval(handle);
	}, []);

	if (!spotify || !spotify.playing) return null;

	return (
		<div className="relative flex w-96 flex-col gap-4 rounded-xl bg-white-300 p-8">
			<div className="absolute -left-4 -top-4 rounded-full bg-white-300 p-4">
				<SiSpotify className="h-8 w-8 text-brand-spotify" />
			</div>
			<div className="flex gap-4">
				<Link className="shrink-0" href={spotify.url}>
					<Image
						className="h-12 w-12 rounded-xl"
						height={spotify.image.height}
						src={spotify.image.url}
						width={spotify.image.width}
						alt={`Song cover for ${spotify.name} by ${spotify.artists
							.map((artist) => artist.name)
							.join(", ")}`}
					/>
				</Link>
				<div className="flex w-full flex-col gap-2">
					<div className="flex flex-col text-black-300">
						<span className="text-xs leading-none text-black-100">Listening to</span>
						<span className="break-words text-sm">
							<>
								<SubtleLink href={spotify.url}>{spotify.name}</SubtleLink> by{" "}
								{spotify.artists.map((artist, artistIdx) => (
									<span key={artist.id}>
										<SubtleLink href={artist.url}>{artist.name}</SubtleLink>
										{spotify.artists.length - 1 !== artistIdx && ", "}
									</span>
								))}
								.
							</>
						</span>
					</div>
					<div className="h-2 w-full overflow-hidden rounded-full bg-white-200">
						<div
							className="h-2 bg-gradient-to-r from-red-100 to-red-300"
							style={{
								width: `${(((spotify.progress ?? 0) + inferredProgress) / spotify.length) * 100}%`
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
