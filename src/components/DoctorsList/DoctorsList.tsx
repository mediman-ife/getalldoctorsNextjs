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
    const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
    const [loading, setLoading] = useState(initialDoctors.length === 0);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalAvailable, setTotalAvailable] = useState(initialTotal);

    useEffect(() => {
        // Skip initial fetch if we have initial data and we are on page 1
        if (page === 1 && initialDoctors.length > 0 && doctors.length > 0) {
            return;
        }

        const loadDoctors = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchDoctors(page, ITEMS_PER_PAGE);

                if (response.success) {
                    setDoctors(response.data);
                    // Update total available if provided, otherwise estimate based on current batch
                    if (response.pagination?.totalAvailable) {
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
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(p => p + 1);
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
                        <div className={styles.pagination}>
                            <button
                                className={styles.pageButton}
                                onClick={handlePrevPage}
                                disabled={page === 1}
                            >
                                Previous
                            </button>

                            <span className={styles.pageInfo}>
                                Page {page} {totalPages > 0 && `of ${totalPages}`}
                            </span>

                            <button
                                className={styles.pageButton}
                                onClick={handleNextPage}
                                disabled={page >= totalPages && totalPages > 0}
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
