export interface Company {
    id: number
    taxId: string
    name: string
    sector: string | null
    city: string | null
    contactEmail: string | null
    contactPhone: string | null
    createdAt?: string
    updatedAt?: string
}

export interface CompanyPayload {
    taxId: string
    name: string
    sector?: string | null
    city?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    image?: File | null
}
