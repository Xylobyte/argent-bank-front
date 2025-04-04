export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const ROOT_URL = 'http://localhost:3001/api/v1'

export class HttpError {
	status: number
	message: string

	constructor(status: number, message: string) {
		this.status = status
		this.message = message
	}
}

const createHeaders = (
	contentType: string = 'application/json',
	h?: object,
): Headers => {
	const headers = new Headers()
	headers.set('accept', 'application/json')
	if (contentType) headers.set('Content-Type', contentType)
	if (h) {
		Object.keys(h).forEach(key => {
			headers.set(key, `${h[key]}`)
		})
	}
	return headers
}

const createRequestInit = (
	method: string,
	body?: object,
	headers?: object,
): RequestInit => ({
	method,
	headers: createHeaders(body ? 'application/json' : undefined, headers),
	mode: 'cors',
	cache: 'no-store',
	...(body && { body: JSON.stringify(body) }),
})

const handleResponse = async (response: Response): Promise<unknown> => {
	if (response.ok) return response.status === 204 ? true : response.json()
	throw new HttpError(response.status, await response.text())
}

export const apiRequest = async (
	endpoint: string,
	method: ApiMethod,
	body?: object,
	headers?: object,
): Promise<any> => {
	const request = new Request(
		`${ROOT_URL}${endpoint}`,
		createRequestInit(method, body, headers),
	)
	const response = await fetch(request)
	return handleResponse(response)
}
