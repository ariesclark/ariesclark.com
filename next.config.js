/** @type {import("next").NextConfig} */
const nextConfig = {
	experimental: {
		mdxRs: true
	},
	reactStrictMode: true,
	images: {
		domains: ["pbs.twimg.com", "i.scdn.co", "avatars.githubusercontent.com"]
	},
	modularizeImports: {
		"@heroicons/react/24/outline": {
			transform: "@heroicons/react/24/outline/{{member}}",
			preventFullImport: true
		},
		"@heroicons/react/24/solid": {
			transform: "@heroicons/react/24/solid/{{member}}",
			preventFullImport: true
		}
	},
	headers: async () => {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "X-DNS-Prefetch-Control",
						value: "on"
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload"
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block"
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN"
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff"
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin"
					},
					{
						key: "Content-Security-Policy",
						// https://csp-evaluator.withgoogle.com/
						value:
							"default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' https: data:; object-src 'none'"
					}
				]
			}
		];
	}
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
