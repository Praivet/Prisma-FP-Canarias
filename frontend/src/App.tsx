import AuthPage from './features/auth/pages/AuthPage'
import StudentsPage from './features/students/pages/StudentsPage'

function App() {
    return (
        <>
            {/* Auth test panel, only while developing (it has the seed user filled in). */}
            {import.meta.env.DEV && <AuthPage />}
            <StudentsPage />
        </>
    )
}

export default App
