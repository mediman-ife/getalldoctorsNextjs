import React from 'react';
import { Metadata } from 'next';
import { fetchDoctors } from '@/services/api';
import { Doctor } from '@/types/doctor';
import DoctorCard from '@/components/DoctorCard/DoctorCard';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Top Doctors | MediMan',
  description: 'Find and book appointments with top doctors in Sri Lanka. Online and clinic consultations available.',
};

export const dynamic = 'force-dynamic'
export const revalidate = 600
export const runtime = 'edge'

export default async function DoctorsPage() {
  const doctors: Doctor[] = [];
  let error: string | null = null;

  try {
    // Fetch all doctors across all pages
    let page = 1;
    const limit = 100;
    let totalAvailable = Infinity;
    while ((page - 1) * limit < totalAvailable) {
      const response = await fetchDoctors(page, limit);
      if (response.success) {
        doctors.push(...response.data);
        totalAvailable = response.pagination?.totalAvailable ?? response.data.length;
        page++;
      } else {
        if (page === 1) error = response.message || 'Failed to fetch doctors';
        break;
      }
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
      </div>
    </div>
  );
}
