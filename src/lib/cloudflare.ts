/* eslint-disable max-classes-per-file */
import _ from "lodash";
import ms from "ms";

export interface CloudflareKVOptions {
    accountId: string,
    namespaceId: string
    apiToken: string
}

export type MethodResponse = {
    success: boolean,
    errors: unknown[],
    messages: unknown[]
};

export class CloudflareKVResponseError extends Error {
	public code: number;

	constructor (private response: Response) {
		super(response.statusText);
		this.code = response.status;

		console.log(response);
		this.json().then(console.log);
	}

	public async json (): Promise<any> {
		return this.response.json();
	}

	public async text (): Promise<string> {
		return this.response.text();
	}
}

export type MethodOptions = {
    namespaceId?: string
};

export type ListMethodOptions = MethodOptions & {
    /**
     * The number of keys to return. The cursor attribute may be used to iterate over the
     * next batch of keys if there are more than the limit.
     */
    limit?: number,
    /**
     * Opaque token indicating the position from which to continue when requesting the next set of records if the
     * amount of list results was limited by the limit parameter. A valid value for the cursor can be obtained from
     * the cursors object in the result_info structure.
     */
    cursor?: string,
    /**
     * A string prefix used to filter down which keys will be returned.
     * Exact matches and any key names that begin with the prefix will be returned.
     */
    prefix?: string
};

export type ListMethodResponseResult = {
    name: string,
    expiration?: number,
    metadata?: Record<string, unknown>
};

export type ListMethodResponse = MethodResponse & {
    result: ListMethodResponseResult[],
    result_info: {
        count: number,
        cursor: string
    }
};

export type GetMethodResponse = string;

export type SetMethodOptions = MethodOptions & {
    expiration_ttl?: number | string,
    expiration?: number
};

export class CloudflareKV {
	private options: CloudflareKVOptions;

	constructor (options: CloudflareKVOptions) {
		this.options = options;
	}

	private async request (path: string, options: RequestInit & { text?: boolean } = {}) {
		const url = `https://api.cloudflare.com/client/v4/accounts/${this.options.accountId}/storage/kv/${path}`;
		console.log(url);

		return fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${this.options.apiToken}`,
				"Content-Type": "application/json"
			}
		}).then((response) => {
			if (response.status < 200 || response.status > 499) throw new CloudflareKVResponseError(response);
			return options.text ? response.text() : response.json();
		});
	}

	/**
     * Lists a namespace's keys.
     *
     * @access com.cloudflare.edge.storage.kv.key.list
     * @see https://api.cloudflare.com/#workers-kv-namespace-list-a-namespace-s-keys
     */
	public list (options?: ListMethodOptions): Promise<ListMethodResponse> {
		options = { namespaceId: this.options.namespaceId, ...options };
		const query = new URLSearchParams(_.omit<any>(options, ["namespaceId"])).toString();

		return this.request(`namespaces/${options.namespaceId}/keys?${query}`);
	}

	/**
     * Returns the value associated with the given key in the given namespace.
     *
     * If the KV-pair is set to expire at some point, the expiration time as measured in seconds
     * since the UNIX epoch will be returned in the "Expiration" response header.
     *
     * @access com.cloudflare.edge.storage.kv.key.read
     * @see https://api.cloudflare.com/#workers-kv-namespace-read-key-value-pair
     */
	public get (key: string, options?: MethodOptions): Promise<GetMethodResponse> {
		options = { namespaceId: this.options.namespaceId, ...options };
		const query = new URLSearchParams(_.omit<any>(options, ["namespaceId"])).toString();

		return this.request(`namespaces/${options.namespaceId}/values/${encodeURIComponent(key)}?${query}`, { text: true });
	}

	/**
     * Write a value identified by a key.
     *
     * Body should be the value to be stored along with json metadata to be associated with the key/value pair.
     * Existing values, expirations and metadata will be overwritten. If neither expiration nor expiration_ttl is specified,
     * the key-value pair will never expire. If both are set, expiration_ttl is used and expiration is ignored.
     *
     * @access com.cloudflare.edge.storage.kv.key.update
     * @see https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair
     */
	public set (key: string, value: string, options?: SetMethodOptions): Promise<MethodResponse> {
		options = { namespaceId: this.options.namespaceId, ...options };
		if (options.expiration_ttl && typeof options.expiration_ttl === "string") {
			options.expiration_ttl = this.ms(options.expiration_ttl);
		}

		const query = new URLSearchParams(_.omit<any>(options, ["namespaceId"])).toString();
		return this.request(`namespaces/${options.namespaceId}/values/${encodeURIComponent(key)}?${query}`, {
			method: "PUT",
			body: value,
			headers: {
				"Content-Type": "text/plain"
			}
		});
	}

	/**
     * Remove a KV pair from the Namespace.
     *
     * @access com.cloudflare.edge.storage.kv.key.delete
     * @see https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair
     */
	public delete (key: string, options?: MethodOptions): Promise<MethodResponse>;

	/**
     * Remove multiple KV pairs from the Namespace.
     *
     * @param keys an array of key names, **at most 10,000 entries**.
     *
     * @access com.cloudflare.edge.storage.kv.key.delete
     * @see https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair
     */
	public delete (keys: string[], options?: MethodOptions): Promise<MethodResponse>;

	public delete (arg0: string | string[], options?: MethodOptions): Promise<MethodResponse> {
		options = { namespaceId: this.options.namespaceId, ...options };
		const query = new URLSearchParams(_.omit<any>(options, ["namespaceId"])).toString();
		const keys = Array.isArray(arg0) ? arg0 : [arg0];

		return this.request(`namespaces/${options.namespaceId}/bulk?${query}`, {
			method: "DELETE",
			body: JSON.stringify(keys),
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	public ms (value: string): number {
		return ms(value);
	}
}

export const kv = new CloudflareKV({
	accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
	namespaceId: process.env.CLOUDFLARE_NAMESPACE_ID!,
	apiToken: process.env.CLOUDFLARE_TOKEN!
});
