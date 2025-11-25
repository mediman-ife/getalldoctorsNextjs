import { DoctorsResponse, Doctor } from '@/types/doctor';

// API Configuration from Postman screenshots
const API_BASE_URL = 'https://prodapi.mediman.life';
const API_KEY = process.env.NEXT_PUBLIC_MEDIMAN_API_KEY;

// Validate API key is configured
if (!API_KEY) {
    throw new Error('NEXT_PUBLIC_MEDIMAN_API_KEY environment variable is required');
}

// Cache configuration
const CACHE_TAGS = {
  DOCTORS_LIST: 'doctors-list',
  DOCTORS_DETAIL: 'doctors-detail',
};

export const fetchDoctors = async (pageNumber: number = 1, limit: number = 100, options?: RequestInit): Promise<DoctorsResponse> => {
    const res = await fetch(`${API_BASE_URL}/publicRoutes/getAllDoctors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'key': API_KEY,
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({ pageNumber, limit }),
        next: { 
            tags: [CACHE_TAGS.DOCTORS_LIST],
            revalidate: 600 // 10 minutes
        },
        ...options,
    });
    
    if (!res.ok) {
        throw new Error(`fetchDoctors failed with status: ${res.status}`);
    }
    
    return res.json();
};

export const getDoctorProfileInfo = async (id: string, options?: RequestInit): Promise<{ success: boolean; message: string; data: { doctor: Doctor } }> => {
    const res = await fetch(`${API_BASE_URL}/publicRoutes/getDoctorProfileInfo/${id}`, {
        method: 'GET',
        headers: { 
            'key': API_KEY,
            'Cache-Control': 'no-cache',
        },
        next: { 
            tags: [CACHE_TAGS.DOCTORS_DETAIL],
            revalidate: 300 // 5 minutes
        },
        ...options,
    });
    
    if (!res.ok) {
        throw new Error(`getDoctorProfileInfo failed with status: ${res.status}`);
    }
    
    return res.json();
};

export const getAllDoctorsForStaticParams = async (): Promise<Doctor[]> => {
    const allDoctors: Doctor[] = [];
    let page = 1;
    const limit = 100;
    let hasMore = true;

    try {
        while (hasMore) {
            const response = await fetchDoctors(page, limit);
            if (response.success && response.data.length > 0) {
                allDoctors.push(...response.data);
                if (allDoctors.length >= (response.pagination?.totalAvailable || 0)) {
                    hasMore = false;
                } else {
                    page++;
                }
            } else {
                hasMore = false;
            }
        }
    } catch (error) {
        console.error('Error fetching all doctors for static params:', error);
    }

    return allDoctors;
};

export { CACHE_TAGS };
