import {
	ArrowTrendingDownIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon
} from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

import { SubtleLink } from "~/components/subtle-link";
import { useGlobalState } from "~/hooks/use-global-state";

import { Heart } from "./heart";

export const IntroductionScreen: React.FC = () => {
	const [{ loaded, muted }, setGlobalState] = useGlobalState();

	const SoundToggleIcon = muted ? SpeakerXMarkIcon : SpeakerWaveIcon;

	return (
		<div
			className={twMerge(
				"fixed top-0 left-0 z-40 flex h-full w-full cursor-pointer items-center justify-center bg-black-100 font-nunito transition-all duration-500",
				loaded ? "pointer-events-none opacity-0" : "opacity-100"
			)}
			onClick={() => setGlobalState((globalState) => ({ ...globalState, loaded: true }))}
		>
			<div className="flex w-full max-w-3xl flex-col gap-16">
				<div className="flex flex-col gap-16 md:flex-row">
					<div className="flex flex-col gap-8 px-8 md:px-0">
						<div className="flex flex-col">
							<h1 className="font-inter text-6xl font-extralight">Aries Clark</h1>
							<span className="text-xl font-light md:text-2xl">
								Finding my pulse in every opportunity
							</span>
						</div>
						<span className="max-w-md text-white-300">
							For the best experience, it is recommended that you use headphones when viewing this
							website. Please also be mindful of your surroundings and avoid accessing this site in
							any public spaces. Thank you.
						</span>
					</div>
					<Heart noAudio noText className="mx-auto px-8 md:mx-0 md:px-0" />
				</div>
				<div className="flex flex-col-reverse gap-8 px-8 md:flex-row md:px-0">
					<button className="rounded-xl bg-white-100 py-4 px-6" type="button">
						<span className="font-inter text-black-100">Click anywhere to continue</span>
					</button>
					<button
						className="relative flex gap-4"
						type="button"
						onClick={(event) => {
							setGlobalState((globalState) => ({ ...globalState, muted: !globalState.muted }));
							event.stopPropagation();
						}}
					>
						<SoundToggleIcon className="h-12 w-12" />
						<div className="absolute -top-8 left-16 flex w-max rotate-[16deg] animate-opacity-in flex-col [animation-delay:1000ms] [animation-duration:300ms]">
							<span className="w-32 font-itim">{muted ? "Unmute audio" : "Mute audio"}.</span>
							<ArrowTrendingDownIcon className="mt-4 w-10 rotate-90" strokeWidth={1} />
						</div>
					</button>
				</div>
				<span className="mt-8 px-8 text-white-400 md:px-0">
					<SubtleLink
						external={false}
						href="https://ariesclark.com"
						onClick={(event) => event.stopPropagation()}
					>
						Aries Clark
					</SubtleLink>
					, Software Engineer and Consultant. <br />
					Copyright © {new Date().getFullYear()}, All rights reserved.
				</span>
			</div>
		</div>
	);
};
