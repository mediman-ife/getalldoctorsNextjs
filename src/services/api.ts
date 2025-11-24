import axios from 'axios';
import { DoctorsResponse, Doctor } from '@/types/doctor';

const API_BASE_URL = 'https://prodapi.mediman.life';
const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_MEDIMAN_API_KEY || process.env.MEDIMAN_PUBLIC_API_KEY || 'jmziDgOf+BmlBA8CJMkBT1hWAQltr1vh';

export const fetchDoctors = async (pageNumber: number = 1, limit: number = 100): Promise<DoctorsResponse> => {
    try {
        const response = await axios.post<DoctorsResponse>(`${API_BASE_URL}/publicRoutes/getAllDoctors`, {
            pageNumber,
            limit,
        }, {
            headers: { key: PUBLIC_API_KEY },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error;
    }
};

export const getDoctorProfileInfo = async (id: string): Promise<{ success: boolean; message: string; data: { doctor: Doctor } }> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/publicRoutes/getDoctorProfileInfo/${id}`, {
            headers: { key: PUBLIC_API_KEY },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching doctor profile:', error);
        throw error;
    }
};
