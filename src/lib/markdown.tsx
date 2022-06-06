import React from "react";
import omit from "lodash/omit";

export const markdownComponents: { [key: string]: React.FC } = {
	a(props) {
		return (
			<a {...omit(props, ["node"])} className="hover:text-red-400 hover:underline" target="_blank">
				{props.children}
			</a>
		);
	}
};
