"use client";

import { useFormStatus } from "react-dom";
import { useState, type FC } from "react";

import { Button } from "./button";

const SubmitButton: FC = () => {
	const { pending } = useFormStatus();
	const [complete, setComplete] = useState(false);

	if (pending && !complete) setComplete(true);

	return (
		<Button disabled={pending || complete} type="submit">
			{pending
				? "Sending... ⌛"
				: complete
					? "Message sent ❤️"
					: "Send message"}
		</Button>
	);
};

export const ContactForm: FC<{ action: (data: FormData) => Promise<void> }> = ({
	action
}) => {
	return (
		<form action={action} className="flex w-full flex-col gap-4">
			<div className="grid gap-4 md:grid-cols-2">
				<label className="flex flex-col gap-4">
					<div className="flex flex-col">
						<span className="font-medium">
							Name<span className="text-xs text-pink-400"> *required</span>
						</span>
						<p className="text-sm brightness-75">
							You can provide an alias or a nickname if you prefer, but I&apos;m
							sure you have a beautiful name.
						</p>
					</div>
					<input
						required
						autoCapitalize=""
						autoComplete="name"
						className="w-full rounded bg-white/5 p-4 outline-offset-2 outline-white placeholder:text-neutral-400 focus:outline"
						name="name"
						placeholder="Anonymous"
						type="text"
					/>
				</label>
				<label className="flex flex-col gap-4">
					<div className="flex flex-col">
						<span className="font-medium">Email</span>
						<p className="text-sm brightness-75">
							I&apos;ll use your email to contact you back, unless you provide
							another way to reach you.
						</p>
					</div>
					<input
						autoCapitalize=""
						autoComplete="email"
						className="w-full rounded bg-white/5 p-4 outline-offset-2 outline-white placeholder:text-neutral-400 focus:outline"
						name="email"
						placeholder="you@example.com"
						type="text"
					/>
				</label>
			</div>
			<label className="flex flex-col gap-2">
				<span className="font-medium">
					Message<span className="text-xs text-pink-400"> *required</span>
				</span>
				<textarea
					required
					autoCorrect=""
					className="w-full rounded bg-white/5 p-4 outline-offset-2 outline-white placeholder:text-neutral-400 focus:outline"
					name="message"
					placeholder="Start typing your message..."
					rows={6}
				/>
			</label>
			<SubmitButton />
		</form>
	);
};
