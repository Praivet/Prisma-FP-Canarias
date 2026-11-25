// Only in development (npm run dev): exposes the services in the browser console
// as window.prisma, to try the login and the Bearer token by hand.
import { authService } from './features/auth/services/authService'
import { skillService } from './features/students/services/skillService'
import { studentService } from './features/students/services/studentService'
import { getSession } from './services/session'

declare global {
    interface Window {
        prisma: {
            authService: typeof authService
            skillService: typeof skillService
            studentService: typeof studentService
            getSession: typeof getSession
        }
    }
}

window.prisma = { authService, skillService, studentService, getSession }
console.info('[prisma] window.prisma ready: try await prisma.authService.login({ email, password })')
