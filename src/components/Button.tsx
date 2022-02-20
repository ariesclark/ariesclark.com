import { HTMLAttributes } from "react";

import { IconArrowRight } from "./icons/ArrowRight";

export type ButtonProps = Omit<HTMLAttributes<HTMLAnchorElement>, "className"> & { name: string, icon?: React.ReactElement };
export const Button: React.VFC<ButtonProps> = function (props) {
	const { name, icon } = props;

	return (
		<a {...props} className="flex justify-between w-full px-4 py-2 text-black bg-white border-white rounded hover:text-white group hover:border hover:bg-transparent hover:scale-110">
			<span>{name}</span>
			{icon || (<IconArrowRight className="h-4 my-auto" />)}
		</a>
	);
};
