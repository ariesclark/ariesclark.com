"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

export interface ImageGallaryProps {
	images: Array<[image: StaticImageData, alt: string]>;
}

export const ImageGallery: React.FC<ImageGallaryProps> = ({ images }) => {
	const [activeIdx, setActiveIdx] = useState(0);
	const [activeImage, activeImageAlt] = images[activeIdx];

	return (
		<div className="rounded shadow-highlight w-full overflow-hidden grid grid-cols-4">
			<Image
				alt={activeImageAlt}
				className="w-full col-span-3 aspect-square object-cover object-center"
				src={activeImage}
			/>
			<div className="flex flex-col">
				{images.map((value, imageIdx) => {
					const [image, alt] = value;
					if (imageIdx === activeIdx) return;

					return (
						<button
							className="brightness-50 hocus:brightness-100"
							key={imageIdx}
							type="button"
							onClick={() => setActiveIdx(imageIdx)}
						>
							<Image
								alt={alt}
								className="w-full aspect-square object-cover object-center"
								src={image}
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
};
