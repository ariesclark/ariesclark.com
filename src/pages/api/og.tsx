/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "@vercel/og";

export const config = {
	runtime: "edge"
};

export default async function () {
	return new ImageResponse(
		(
			<div
				style={{ backgroundColor: "#0a0a0a", color: "#f5f5f5" }}
				tw="flex flex-col-reverse w-full h-full items-center"
			>
				<div tw="flex items-center justify-center flex-col absolute w-full h-full ">
					<span tw="text-8xl">Aries Clark</span>
					<span tw="text-4xl">&#x1F1E8;&#x1F1E6; Canadian software engineer</span>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 600
		}
	);
}
