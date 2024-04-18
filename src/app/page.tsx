import { Menu } from "lucide-react";
import { FC } from "react";

import { age } from "~/environment";

import { Heart } from "./heart";
import { NavigationItem } from "./navigation-item";
import { Link } from "./link";
import { Marquee } from "./marquee";
import { SocialList } from "./social-list";
import { Contact } from "./contact";
import { Button } from "./button";
import { WorkAndExperience } from "./experience";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const dynamic = "force-static";

const Header: FC = () => {
	return (
		<header className="mb-2 flex items-center justify-between gap-4 rounded-lg bg-neutral-100 px-6 py-4 uppercase text-neutral-800 dark:bg-neutral-900 dark:text-white lg:px-16 lg:py-8">
			<Link className="text-lg font-medium" href="/">
				Aries Clark
			</Link>
			<div className="flex items-center gap-8">
				<div className="hidden items-center gap-4 lg:flex">
					<NavigationItem>About me</NavigationItem>
					<NavigationItem href="/#work">Work & Experiences</NavigationItem>
					<Popover>
						<PopoverTrigger className="uppercase">Articles</PopoverTrigger>
						<PopoverContent className="w-96">
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<span className="font-medium">✨ Coming soon!</span>
									<p className="opacity-85">
										I don&apos;t have any articles yet, but I&apos;m planning to
										write some in the future.
									</p>
								</div>
								<Button asChild>
									<Link href="/#contact">Interested?</Link>
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex items-center gap-4">
					<Button asChild>
						<Link href="/#contact">Let&apos;s Chat</Link>
					</Button>
					<Menu className="size-6 lg:hidden" />
				</div>
			</div>
		</header>
	);
};

export default function Home() {
	return (
		<div className="mx-auto max-w-[1920px] grow">
			<Header />
			<div className="flex min-h-svh w-full flex-col rounded-t-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-white 2xl:px-64">
				<div className="flex h-full grow flex-col items-center justify-center px-6 py-12 lg:px-16 lg:py-8 lg:pb-16">
					<div className="pointer-events-none flex size-full grow flex-col items-center gap-x-16 gap-y-24 lg:-translate-y-32 lg:flex-row lg:justify-between">
						<div className="pointer-events-auto flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:gap-16">
							<SocialList />
							<div className="flex flex-col gap-4">
								<div className="flex flex-col">
									<h1 className="text-3xl font-bold lg:text-6xl">
										Aries Clark
									</h1>
									<p className="text-xl brightness-75">
										Software Engineer & Consultant
									</p>
								</div>
								<p className="w-full max-w-xl text-lg font-thin brightness-90">
									{age()}-year-old software engineer, consultant. I&apos;m
									passionate about building products and platforms that enable
									creators and entrepreneurs to bring their ideas to life.
								</p>
							</div>
						</div>
						<div className="pointer-events-auto flex flex-col gap-8">
							<Heart />
							{/* <Playback /> */}
						</div>
					</div>
				</div>
				<Marquee />
			</div>
			<WorkAndExperience />
			<Contact />
		</div>
	);
}
