import { HTMLAttributes } from "react";

import { omit } from "../lib/omit";

import { IconArrowRight } from "./icons/ArrowRight";

export type ButtonProps = Omit<HTMLAttributes<HTMLButtonElement>, "className"> & {
	name: string;
	icon?: React.ReactElement;
};

export const Button: React.VFC<ButtonProps> = function (props) {
	const { name, icon } = props;

	return (
		<button
			{...omit(props, ["name", "icon"])}
			className="group flex justify-between py-2 px-4 w-full text-black bg-white hover:bg-red-400 rounded hover:brightness-90"
			type="button"
		>
			<span>{name}</span>
			{icon || <IconArrowRight className="my-auto h-4" />}
		</button>
	);
};
