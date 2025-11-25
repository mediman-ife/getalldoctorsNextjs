'use client';

import React, { useEffect, useState } from 'react';
import { fetchDoctors } from '@/services/api';
import { Doctor } from '@/types/doctor';
import DoctorCard from '@/components/DoctorCard/DoctorCard';
import styles from './DoctorsList.module.css';

const ITEMS_PER_PAGE = 10;

interface DoctorsListProps {
    initialDoctors?: Doctor[];
    initialTotal?: number;
}

export default function DoctorsList({ initialDoctors = [], initialTotal = 0 }: DoctorsListProps) {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalAvailable, setTotalAvailable] = useState(initialTotal);

    // Initialize with initial data only once
    useEffect(() => {
        if (initialDoctors.length > 0 && page === 1) {
            console.log('Initializing with initial data for page 1');
            setDoctors(initialDoctors);
        }
    }, []); // Only run once on mount

    useEffect(() => {
        console.log('Page changed to:', page, 'Initial doctors:', initialDoctors.length, 'Current doctors:', doctors.length);
        
        const loadDoctors = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching doctors for page:', page, 'limit:', ITEMS_PER_PAGE);
                const response = await fetchDoctors(page, ITEMS_PER_PAGE);
                console.log('API Response for page', page, ':', response);

                if (response.success) {
                    console.log('Setting doctors:', response.data.length, 'doctors');
                    setDoctors(response.data);
                    // Update total available if provided, otherwise estimate based on current batch
                    if (response.pagination?.totalAvailable) {
                        console.log('Total available:', response.pagination.totalAvailable);
                        setTotalAvailable(response.pagination.totalAvailable);
                    }
                } else {
                    setError(response.message || 'Failed to fetch doctors');
                }
            } catch (err) {
                setError('An error occurred while fetching doctors. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadDoctors();

        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    const totalPages = Math.ceil(totalAvailable / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        console.log('Previous clicked - current page:', page, 'totalPages:', totalPages);
        console.log('Is page > 1?', page > 1);
        if (page > 1) {
            const newPage = page - 1;
            console.log('Setting page to:', newPage);
            setPage(newPage);
        } else {
            console.log('Previous button should be disabled!');
        }
    };

    const handleNextPage = () => {
        console.log('Next clicked - current page:', page, 'totalPages:', totalPages);
        if (page < totalPages) {
            const newPage = page + 1;
            console.log('Setting page to:', newPage);
            setPage(newPage);
        }
    };

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className={styles.pageButton}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    console.log('Rendering DoctorsList - Current page:', page, 'Total pages:', totalPages, 'Doctors count:', doctors.length);
    
    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loading}>Loading doctors...</div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {doctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                    </div>

                    {doctors.length > 0 && (
                        <div className={styles.pagination} key={`pagination-${page}`}>
                            <button
                                className={styles.pageButton}
                                onClick={handlePrevPage}
                                disabled={page === 1}
                                style={{ opacity: page === 1 ? 0.5 : 1 }}
                                type="button"
                            >
                                Previous
                            </button>

                            <span className={styles.pageInfo}>
                                Page {page} {totalPages > 0 && `of ${totalPages}`}
                            </span>

                            <button
                                className={styles.pageButton}
                                onClick={handleNextPage}
                                disabled={page >= totalPages || totalPages === 0}
                                style={{ opacity: (page >= totalPages || totalPages === 0) ? 0.5 : 1 }}
                                type="button"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {doctors.length === 0 && !loading && (
                        <div className={styles.loading}>No doctors found.</div>
                    )}
                </>
            )}
        </div>
    );
}
