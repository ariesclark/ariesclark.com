import React from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import omit from "lodash/omit";

import { Link } from "./Link";

export const markdownComponents: ReactMarkdownOptions["components"] = {
	a(props) {
		return <Link {...omit(props, ["node"])} />;
	}
};

export const Markdown: React.FC<{ children: string }> = ({ children }) => {
	return <ReactMarkdown components={markdownComponents}>{children}</ReactMarkdown>;
};
