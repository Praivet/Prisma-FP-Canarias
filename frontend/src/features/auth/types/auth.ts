export interface AuthCredentials {
    email: string
    password: string
}

export interface RegisterData extends AuthCredentials {
    firstName: string
    lastName: string
}

export interface AuthUser {
    id: number
    email: string
    firstName: string
    lastName: string
    roles: string[]
}

// What POST /api/auth/login and /api/auth/register return.
export interface AuthResponse {
    message: string
    token: string
    tokenType: 'Bearer'
    expiresIn: number // seconds
    user: AuthUser
}
