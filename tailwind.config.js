/** @type {import('tailwindcss').Config} */
const config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	darkMode: "class",
	theme: {
		extend: {
			animation: {
				marquee: "marquee 25s linear infinite",
				"marquee-inverse": "marquee-inverse 25s linear infinite",
				heartbeat: "heartbeat 3s infinite"
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" }
				},
				"marquee-inverse": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0%)" }
				},
				heartbeat: {
					"0%": {
						transform: "scale(1)"
					},

					"20%": {
						transform: "scale(1.1)"
					},

					"40%": {
						transform: "scale(1)"
					},

					"60%": {
						transform: "scale(1.1)"
					},

					"80%": {
						transform: "scale(1)"
					},

					"100%": {
						transform: "scale(1)"
					}
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("tailwindcss-hocus")]
};
export default config;
