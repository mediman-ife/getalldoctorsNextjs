import { Metadata } from 'next';
import { fetchDoctors } from '@/services/api';
import DoctorsList from '@/components/DoctorsList/DoctorsList';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

// ISR configuration - revalidate every 10 minutes
export const revalidate = 600;

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetchDoctors(1, 10);
    const totalCount = response?.pagination?.totalAvailable || 0;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mediman.life';
    
    return {
      title: `Find Top Doctors | MediMan - ${totalCount > 0 ? totalCount + ' ' : ''}Healthcare Professionals`,
      description: `Browse and connect with ${totalCount > 0 ? totalCount : 'hundreds of'} verified doctors in Sri Lanka. Online and clinic consultations available.`,
      alternates: { canonical: `${baseUrl}/doctors` },
      openGraph: {
        title: `Find Top Doctors | MediMan - ${totalCount > 0 ? totalCount + ' ' : ''}Healthcare Professionals`,
        description: `Browse and connect with ${totalCount > 0 ? totalCount : 'hundreds of'} verified doctors in Sri Lanka.`,
        url: `${baseUrl}/doctors`,
        type: 'website',
        siteName: 'MediMan',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Find Top Doctors | MediMan - ${totalCount > 0 ? totalCount + ' ' : ''}Healthcare Professionals`,
        description: `Browse and connect with ${totalCount > 0 ? totalCount : 'hundreds of'} verified doctors in Sri Lanka.`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata for doctors page:', error);
    return {
      title: 'Find Top Doctors | MediMan',
      description: 'Browse and connect with verified doctors in Sri Lanka. Online and clinic consultations available.',
    };
  }
}

// Server component for doctors page
export default async function DoctorsPage() {
  let response;
  let error = null;
  
  try {
    response = await fetchDoctors(1, 100);
  } catch (err) {
    console.error('Failed to fetch doctors:', err);
    error = 'Failed to load doctors. Please try again later.';
    response = null;
  }

  const doctors = response?.success ? response.data : [];
  const totalDoctors = response?.pagination?.totalAvailable || 0;
  const currentPage = response?.pagination?.currentPage || 1;
  const totalPages = Math.ceil(totalDoctors / 100);

  // Schema.org structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MediMan Doctors Directory',
    description: 'Find and book appointments with top doctors in Sri Lanka.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mediman.life'}/doctors`,
    numberOfItems: totalDoctors,
    itemListElement: doctors.map((doctor, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Physician',
        name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mediman.life'}/doctors/${doctor._id}`,
        medicalSpecialty: doctor.service || [],
        address: {
          '@type': 'PostalAddress',
          addressCountry: doctor.country,
        },
        image: doctor.profileImage?.signedUrl,
      }
    })),
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Find Your Doctor</h1>
            <p className={styles.subtitle}>
              {totalDoctors > 0 ? `${totalDoctors} verified doctors` : 'Verified doctors'} available for online and clinic consultations
            </p>
          </header>

          {error ? (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          ) : (
            <DoctorsList 
              initialDoctors={doctors} 
              initialTotal={totalDoctors}
            />
          )}
        </div>

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer />
    </div>
  );
}
