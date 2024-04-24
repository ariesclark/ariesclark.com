"use client";

import { LazyMotion } from "framer-motion";

import type { FC, PropsWithChildren } from "react";

const loadFeatures = () =>
	import("framer-motion").then((module) => module.domAnimation);

export const AnimationProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<LazyMotion strict features={loadFeatures}>
			{children}
		</LazyMotion>
	);
};
