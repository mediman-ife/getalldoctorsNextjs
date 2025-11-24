export interface ProfileImage {
    _id: string;
    fileKey: string;
    signedUrl: string;
    id: string;
}

export interface ChargeDetails {
    currency: string;
    amount: number;
}

export interface Charges {
    onlineCharge: ChargeDetails;
    clinicCharge: ChargeDetails;
    onlineSlotDuration: number;
    clinicSlotDuration?: number;
}

export interface Doctor {
    _id: string;
    firstName: string;
    lastName: string;
    country: string;
    consultationType: string[];
    charges: Charges;
    designation: string;
    profileImage?: ProfileImage;
    about?: string;
    experience?: number;
    languages?: string[];
    service?: string[];
    gender?: string;
}

export interface Pagination {
    currentPage: number;
    pageSize: number;
    totalFetched: number;
    totalAvailable: number;
}

export interface DoctorsResponse {
    success: boolean;
    message: string;
    data: Doctor[];
    pagination: Pagination;
}
