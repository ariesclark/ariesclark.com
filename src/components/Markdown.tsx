import React from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { twMerge } from "tailwind-merge";

import { omit } from "../lib/omit";

import { Link } from "./Link";

export const markdownComponents: ReactMarkdownOptions["components"] = {
	a(props) {
		return <Link {...omit(props, ["node"])} />;
	}
};

export type MarkdownProps = Omit<JSX.IntrinsicElements["div"], "children"> & { children: string };

export const Markdown: React.FC<MarkdownProps> = (props) => {
	return (
		<div
			{...omit(props, ["children"])}
			className={twMerge("flex flex-col space-y-3", props.className)}
		>
			<ReactMarkdown components={markdownComponents}>{props.children}</ReactMarkdown>
		</div>
	);
};
