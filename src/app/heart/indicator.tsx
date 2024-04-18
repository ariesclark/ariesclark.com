import { useMotionValue, useTransform, m } from "framer-motion";
import { FC, useEffect } from "react";
import { createPortal } from "react-dom";

export interface IndicatorProps {
	id: number;
	created: number;
	offset: number;
	ttl: number;
	scale: number;
	x: number;
	y: number;
}

export const Indicator: FC<IndicatorProps> = ({
	created,
	offset,
	x: xOrigin,
	y: yOrigin,
	scale: targetScale,
	ttl
}) => {
	const time = useMotionValue(0);

	useEffect(() => {
		const interval = setInterval(() => {
			time.set(Date.now());
		}, 1);

		return () => clearInterval(interval);
	});

	const progress = useTransform(
		time,
		(latest) => ((latest - created) / ttl) * 100
	);

	const scale = useTransform(
		progress,
		[0, 5, 100],
		[0, targetScale, targetScale]
	);

	const opacity = useTransform(progress, [0, 100], [1, 0]);

	const x = useTransform(progress, [0, 100], [xOrigin, xOrigin + 100]);
	const y = useTransform(progress, [0, 100], [yOrigin, yOrigin + 100]);

	return createPortal(
		<m.div
			className="pointer-events-none absolute select-none text-white"
			style={{
				opacity,
				scale,
				left: x,
				top: y
			}}
		>
			<span>
				{offset > 0 && "+"}
				{offset}
			</span>
		</m.div>,
		document.body
	);
};
