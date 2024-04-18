import { Slot } from "@radix-ui/react-slot";

import type { FC, PropsWithChildren } from "react";

export const Button: FC<
	PropsWithChildren<{
		asChild?: boolean;
		type?: "button" | "submit";
		disabled?: boolean;
	}>
> = ({ type = "button", disabled, asChild, children }) => {
	const Component = asChild ? Slot : "button";

	return (
		<Component
			className="group/button w-fit cursor-pointer rounded border-2 border-neutral-50 px-8 py-2 font-medium uppercase outline-transparent ring-transparent transition-all delay-75 duration-75 focus:outline-none disabled:pointer-events-none disabled:opacity-75 hocus:border-pink-400 hocus:bg-pink-400 hocus:text-white"
			disabled={disabled}
			type={type}
		>
			{children}
		</Component>
	);
};
