/* eslint-disable no-mixed-operators */
import React, { createRef } from "react";
import create from "zustand";

import { useMouse } from "../lib/useMouse";
import { Vector2 } from "../lib/2d";
import { useAnimationFrame } from "../lib/useAnimationFrame";
import { useWindowSize } from "../lib/useWindowSize";

class Point {
	public range: number = Math.random() * 2;

	public constructor(public position: Vector2 = new Vector2(0, 0)) {}
}

export interface UseCanvas {
	points: Array<Point>;
	yOffset: number;
	getContext: () => CanvasRenderingContext2D | null;
	Canvas: React.FC;
}

const useCanvas = create<UseCanvas>((set, get) => {
	const stepSize = 96;
	const points: Array<Point> = updatePoints(false);

	const ref = createRef<HTMLCanvasElement>();

	function updatePoints(update: boolean = true): Array<Point> {
		const { size: windowSize } = useWindowSize.getState();
		const size = windowSize.scale(2, 2);

		const newPoints: Array<Point> = [];
		for (let x = -stepSize; x <= size.x + stepSize * 2; x += stepSize) {
			for (let y = -stepSize; y <= size.y + stepSize * 2; y += stepSize) {
				newPoints.push(new Point(new Vector2(x, y)));
			}
		}

		if (update) set({ points: newPoints });
		return newPoints;
	}

	useWindowSize.subscribe(() => updatePoints());

	const Canvas: React.FC = () => {
		useAnimationFrame(() => {
			const mouse = useMouse.getState().position;
			const windowSize = useWindowSize.getState().size;

			const { points, yOffset, getContext } = get();
			const context = getContext();
			if (!context) return;

			context.canvas.width = windowSize.x;
			context.canvas.height = windowSize.y;

			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);

			context.fillStyle = "#ee6c6c";
			context.strokeStyle = "white";

			context.beginPath();
			context.arc(mouse.x, mouse.y, 2, 0, 2 * Math.PI);
			context.closePath();
			context.fill();

			context.translate(0, yOffset);
			const offsetMouse = mouse.sub(0, yOffset, true);

			for (let i = 0; i < points.length; i += 1) {
				const point = points[i];
				const position = point.position.scale(0.5, 0.5, true);

				context.beginPath();
				context.moveTo(position.x, position.y);
				context.lineTo(position.x + stepSize, position.y);
				context.moveTo(position.x + stepSize, position.y);
				context.lineTo(position.x + stepSize, position.y + stepSize);
				context.closePath();
				context.strokeStyle = "rgba(255, 255, 255, 0.05)";
				context.stroke();

				let active = false;
				if (offsetMouse.distance(position) < stepSize * point.range) {
					active = true;

					context.beginPath();
					context.moveTo(position.x, position.y);
					context.lineTo(offsetMouse.x, offsetMouse.y);
					context.closePath();
					context.stroke();
				}

				context.beginPath();
				context.fillStyle = active ? "rgba(238, 108, 108, .5)" : "rgba(255, 255, 255, 0.25)";
				context.arc(position.x, position.y, 2, 0, 2 * Math.PI);
				context.closePath();
				context.fill();
			}

			set({ yOffset: (yOffset - 0.5) % stepSize });
		});

		return <canvas ref={ref} />;
	};

	return {
		points,
		yOffset: 0,
		getContext: () => {
			return ref.current?.getContext("2d") || null;
		},
		Canvas
	};
});

export const BackgroundCanvas: React.FC = function () {
	const Canvas = useCanvas((state) => state.Canvas);
	return <Canvas />;

	/* useAnimationFrame(() => {
		if (!canvasElementRef.current) return;
		const ctx = canvasElementRef.current?.getContext("2d");
		if (!ctx) return;

		console.log(points);

		const {
			position: { x: mouseX, y: mouseY }
		} = useMouse.getState();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		offsetMouse.current.set(mouseX * 2, mouseY * 2 - offset.current);
		viewport.current.position.set(0, -offset.current);
		viewport.current.size.set(scaledCanvasSize.x, scaledCanvasSize.y);

		ctx.fillStyle = "#ee6c6c";
		ctx.strokeStyle = "white";
		ctx.translate(0, offset.current);

		ctx.beginPath();
		ctx.arc(offsetMouse.current.x, offsetMouse.current.y, 2, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();

		for (let i = 0; i < points.current.length; i += 1) {
			const point = points.current[i];

			const pointMouseDistance = offsetMouse.current.distance(point.position);
			if (pointMouseDistance <= stepSize * 2 * point.range) {
				point.active = true;

				ctx.beginPath();
				ctx.moveTo(point.position.x, point.position.y);
				ctx.lineTo(offsetMouse.current.x, offsetMouse.current.y);
				ctx.closePath();
				ctx.stroke();
			} else {
				point.active = false;
			}

			ctx.beginPath();
			ctx.moveTo(point.position.x, point.position.y);
			ctx.lineTo(point.position.x + stepSize, point.position.y);
			ctx.moveTo(point.position.x + stepSize, point.position.y);
			ctx.lineTo(point.position.x + stepSize, point.position.y + stepSize);
			ctx.closePath();
			ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
			ctx.stroke();

			ctx.beginPath();
			ctx.fillStyle = point.active ? "rgba(238, 108, 108, 0.5)" : "rgba(255, 255, 255, 0.25)";
			ctx.arc(point.position.x, point.position.y, point.active ? 2.5 : 2, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
		}

		offset.current = (offset.current - 1 * offsetSpeed) % stepSize;
	}); */
};
