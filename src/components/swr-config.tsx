"use client";

import { ComponentProps, FC } from "react";
import { SWRConfig as _SWRConfig } from "swr";

export const SWRConfig: FC<ComponentProps<typeof _SWRConfig>> = (props) => (
	// SWR doesn't register itself as a client-side component, so we have to do it manually.
	<_SWRConfig {...props} />
);
