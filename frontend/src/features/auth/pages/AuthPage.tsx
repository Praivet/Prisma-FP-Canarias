import { useState } from 'react'

import Button from '../../../components/ui/Button'
import { getSession } from '../../../services/session'
import { skillService } from '../../students/services/skillService'
import { authService } from '../services/authService'

interface Result {
    ok: boolean
    text: string
}

const buttonClass = 'rounded px-4 py-2 disabled:opacity-50'

// Never show the whole token on screen, only how it starts.
function toJson(data: unknown) {
    return JSON.stringify(
        data,
        (key, value) =>
            key === 'token' && typeof value === 'string' ? `${value.slice(0, 20)}...` : value,
        2
    )
}

// Test panel: shows that Basic Auth (login) and Bearer Auth (the rest) work.
function AuthPage() {
    const [email, setEmail] = useState('coordinator@prismafp.test')
    const [password, setPassword] = useState('Password123!')
    const [session, setSession] = useState(getSession())
    const [result, setResult] = useState<Result | null>(null)
    const [loading, setLoading] = useState(false)

    async function run(action: () => unknown) {
        setLoading(true)
        try {
            const data = await action()
            setResult({ ok: true, text: toJson(data) })
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            setResult({ ok: false, text: toJson({ error: message }) })
        } finally {
            // apiFetch also closes the session when the token is no longer valid.
            setSession(getSession())
            setLoading(false)
        }
    }

    function logout() {
        authService.logout()
        return { message: 'Sesión cerrada' }
    }

    return (
        <section className="mx-auto max-w-6xl p-6">
            <h2 className="mb-4 text-2xl font-bold">Prueba de autenticación</h2>

            <form
                className="flex flex-wrap items-end gap-3"
                onSubmit={(event) => {
                    event.preventDefault()
                    void run(() => authService.login({ email, password }))
                }}
            >
                <label className="flex flex-col text-sm">
                    Email
                    <input
                        type="email"
                        required
                        autoComplete="username"
                        className="rounded border p-2"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label className="flex flex-col text-sm">
                    Contraseña
                    <input
                        type="password"
                        required
                        autoComplete="current-password"
                        className="rounded border p-2"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <Button type="submit" className={buttonClass} disabled={loading}>
                    Iniciar sesión
                </Button>
            </form>

            <div className="mt-3 flex flex-wrap gap-3">
                <Button
                    variant="secondary"
                    className={buttonClass}
                    disabled={loading}
                    onClick={() => void run(() => authService.me())}
                >
                    Ver mis datos
                </Button>
                <Button
                    variant="secondary"
                    className={buttonClass}
                    disabled={loading}
                    onClick={() => void run(() => skillService.getAll())}
                >
                    Probar ruta protegida
                </Button>
                <Button
                    variant="danger"
                    className={buttonClass}
                    disabled={loading}
                    onClick={() => void run(logout)}
                >
                    Cerrar sesión
                </Button>
            </div>

            <div className="mt-4 rounded border p-4">
                {session ? (
                    <p>
                        <strong>Sesión iniciada:</strong> {session.email} · Roles:{' '}
                        {session.roles.join(', ') || 'ninguno'} · Caduca a las{' '}
                        {new Date(session.expiresAt).toLocaleTimeString()}
                    </p>
                ) : (
                    <p>
                        <strong>Sin sesión</strong>
                    </p>
                )}

                {result && (
                    <pre
                        role="status"
                        className={`mt-3 max-h-80 overflow-auto rounded border p-3 text-sm ${
                            result.ok
                                ? 'border-green-600 bg-green-50 text-green-800'
                                : 'border-red-600 bg-red-50 text-red-800'
                        }`}
                    >
                        {result.text}
                    </pre>
                )}
            </div>
        </section>
    )
}

export default AuthPage
