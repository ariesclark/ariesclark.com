import Link from "next/link";
import { twMerge } from "tailwind-merge";

export type SubtleLinkProps = Parameters<typeof Link>[0] & { external?: boolean };

export const SubtleLink: React.FC<SubtleLinkProps> = ({ external = true, ...props }) => {
	return (
		<Link
			{...props}
			className={twMerge("underline decoration-dotted", props.className)}
			target={external ? "_blank" : "_self"}
		/>
	);
};
