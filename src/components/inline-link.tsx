import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const InlineLink: React.FC<Parameters<typeof Link>[0]> = (props) => (
	<Link {...props} className={twMerge("hocus:underline focus:outline-none", props.className)} />
);
