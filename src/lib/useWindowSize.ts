import {
	useCallback, useEffect, useState
} from "react";

import { Vector2D } from "./2d";

export const useWindowSize = function (): Vector2D {
	const [position, setPosition] = useState<Vector2D>(new Vector2D(0, 0));

	const callback = useCallback(() => {
		setPosition(new Vector2D(window.innerWidth, window.innerHeight));
	}, []);

	useEffect(() => {
		callback();
		window.addEventListener("resize", callback);
		return () => window.removeEventListener("resize", callback);
	}, [callback]);

	return position;
};
