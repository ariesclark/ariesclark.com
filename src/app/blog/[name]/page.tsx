import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { twMerge } from "tailwind-merge";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params: { name } }: { params: { name: string } }) {
	//const markdown = await fetch(
	//	`https://raw.githubusercontent.com/ariesclark/blogs/master/${name}.mdx`
	//).then((res) => res.text());

	const markdown = `
	> This is written as a <Highlight color="blue">thought-stream</Highlight>. I'm not sure where I'm going with this, but I feel like I need to write it down. It's a bit of a ramble, but I'm hoping that it will help me to get my thoughts in order. 

	<b>Editor's Note</b>: Burnout, a <Highlight color="yellow">downward spiral</Highlight> in a sense, at least for me. I realize, after reading up through what I've wrote, it might not be well-written or even legible to many, a mess of <Highlight color="yellow">tangled thoughts</Highlight>, crudely sewn together.. but <Highlight color="green">I'm thankful at least</Highlight>, that you're willing spending your time reading it.
	
	<Highlight color="red">I'm burned out</Highlight>, and I'm not sure what to do about it. Over the past month or so I've been struggling to get out of bed in the morning. <Highlight color="red">I don't have the energy</Highlight>. I never felt like I was stressed or overworked, but I guess I was wrong. I feel like I've lost the passion I previously had.
	
	<Highlight color="yellow">Burnout wasn't something I saw coming, it just suddenly hit me.</Highlight> Looking back, the signs were obvious, I was told by many people you should slow down or just take a break occasionally. I didn't listen, telling myself that <Highlight color="yellow">it wouldn't affect me</Highlight>. I was different, or so I thought. I'd spend upwards of 14 hours daily just coding, I told myself that <Highlight color="yellow">if I can do that, why wouldn't I</Highlight>? Building things was my passion, and I loved it. I still do, but I'm not sure if I can continue at the pace I was going. It's a painful thing, to <Highlight color="red">lose your passion</Highlight>, and I'm not sure how to get it back.
	
	Not even a couple months ago, I'd open our repository and quickly find something to do, it might've not been on our priority list, or even on the roadmap, but I'd always be able to find something to do, and <Highlight color="green">I'd be happy</Highlight> to do it. Now, whenever I open our issue tracker, <Highlight color="yellow">I just feel overwhelmed</Highlight>. I don't know where to start, and I don't know what to do. I'd often just <Highlight color="yellow">stare blankly</Highlight> at VSCode, trying to encourage myself to get something done. I'd hope for an easy out, an excuse to do something else. Twitter made it so easy, just <Highlight color="yellow">endlessly scrolling</Highlight> and see what other people were doing. I'd tell myself that I was just looking for inspiration, but I knew that wasn't true. I was just trying to <Highlight color="red">avoid the work</Highlight> I knew I had to do.
	
	I'm <Highlight color="red">tired</Highlight>, I'm <Highlight color="red">exhausted</Highlight>, I feel like I'm <Highlight color="red">disappointing</Highlight> so many people. I have not been holding myself to the standards I know I should. Even little things like <Highlight color="yellow">taking care of myself, I'm not doing</Highlight>. Eating has always been an issue for me, I wouldn't eat until I was starving, and oddly enough <Highlight color="green">I'm eating more now</Highlight>. I barely keep myself clean, I don't shower as often as I should, and when I do, I <Highlight color="yellow">sit in the shower for hours</Highlight>, letting the water run down me until it got cold. And finally, I would drag myself up and get out, only to go back to my room and sit in front of my computer. I'd tell myself that I was going to do something, but I never did. I'd just sit there, staring at my screen, hoping that I'd find the motivation to do something. <Highlight color="red">It never happened</Highlight>.
	
	I'd start something new, light a spark in something else. And it would work, I'd be <Highlight color="green">excited to work on it</Highlight>, yet again, spending hours on end until I just <Highlight color="yellow">lose interest again</Highlight>. Maybe it got too complicated, or it was too much work, maybe I simply just got bored. It happens time and time again. <Highlight color="red">It's frustrating</Highlight>. I want to be able to finish something, I want to be able to see something through to the end, but I can't. I don't know why, but I can't. I've tried so many times, and I've failed so many times. I'm tired of failing, I'm tired of disappointing myself, and I'm tired of disappointing others.
	
	Social circles have always been an issue for me, I've never been good at making friends, and I've never been good at keeping them. I would often <Highlight color="yellow">push people away</Highlight>, I'd be thoughtlessly rude and I'd lack empathy. I've told myself countless times maybe <Highlight color="red">I'm just a sociopath</Highlight>, I can't care about people. I want to, but I don't. I've always been a bit of a loner, and I've always been fine with that. I've never been one to go out and party, or even go out at all. I'd always be at home, in my room, on my computer. I'd tell myself that I was fine, that I didn't need anyone else, but I was wrong. I've always been wrong. I've always been afraid of being alone, and I've always been afraid of being left behind. I've always been afraid of being forgotten. These fears should drive me to do better, to be better, and yet I'm still here, doing nothing. I want to be something, I want to be someone, but I don't know how. I don't know what to do.
	
	In school, it was the same. Often in a corner, alone, doing my own thing. I did make a few friends over those years, but I never kept them. The few I've had, lost recently now, I'm rude, I'm a dick, I'm an asshole they'd tell me. I coped by telling myself it's their loss, I'm better without them anyways. It would hurt me, "oh, we don't hangout with them anymore", they'd talk behind my back. I'd be oblivious, I didn't know I did anything wrong.
	
	I still, as I'm writing this, don't have a solution. Burnout might've just been the trigger to something deeper for me, unlocking depression and thoughts I kept away to protect myself. But here I am, still struggling, I hope you've learned something from this at least, thank you.
	`;

	return (
		<div className="h-screen w-full overflow-y-auto">
			<div className="flex items-center justify-center p-8 py-16 md:py-64">
				<div className="flex max-w-2xl flex-col gap-8">
					<h1 className="font-inter text-5xl font-bold md:text-8xl">Burnout</h1>
					<div className="flex flex-col">
						<h2 className="inline-flex gap-4 font-inter text-2xl font-light">
							<Image
								alt="Picture of the author"
								className="h-8 w-8 rounded-full"
								height={32}
								src="https://avatars.githubusercontent.com/u/10256477?v=4"
								width={32}
							/>
							<span>Aries Clark</span>
						</h2>
						<span className="font-inter text-lg font-extralight text-white-400">
							Published August 17th, 2023
						</span>
					</div>
					<div className="flex flex-col gap-4 text-lg">
						<MDXRemote
							source={markdown}
							components={{
								Highlight: ({ children, color }) => {
									return (
										<span
											className={twMerge(
												color === "red" &&
													"animate-skew-x-shake inline-block bg-[#f708081c] text-[#fa1d1d]",
												color === "yellow" && "bg-[#f7e8081c] text-[#faed1d]",
												color === "green" && "bg-[#08f70c1c] text-[#1dfa4a]",
												color === "blue" && "bg-[#0892f71c] text-[#1dbcfa]"
											)}
										>
											{children}
										</span>
									);
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
