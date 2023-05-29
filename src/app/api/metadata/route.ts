import { getMetadata } from "~/metadata";

export const runtime = "edge";
export const revalidate = 1;

export async function GET() {
	return new Response(JSON.stringify(await getMetadata()), {
		status: 200,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "public, s-maxage=1, stale-while-revalidate=4"
		}
	});
}
