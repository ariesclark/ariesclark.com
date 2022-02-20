import { HTMLAttributes } from "react";
import omit from "lodash/omit";

import { IconArrowRight } from "./icons/ArrowRight";

export type ButtonProps = Omit<HTMLAttributes<HTMLButtonElement>, "className"> & { name: string, icon?: React.ReactElement };
export const Button: React.VFC<ButtonProps> = function (props) {
	const { name, icon } = props;

	return (
		<button {...omit(props, ["name", "icon"])} type="button" className="flex justify-between w-full px-4 py-2 text-black bg-white border-white rounded hover:text-white group hover:border hover:bg-transparent hover:scale-110">
			<span>{name}</span>
			{icon || (<IconArrowRight className="h-4 my-auto" />)}
		</button>
	);
};
