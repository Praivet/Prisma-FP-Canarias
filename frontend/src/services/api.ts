const API_URL = import.meta.env.VITE_API_URL

export function companyImageUrl(filename: string): string {
    return `${API_URL.replace(/\/api\/?$/, "")}/images/${encodeURIComponent(filename)}`
}

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    // With FormData the browser must set the multipart Content-Type (with its boundary) itself
    const isFormData = options.body instanceof FormData
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...options.headers,
        },
    })

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    const text = await response.text()
    
    if (!text) {
        return undefined as T
    }
    return JSON.parse(text) as T
}