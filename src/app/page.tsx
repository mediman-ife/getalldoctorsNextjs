import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header/Header';
import DoctorsList from '@/components/DoctorsList/DoctorsList';
import { fetchDoctors } from '@/services/api';
import styles from './page.module.css';

export const revalidate = 600; // Revalidate every 10 minutes

async function getDoctorsData() {
  try {
    const response = await fetchDoctors(1, 10, { next: { tags: ['doctors-list'] } });
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
    '@type': 'MedicalBusiness',
    name: 'MediMan',
    description: 'Find and book appointments with top doctors in Sri Lanka.',
    url: 'https://mediman.life',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://mediman.life/doctors?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
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
