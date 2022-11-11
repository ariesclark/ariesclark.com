"use client";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Spotify } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useSpotify } from "~/hooks/use-spotify";

interface TrackProgressProps {
	progress: number;
	length: number;
}

const TrackProgress: React.FC<TrackProgressProps> = ({ progress, length }) => {
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
	const track = useSpotify();

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [previewPaused, setPreviewPaused] = useState(true);

	const [trackProgress, setTrackProgress] = useState(0);

	// Stop playing the song snippet when the track changes.
	useEffect(() => setPreviewPaused(true), [track?.url]);

	/**
	 * After a network request, we sync our assumed progress
	 * with what the songs playback is actually at, this may
	 * cause a jump if a song was paused or skipped.
	 */
	useEffect(() => {
		setTrackProgress(track?.progress ?? 0);
	}, [track?.progress]);

	/**
	 * Client assumes the song is still playing since the last
	 * network request, and increases the current progress, this
	 * allows the progress bar to have a smooth transition.
	 */
	useEffect(() => {
		const id = setInterval(() => {
			if (!track?.playing) return;
			setTrackProgress((value) => value + 500);
		}, 500);
		return () => clearInterval(id);
	}, [track?.playing]);

	if (!track) return null;

	return (
		<div className="group w-full rounded-lg shadow-highlight bg-black-200 flex flex-col overflow-hidden relative">
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
					<span className="font-bold leading-none">{track.name}</span>
					<span className="text-white-400 text-sm">{track.artists.join(", ")}</span>
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
					<Spotify className="text-brand-spotify w-8 h-8" />
				</div>
			</div>
			<TrackProgress length={track.length} progress={trackProgress} />
		</div>
	);
};
