import axios from 'axios';
import { DoctorsResponse, Doctor } from '@/types/doctor';

const API_BASE_URL = 'https://prodapi.mediman.life';

export const fetchDoctors = async (pageNumber: number = 1, limit: number = 100): Promise<DoctorsResponse> => {
    try {
        const response = await axios.post<DoctorsResponse>(`${API_BASE_URL}/publicRoutes/getAllDoctors`, {
            pageNumber,
            limit,
        }, {
            headers: {
                'key': 'jmziDgOf+BmlBA8CJMkBT1hWAQltr1vh'
            }
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
            headers: {
                'key': 'jmziDgOf+BmlBA8CJMkBT1hWAQltr1vh'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching doctor profile:', error);
        throw error;
    }
};
