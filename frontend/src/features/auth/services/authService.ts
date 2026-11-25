import { apiFetch } from '../../../services/api'
import { clearSession, saveSession } from '../../../services/session'
import type { AuthCredentials, AuthResponse, RegisterData } from '../types/auth'

// Basic Auth: "email:password" encoded in Base64.
// TextEncoder + btoa so that accents or "ñ" in the password don't break btoa.
function basicHeader({ email, password }: AuthCredentials) {
    const bytes = new TextEncoder().encode(`${email.trim()}:${password}`)
    return `Basic ${btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''))}`
}

function keepSession(result: AuthResponse) {
    if (!result.token || !Number.isFinite(result.expiresIn) || result.expiresIn <= 0) {
        throw new Error('The server did not return a valid session.')
    }
    saveSession({
        token: result.token,
        email: result.user.email,
        roles: result.user.roles,
        expiresAt: Date.now() + result.expiresIn * 1000,
    })
    return result
}

export const authService = {
    async login(credentials: AuthCredentials) {
        const result = await apiFetch<AuthResponse>('/auth/login', {
            method: 'POST',
            headers: { Authorization: basicHeader(credentials) },
        })
        return keepSession(result)
    },
    async register({ firstName, lastName, ...credentials }: RegisterData) {
        const result = await apiFetch<AuthResponse>('/auth/register', {
            method: 'POST',
            headers: { Authorization: basicHeader(credentials) },
            body: JSON.stringify({ firstName, lastName }),
        })
        return keepSession(result)
    },
    // Who am I according to my token (GET /api/auth/me, uses the Bearer token).
    me() {
        return apiFetch<{ id: number; email: string; roles: string[] }>('/auth/me')
    },
    logout() {
        clearSession()
    },
}
