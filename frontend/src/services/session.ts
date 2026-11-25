// Keeps the Bearer token of the logged-in user in SessionStorage.
// SessionStorage lives only while the tab is open: closing the browser logs you out.
const KEY = 'prisma-fp-session'
export const SESSION_EVENT = 'prisma-fp-session-change'

export interface Session {
    token: string
    email: string
    roles: string[]
    expiresAt: number // ms since 1970, when the token stops being valid
}

export function getSession(): Session | null {
    try {
        const session = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as Session | null
        // An expired token is useless: behave as if there were no session.
        if (session && session.expiresAt > Date.now()) return session
    } catch { /* Ignore invalid or unavailable browser storage. */ }
    return null
}

export function saveSession(session: Session) {
    sessionStorage.setItem(KEY, JSON.stringify(session))
    window.dispatchEvent(new Event(SESSION_EVENT))
}

export function clearSession() {
    sessionStorage.removeItem(KEY)
    window.dispatchEvent(new Event(SESSION_EVENT))
}
