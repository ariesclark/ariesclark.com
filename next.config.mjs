/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
		remotePatterns: [{ hostname: "pbs.twimg.com" }]
	},
	async rewrites() {
		return [
			{
				source: "/analytics/static/:path*",
				destination: "https://us-assets.i.posthog.com/static/:path*"
			},
			{
				source: "/analytics/:path*",
				destination: "https://us.i.posthog.com/:path*"
			}
		];
	}
};

export default nextConfig;
