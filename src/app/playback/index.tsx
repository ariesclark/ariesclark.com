import { getCurrentPlayback } from "~/upstream/spotify";

import { InteractivePlayback } from "./client";

export async function Playback() {
	const playback = await getCurrentPlayback();

	return (
		<InteractivePlayback
			initialValue={playback}
			get={async () => {
				"use server";
				return getCurrentPlayback();
			}}
		/>
	);
}
