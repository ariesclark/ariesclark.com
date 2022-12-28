"use client";

import { Spotify } from "@icons-pack/react-simple-icons";
import Image from "next/image";

import { SubtleLink } from "~/components/subtle-link";
import { useMetadata } from "~/hooks/use-metadata";

import { VeinyCard } from "./veiny-card";

export const SpotifyCard: React.FC = () => {
	const { spotify } = useMetadata();
	if (!spotify || !spotify.playing) return null;

	return (
		<VeinyCard className="w-96" veinStyle={{ top: "over" }}>
			<div className="relative flex w-full gap-4">
				<Image
					className="h-16 w-16 rounded-xl"
					height={spotify.image.height}
					src={spotify.image.url}
					width={spotify.image.width}
					alt={`Spotify song cover for "${spotify.name}" by ${spotify.artists
						.map((artist) => artist.name)
						.join(", ")}.`}
				/>
				<div className="flex w-full flex-col font-light tracking-tight">
					<SubtleLink href={spotify.url}>{spotify.name}</SubtleLink>
					<span className="text-xs">
						{spotify.artists.map((artist) => (
							<>
								<SubtleLink href={artist.url} key={artist.id}>
									{artist.name}
								</SubtleLink>
								{", "}
							</>
						))}
					</span>
					<div className="mt-auto h-2 w-full overflow-hidden rounded-full bg-black-200">
						<div
							className="h-2 bg-brand-spotify"
							style={{ width: `${((spotify.progress ?? 0) / spotify.length) * 100}%` }}
						/>
					</div>
				</div>
				<Spotify className="absolute right-0 h-8 w-8 text-brand-spotify" />
			</div>
		</VeinyCard>
	);
};
