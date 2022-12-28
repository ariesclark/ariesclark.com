export const pulsoidAccessToken = process.env["PULSOID_ACCESS_TOKEN"] as string;

export async function getHeartrate(): Promise<number> {
	return fetch(
		"https://dev.pulsoid.net/api/v1/data/heart_rate/latest?response_mode=text_plain_only_heart_rate",
		{
			headers: {
				Authorization: `Bearer ${pulsoidAccessToken}`
			}
		}
	).then(async (response) => {
		if (!response.ok) return 0;
		return Number.parseInt(await response.text());
	});
}
