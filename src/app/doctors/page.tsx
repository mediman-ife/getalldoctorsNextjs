import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header/Header';
import DoctorsList from '@/components/DoctorsList/DoctorsList';
import { fetchDoctors } from '@/services/api';
import styles from './page.module.css';


async function getDoctorsData() {
  try {
    // Fetch Page 1 at build time
    const response = await fetchDoctors(1, 10);
    return response;
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const response = await getDoctorsData();
  const totalCount = response?.pagination?.totalAvailable || 0;

  return {
    title: `Find Top Doctors | MediMan - ${totalCount > 0 ? totalCount + ' ' : ''}Healthcare Professionals`,
    description: `Browse and connect with ${totalCount > 0 ? totalCount : 'hundreds of'} verified doctors in Sri Lanka. Online and clinic consultations available.`,
  };
}

export default async function DoctorsPage() {
  const response = await getDoctorsData();
  const initialDoctors = response?.success ? response.data : [];
  const initialTotal = response?.pagination?.totalAvailable || 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MediMan Doctors',
    description: 'Find and book appointments with top doctors in Sri Lanka.',
    url: 'https://mediman.life/doctors',
    hasPart: initialDoctors.map(doctor => ({
      '@type': 'Physician',
      name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
      url: `https://mediman.life/doctors/${doctor._id}`
    }))
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Find Your Doctor</h2>
        <DoctorsList initialDoctors={initialDoctors} initialTotal={initialTotal} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
