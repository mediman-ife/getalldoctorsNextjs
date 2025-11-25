import { DoctorsResponse, Doctor } from '@/types/doctor';

const API_BASE_URL = 'https://prodapi.mediman.life';
const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_MEDIMAN_API_KEY || process.env.MEDIMAN_PUBLIC_API_KEY || 'jmziDgOf+BmlBA8CJMkBT1hWAQltr1vh';

export const fetchDoctors = async (pageNumber: number = 1, limit: number = 100, options?: RequestInit): Promise<DoctorsResponse> => {
    const res = await fetch(`${API_BASE_URL}/publicRoutes/getAllDoctors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            key: PUBLIC_API_KEY,
        },
        body: JSON.stringify({ pageNumber, limit }),
        ...options,
    })
    if (!res.ok) throw new Error(`fetchDoctors ${res.status}`)
    return res.json()
}

export const getDoctorProfileInfo = async (id: string, options?: RequestInit): Promise<{ success: boolean; message: string; data: { doctor: Doctor } }> => {
    const res = await fetch(`${API_BASE_URL}/publicRoutes/getDoctorProfileInfo/${id}`, {
        headers: { key: PUBLIC_API_KEY },
        ...options,
    })
    if (!res.ok) throw new Error(`getDoctorProfileInfo ${res.status}`)
    return res.json()
}
