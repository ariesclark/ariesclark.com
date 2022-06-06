import { IconArrowRight } from "./ArrowRight";
import { IconExternalLink } from "./ExternalLink";
import { IconGitHub } from "./GitHub";
import { IconLinkedIn } from "./LinkedIn";
import { IconMail } from "./Mail";
import { IconTwitter } from "./Twitter";

export const iconMap = {
	ArrowRight: IconArrowRight,
	ExternalLink: IconExternalLink,
	GitHub: IconGitHub,
	LinkedIn: IconLinkedIn,
	Mail: IconMail,
	Twitter: IconTwitter
} as const;

export function getIcon(name: string): typeof iconMap[keyof typeof iconMap] {
	if (!iconMap[name as keyof typeof iconMap]) throw new Error(`Unknown icon: ${name}`);
	return iconMap[name as keyof typeof iconMap];
}
