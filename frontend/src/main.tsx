import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from './App.tsx'

import './styles/global.css';

// Browser-console helpers (window.prisma), only while developing.
if (import.meta.env.DEV) void import('./devConsole')

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)