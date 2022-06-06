import create from "zustand";

import { Vector2 } from "./2d";

export interface UseWindowSize {
	size: Vector2;
	setSize: (newSize: Vector2) => void;
}

export const useWindowSize = create<UseWindowSize>((set, get) => {
	if (typeof window !== "undefined") {
		window.addEventListener("resize", () => {
			const { size, setSize } = get();
			setSize(size.set(window.innerWidth, window.innerHeight));
		});
	}

	return {
		size:
			typeof window !== "undefined"
				? new Vector2(window.innerWidth, window.innerHeight)
				: new Vector2(),
		setSize: (newSize) => {
			set({ size: newSize });
		}
	};
});
