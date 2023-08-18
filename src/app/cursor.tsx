"use client";

import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const cursorAtom = atom({
	x: Number.MIN_SAFE_INTEGER,
	y: Number.MIN_SAFE_INTEGER,
	size: 16
});

export const Cursor: React.FC = () => {
	const [cursor, setCursor] = useAtom(cursorAtom);

	useEffect(() => {
		function onMouseMove(event: MouseEvent) {
			const size =
				event.target instanceof Element && getComputedStyle(event.target).cursor === "text"
					? 0
					: 16;
			setCursor({ x: event.x, y: event.y, size });
		}

		function onResize() {
			setCursor((cursor) => ({ ...cursor }));
		}

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("resize", onResize);
		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("resize", onResize);
		};
	});

	if (cursor.x < 0 || cursor.y < 0) return null;

	return (
		<div
			className="pointer-events-none absolute z-50 hidden will-change-transform md:flex"
			style={{ transform: `translate(${cursor.x}px,${cursor.y}px)` }}
		>
			<div
				className="ml-[-50%] mt-[-50%] animate-cursor-in rounded-full backdrop-hue-rotate-180 backdrop-invert transition-all"
				style={{ width: `${cursor.size}rem`, height: `${cursor.size}rem` }}
			/>
		</div>
	);
};
