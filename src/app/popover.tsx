"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { twMerge } from "tailwind-merge";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
	(
		{ className, align = "center", sideOffset = 8, children, ...props },
		reference
	) => (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				align={align}
				ref={reference}
				sideOffset={sideOffset}
				className={twMerge(
					"z-50 rounded-lg bg-pink-400 p-2 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className
				)}
				{...props}
			>
				<div className="rounded-lg bg-neutral-800 p-4 text-neutral-200">
					{children}
				</div>
				<PopoverPrimitive.Arrow className="size-3 fill-pink-400" />
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	)
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
