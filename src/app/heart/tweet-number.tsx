import { useInView, useMotionValue, useSpring } from "framer-motion";
import { FC, memo, useEffect, useMemo, useRef } from "react";

import { toOptionalFixed } from "~/utils/number";

interface FormatOptions {
	fixed?: number;
}

const format = (value: number, { fixed, ...options }: FormatOptions = {}) =>
	Intl.NumberFormat("en-US", options).format(
		typeof fixed === "number" ? toOptionalFixed(value, fixed) : value
	);

export const TweenNumber: FC<
	{
		value: number;
	} & FormatOptions
> = memo(({ value, fixed = 0 }) => {
	const formatOptions = useMemo<FormatOptions>(() => ({ fixed }), [fixed]);

	const reference = useRef<HTMLSpanElement>(null);
	const originalValue = useRef(value);

	const motionValue = useMotionValue(value);
	const springValue = useSpring(motionValue, {
		damping: 100,
		stiffness: 100
	});

	const isInView = useInView(reference);
	if (isInView) motionValue.set(value);

	useEffect(
		() =>
			springValue.on("change", (latest) => {
				if (!reference.current) return;

				reference.current.textContent = format(latest, formatOptions);
			}),
		[springValue, formatOptions]
	);

	return (
		<span suppressHydrationWarning ref={reference}>
			{format(originalValue.current, formatOptions)}
		</span>
	);
});
