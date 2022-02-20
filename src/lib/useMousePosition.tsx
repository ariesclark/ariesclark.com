import {
	MutableRefObject,
	useCallback, useEffect, useRef
} from "react";

import { Vector2D } from "./2d";

export const useMousePosition = function (): MutableRefObject<Vector2D> {
	const position = useRef<Vector2D>(new Vector2D(0, 0));

	const callback = useCallback((ev: MouseEvent) => {
		position.current.set(ev.clientX, ev.clientY);
	}, []);

	useEffect(() => {
		window.addEventListener("mousemove", callback);
		return () => window.removeEventListener("mousemove", callback);
	}, [callback]);

	return position;
};
