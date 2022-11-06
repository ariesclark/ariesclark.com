"use client";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Spotify } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { siteUrl } from "~/config";
import { type getCurrentSpotifyTrack } from "~/connections/spotify";

const TrackSlider: React.FC<{ progress: number; length: number }> = ({ progress, length }) => {
	return (
		<div className="flex w-full h-2 relative">
			<div className="bg-black-100 w-full" />
			<div
				className="bg-brand-spotify h-full absolute"
				style={{ width: `${(progress / length) * 100}%` }}
			/>
		</div>
	);
};

export const ConnectionSpotify: React.FC = () => {
	const { data: track } = useSWR(
		"spotify",
		() =>
			fetch(new URL("/api/spotify", siteUrl)).then(
				(response) => response.json() as ReturnType<typeof getCurrentSpotifyTrack>
			),
		{ refreshInterval: 500 }
	);

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [previewPaused, setPreviewPaused] = useState(true);

	if (!track) return null;

	return (
		<div className="w-full rounded-lg shadow-highlight bg-black-200  flex flex-col overflow-hidden relative">
			<div className="items-center flex p-4 gap-4 relative">
				<Image
					alt={`Song cover for @${track.name}`}
					className="rounded-lg h-12 w-12 object-cover"
					height={track.image.height ?? 100}
					src={track.image.url}
					width={track.image.width ?? 100}
				/>
				<Link
					className="flex flex-col justify-center before:absolute before:w-full before:h-full before:top-0 before:left-0"
					href={track.url}
					target="_blank"
				>
					<span className="text-lg font-bold leading-none">{track.name}</span>
					<span className="text-white-400">{track.artists.join(", ")}</span>
				</Link>
				<div className="ml-auto mr-4 flex gap-4 shrink-0">
					{track.previewUrl && (
						<>
							<audio
								ref={audioRef}
								src={track.previewUrl}
								onPause={() => setPreviewPaused(true)}
								onPlay={() => setPreviewPaused(false)}
							/>
							<button
								className="z-10"
								type="button"
								onClick={() => {
									if (!audioRef.current) return;
									audioRef.current.paused ? void audioRef.current.play() : audioRef.current.pause();
								}}
							>
								{previewPaused ? (
									<PlayIcon className="w-8 h-8" />
								) : (
									<PauseIcon className="w-8 h-8" />
								)}
							</button>
						</>
					)}
					<Link
						className="before:absolute before:w-full before:h-full before:top-0 before:left-0 before:-z-10"
						href={""}
						target="_blank"
					>
						<Spotify className="text-brand-spotify w-8 h-8" />
					</Link>
				</div>
			</div>
			<TrackSlider length={track.length} progress={track.progress ?? 0} />
		</div>
	);
};
