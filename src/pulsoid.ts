export const pulsoidAccessToken = process.env["PULSOID_ACCESS_TOKEN"] as string;

export interface Heartrate {
	measuredAt: number;
	value: number;
}

export async function getHeartrate(): Promise<Heartrate> {
	return fetch("https://dev.pulsoid.net/api/v1/data/heart_rate/latest", {
		headers: {
			Authorization: `Bearer ${pulsoidAccessToken}`
		}
	}).then(async (response) => {
		if (!response.ok) return { measuredAt: 0, value: 0 };
		const json = (await response.json()) as {
			measured_at: number;
			data: { heart_rate: number };
		};

		return {
			measuredAt: json.measured_at,
			value: json.data.heart_rate
		};
	});
}
