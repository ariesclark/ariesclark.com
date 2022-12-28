import { CloudflareKV } from "cloudflare-kv-storage";

export const cloudflareEmail = process.env["CLOUDFLARE_EMAIL"] as string;
export const cloudflareAccountId = process.env["CLOUDFLARE_ACCOUNT_ID"] as string;
export const cloudflareAccessToken = process.env["CLOUDFLARE_ACCESS_TOKEN"] as string;
export const cloudflareNamespaceId = process.env["CLOUDFLARE_KV_NAMESPACE"] as string;

export const kv = new CloudflareKV({
	accountId: cloudflareAccountId,
	namespaceId: cloudflareNamespaceId,
	apiToken: cloudflareAccessToken
});

export async function getHeartClickCount() {
	return await kv.get("heartClickCount").then(Number.parseInt);
}
