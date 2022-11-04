import { FlagIcon } from "@heroicons/react/24/solid";

import { Section } from "./section";

export const SectionFlag: React.FC = () => (
	<Section flagTrigger className="bg-white-200" labelIcon={<FlagIcon />}>
		<div className="flex items-center justify-center w-full h-full -mt-16">
			<svg
				className="h-full 2xl:h-96"
				viewBox="540 400 3720 4030"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					className="fill-red-200"
					d="m2490 4430-45-863a95 95 0 01111-98l859 151-116-320a65 65 0 0120-73l941-762-212-99a65 65 0 01-34-79l186-572-542 115a65 65 0 01-73-38l-105-247-423 454a65 65 0 01-111-57l204-1052-327 189a65 65 0 01-91-27l-332-652-332 652a65 65 0 01-91 27l-327-189 204 1052a65 65 0 01-111 57l-423-454-105 247a65 65 0 01-73 38l-542-115 186 572a65 65 0 01-34 79l-212 99 941 762a65 65 0 0120 73l-116 320 859-151a95 95 0 01111 98l-45 863z"
				/>
			</svg>
		</div>
	</Section>
);
