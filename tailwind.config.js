/* eslint-disable no-undef */
const plugin = require("tailwindcss/plugin");

const colors = {
	black: {
		100: "#191919",
		200: "#141414",
		300: "#0a0a0a"
	},
	white: {
		100: "#f5f5f5",
		200: "#ebebeb",
		300: "#e0e0e0",
		400: "#d6d6d6"
	},
	red: {
		100: "#cf4f4f",
		200: "#ca3f3f",
		300: "#c03535"
	}
};

/** @type import("tailwindcss").Config */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			width: {
				"screen-1/9": "11.1111111vw",
				"screen-1/8": "12.5vw",
				"screen-1/2": "50vw",
				"screen-1/3": "33.3333333vw",
				100: "37rem"
			},
			screens: {
				"2xl": "1440px"
			}
		},
		boxShadow: {
			highlight:
				"0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"
		},
		fontFamily: {
			inter: "var(--font-inter)",
			nunito: "var(--font-nunito)"
		},
		colors
	},
	plugins: [require("tailwind-scrollbar"), require("tailwindcss-hocus")]
};
