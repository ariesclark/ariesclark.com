"use client";

import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const cursorAtom = atom({
	x: Number.MIN_SAFE_INTEGER,
	y: Number.MIN_SAFE_INTEGER
});

export const Cursor: React.FC = () => {
	const [cursor, setCursor] = useAtom(cursorAtom);

	useEffect(() => {
		function onMouseMove(event: MouseEvent) {
			setCursor({ x: event.pageX, y: event.pageY });
		}

		document.addEventListener("mousemove", onMouseMove);
		return () => document.removeEventListener("mousemove", onMouseMove);
	});

	if (cursor.x < 0 || cursor.y < 0) return null;

	return (
		<div
			className="pointer-events-none absolute z-50 hidden will-change-transform md:flex"
			style={{ transform: `translate(${cursor.x}px,${cursor.y}px)` }}
		>
			<div className="mt-[-50%] ml-[-50%] h-64 w-64 animate-cursor-in rounded-full backdrop-hue-rotate-180 backdrop-invert" />
		</div>
	);
};
