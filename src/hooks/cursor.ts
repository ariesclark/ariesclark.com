import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function useCursor() {
	const cursor = useMotionValue({ x: 0, y: 0 });

	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			const yOffset = document.scrollingElement?.scrollTop || 0;
			cursor.set({ x: event.clientX, y: event.clientY + yOffset });
		};

		window.addEventListener("mousemove", onMouseMove, { passive: true });

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, [cursor]);

	return cursor;
}
