import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { fetchDoctors } from '@/services/api';
import { Doctor, Pagination } from '@/types/doctor';
import DoctorCard from '@/components/DoctorCard/DoctorCard';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Top Doctors | MediMan',
  description: 'Find and book appointments with top doctors in Sri Lanka. Online and clinic consultations available.',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DoctorsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams?.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const limit = 100; // As per request example

  let doctors: Doctor[] = [];
  let pagination: Pagination | null = null;
  let error: string | null = null;

  try {
    const response = await fetchDoctors(page, limit);
    if (response.success) {
      doctors = response.data;
      pagination = response.pagination;
    } else {
      error = response.message || 'Failed to fetch doctors';
    }
  } catch (err) {
    error = 'An error occurred while fetching doctors.';
    console.error(err);
  }

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Find Your Doctor</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className={styles.grid}>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>

        {pagination && (
          <div className={styles.pagination}>
            <Link
              href={`/?page=${page - 1}`}
              className={styles.pageButton}
              style={{ pointerEvents: page <= 1 ? 'none' : 'auto', opacity: page <= 1 ? 0.5 : 1 }}
            >
              Previous
            </Link>

            <span className={`${styles.pageButton} ${styles.activePage}`}>
              {page}
            </span>

            <Link
              href={`/?page=${page + 1}`}
              className={styles.pageButton}
              style={{
                pointerEvents: doctors.length < limit ? 'none' : 'auto',
                opacity: doctors.length < limit ? 0.5 : 1
              }}
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
