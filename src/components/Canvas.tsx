import { useEffect, useMemo, useRef } from "react";

import { useMousePosition } from "../lib/useMousePosition";
import { Rectangle, Vector2D } from "../lib/2d";

interface BackgroundCanvasProps {
    offsetSpeed: number;
    stepSize: number;
    canvasSize: Vector2D;
}

class Point {
	public active: boolean = false;
	public lastActive: boolean = false;

	public range: number = Math.random() * 2;

	public constructor (
        public position: Vector2D = new Vector2D(0, 0)
	) {

	}
}

export const BackgroundCanvas: React.VFC<BackgroundCanvasProps> = function (props) {
	const { offsetSpeed, stepSize, canvasSize } = props;
	const mouse = useMousePosition();

	const canvasElementRef = useRef<HTMLCanvasElement>(null);
	const context = canvasElementRef.current?.getContext("2d") || null;

	const animationFrameHandle = useRef<number>(0);
	const lastFrameTime = useRef<number>(0);

	const points = useRef<Point[]>([]);
	// const mouseHistory = useRef<{ position: Vector2D, ts: number }[]>([]);

	const offset = useRef<number>(0);
	const offsetMouse = useRef<Vector2D>(new Vector2D());
	const viewport = useRef<Rectangle>(new Rectangle());

	const scaledCanvasSize = useMemo(() => canvasSize.scale(2, 2, true), [canvasSize])

	useEffect(() => {
		points.current = [];
		for (let x = -stepSize; x <= (scaledCanvasSize.x + (stepSize * 2)); x += stepSize) {
			for (let y = -stepSize; y <= (scaledCanvasSize.y + (stepSize * 2)); y += stepSize) {
				points.current.push(new Point(new Vector2D(x, y)));
			}
		}
	}, [scaledCanvasSize, stepSize]);

	useEffect(() => {
		if (!canvasElementRef) return () => {};

		function draw (ctx: CanvasRenderingContext2D, delta: number) {
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			offsetMouse.current.set(mouse.current.x * 2, (mouse.current.y * 2) - offset.current);
			viewport.current.position.set(0, -offset.current);
			viewport.current.size.set(scaledCanvasSize.x, scaledCanvasSize.y);

			ctx.fillStyle = "#ee6c6c";
			ctx.strokeStyle = "white";

			/* ctx.font = "16px monospace";
			ctx.textBaseline = "top";

			ctx.fillText("Mouse position:", 8, 8);
			ctx.fillText(`  Actual:  ${mouse.current.toString()}`, 8, (8 + (16 * 1) + (2 * 1)));
			ctx.fillText(`  Virtual: ${offsetMouse.current.toString()}`, 8, (8 + (16 * 2) + (2 * 2)));

			ctx.fillText("Viewport:", 8, (8 + (16 * 4) + (2 * 4)));
			ctx.fillText(`  Size:    ${canvasSize.toString()}`, 8, (8 + (16 * 5) + (2 * 5)));
			ctx.fillText(`  Camera:  ${viewport.current.toString()}`, 8, (8 + (16 * 6) + (2 * 6)));

			ctx.fillText("World:", 8, (8 + (16 * 8) + (2 * 8)));
			ctx.fillText(`  Offset:  ${offset.current.toString()}`, 8, (8 + (16 * 9) + (2 * 9)));
			ctx.fillText(`  Size:    ${canvasSize.toString()}`, 8, (8 + (16 * 10) + (2 * 10))); */

			ctx.translate(0, offset.current);

			/* ctx.strokeRect(
				viewport.current.position.x,
				viewport.current.position.y,
				viewport.current.size.x,
				viewport.current.size.y
			); */

			ctx.beginPath();
			ctx.arc(offsetMouse.current.x, offsetMouse.current.y, 2, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();

			// const nearestMousePosition: Vector2D = new Vector2D();
			for (let i = 0; i < points.current.length; i += 1) {
				const point = points.current[i];

				const pointMouseDistance = offsetMouse.current.distance(point.position);
				if (pointMouseDistance <= ((stepSize * 2) * point.range)) {
					point.active = true;

					ctx.beginPath();
					ctx.moveTo(point.position.x, point.position.y);
					ctx.lineTo(offsetMouse.current.x, offsetMouse.current.y);
					ctx.closePath();
					ctx.stroke();

					/* if (offsetMouse.current.distance(nearestMousePosition) >= pointMouseDistance) {
						nearestMousePosition = point.position;
					} */

					// point.range = MathUtils.clamp(Math.random() * 10, 0.5, 10);
				} else {
					point.active = false;
				}

				/* if (point.lastActive && !point.active) {
					point.range = Math.random() * 2;
					point.lastActive = false;
				} */

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

			/* mouseHistory.current = [...mouseHistory.current, {
				position: nearestMousePosition.clone(),
				ts: Date.now()
			}].filter((entry) => {
				return (Date.now() - entry.ts) <= 410;
			});

			if (mouseHistory.current.length >= 50) {
				ctx.beginPath();
                ctx.moveTo(mouseHistory.current[0].position.x, mouseHistory.current[0].position.y);
				for (let i = 0; i < mouseHistory.current.length; i += 1) {
					const mouseHistoryEntry = mouseHistory.current[i];
					ctx.lineTo(mouseHistoryEntry.position.x, mouseHistoryEntry.position.y);
				}

				ctx.closePath();
				ctx.strokeStyle = "white";
				ctx.stroke();
			} */

			offset.current = (offset.current - (1 * (offsetSpeed))) % stepSize;
			// offset.current -= (1 * (offsetSpeed / delta));
		}

		function animate (elapsedTime: number): void {
			const delta = elapsedTime - (lastFrameTime.current || 0);
			animationFrameHandle.current = requestAnimationFrame(animate);
			if (!context) return;

			/*
                if we *don't* already have a first frame, and the delta is less
                than 33ms (30fps in this case) then don't do anything and return.

                @see https://remysharp.com/2015/07/13/optimising-a-canvas-animation#pinning-fps
            */
			if (lastFrameTime.current && delta < (33)) return;

			lastFrameTime.current = elapsedTime;
			draw(context, delta);
		}

		animationFrameHandle.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameHandle.current);
	}, [context, mouse, stepSize, offsetSpeed, scaledCanvasSize]);

	return (
		<canvas
			ref={canvasElementRef}
			className="w-full h-full bg-neutral-900"
			width={scaledCanvasSize.x}
			height={scaledCanvasSize.y}
		/>
	);
};
