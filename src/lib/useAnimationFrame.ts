import { useCallback, useEffect } from "react";

export type AnimationFrameFunction = (delta: number) => void;

export function useAnimationFrame(fn: AnimationFrameFunction) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const callback = useCallback(fn, []);

	useEffect(() => {
		let frameRef: number = 0;
		let lastFrameTime = 0;

		function draw(elapsedTime: number) {
			frameRef = requestAnimationFrame(draw);

			const delta = elapsedTime - (lastFrameTime || 0);
			if (lastFrameTime && delta < 33) return;

			lastFrameTime = elapsedTime;
			callback(delta);
		}

		frameRef = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(frameRef);
	}, [callback]);
}
