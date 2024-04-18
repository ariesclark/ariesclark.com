import { HeartIcon } from "lucide-react";
import { userAgentFromString } from "next/server";
import { headers as getHeaders } from "next/headers";
import { getClientIp } from "request-ip";
import {
	getCountryData,
	getEmojiFlag,
	type TCountryCode
} from "countries-list";

import { discordContactWebhook, discordId } from "~/environment";

import { SocialList } from "./social-list";
import { ContactForm } from "./contact-form";

import type { FC } from "react";

export const Contact: FC = () => {
	return (
		<div className="relative mx-auto mt-2 flex w-full max-w-[1920px] grow flex-col rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-white 2xl:px-64">
			<section
				className="mx-auto flex size-full max-w-screen-lg grow flex-col gap-16 px-6 py-16 lg:p-16 lg:py-24 lg:pb-96"
				id="contact"
			>
				<div className="flex flex-col">
					<span className="text-3xl font-bold">
						Let&apos;s start a conversation
					</span>
					<span className="max-w-screen-md text-balance brightness-75">
						You can easily reach me through various platforms, and I prefer
						chatting on Discord. However, feel free to reach out on your
						preferred platform — I&apos;m always open to new opportunities.
					</span>
				</div>
				<div className="flex flex-col gap-x-16 gap-y-8 lg:flex-row">
					<SocialList />
					<ContactForm
						action={async (data) => {
							"use server";

							const headers = Object.fromEntries(getHeaders().entries());

							const ip = getClientIp({ headers });
							const agent = userAgentFromString(headers["user-agent"]);

							if (agent.browser.name)
								agent.ua = agent.ua.replaceAll(
									agent.browser.name,
									`**${agent.browser.name}**`
								);

							if (agent.os.name)
								agent.ua = agent.ua.replaceAll(
									agent.os.name,
									`**${agent.os.name}**`
								);

							const countryCode =
								headers["cf-ipcountry"] ||
								headers["x-vercel-ip-country"] ||
								null;

							const country = countryCode
								? getCountryData(countryCode as TCountryCode)
								: null;

							const region =
								headers["cf-ipregion"] ||
								headers["x-vercel-ip-country-region"] ||
								null;
							const city =
								headers["cf-ipcity"] || headers["x-vercel-ip-city"] || null;

							const latitude = headers["x-vercel-ip-latitude"] || null;
							const longitude = headers["x-vercel-ip-longitude"] || null;

							try {
								const name = data.get("name");
								if (!name || typeof name !== "string") return;

								const email = data.get("email");
								if (email && typeof email !== "string") return;

								const message = data.get("message");
								if (!message || typeof message !== "string") return;

								const response = await fetch(discordContactWebhook, {
									method: "POST",
									headers: {
										"Content-Type": "application/json"
									},
									body: JSON.stringify({
										username: "ariesclark.com",
										avatar_url:
											"https://cdn.discordapp.com/avatars/128267277308002304/09ca762060331312bc41fe16bc7c88c3.webp?size=4096",
										content: `||<@${discordId}>||`,
										embeds: [
											{
												author: {
													name: `${name} <${email ?? "unknown"}>`,
													url: email
														? `https://mail.proton.me/inbox/#mailto=${encodeURIComponent(`mailto:${email}`)}`
														: undefined
												},
												description: message,
												fields: [
													{
														name: "Device",
														value: [
															`IP Address: \`\`${ip}\`\``,
															`User Agent: ${agent.ua}`,
															`Location: ${country ? `[${getEmojiFlag(country.iso2)} ${country.name}, ${region}, ${city}](https://google.com/maps/search/${latitude},${longitude})` : "unknown"}`
														]
															.map((value) => `- ${value}`)
															.join("\n")
													}
												],
												footer: {
													text: `Message sent `
												},
												timestamp: new Date().toISOString()
											}
										],
										allowed_mentions: {
											users: [discordId]
										}
									})
								});

								if (!response.ok) throw response;
							} catch (reason) {
								if (reason instanceof Response) {
									console.error({
										status: reason.status,
										statusText: reason.statusText,
										url: reason.url,
										headers: Object.fromEntries(reason.headers.entries()),
										body: await reason.clone().json()
									});
								}

								console.error(reason);
							}
						}}
					/>
				</div>
				<div className="flex flex-col">
					<span>
						Made with{" "}
						<HeartIcon
							aria-label="love"
							className="inline size-5 fill-pink-500 stroke-none"
						/>{" "}
						and sleep deprivation in the middle of the night.
					</span>
					<span className="opacity-50">
						&copy; {new Date().getFullYear()} Aries Clark. All rights reserved.
					</span>
				</div>
			</section>
		</div>
	);
};
