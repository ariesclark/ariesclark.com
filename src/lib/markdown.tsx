import React from "react";
import omit from "lodash/omit";

export const markdownComponents: { [key: string]: React.FC } = {
	a (props) {
		return (
			<a
				{...omit(props, ["node"])}
				className="hover:underline hover:text-red-400"
				target="_blank"
			>
				{props.children}
			</a>
		);
	}
};
