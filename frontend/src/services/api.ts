import { clearSession, getSession } from './session'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// "Vitamin" fetch: every call to the API goes through here, so this is the place
// that adds the Bearer token of the session to the Authorization header.
export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = new Headers(options.headers)
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

    // Login and register send their own "Authorization: Basic ...", so we don't overwrite it.
    const session = getSession()
    const withToken = !headers.has('Authorization') && !!session
    if (withToken) headers.set('Authorization', `Bearer ${session.token}`)

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers })

    if (!response.ok) {
        // 401 with our token = the token is no longer valid (expired or user removed): log out.
        if (response.status === 401 && withToken) clearSession()
        const body = await response.json().catch(() => null)
        const message = typeof body?.message === 'string' ? body.message : null
        throw new Error(message || `HTTP error: ${response.status}`)
    }

    const text = await response.text()

    if (!text) {
        return undefined as T
    }
    return JSON.parse(text) as T
}
