import create from "zustand";

import { Vector2 } from "./2d";

export interface UseMouse {
	position: Vector2;
	setPosition: (newPosition: Vector2) => void;
}

export const useMouse = create<UseMouse>((set, get) => {
	if (typeof window !== "undefined") {
		window.addEventListener("mousemove", ({ clientX, clientY }) => {
			const { position, setPosition } = get();
			setPosition(position.set(clientX, clientY));
		});
	}

	return {
		position: new Vector2(),
		setPosition: (newPosition) => {
			set({ position: newPosition });
		}
	};
});
