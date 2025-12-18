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
    const baseUrl = 'https://doctors.mediman.life';

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

  // BreadcrumbList structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://doctors.mediman.life/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'All Doctors',
        item: 'https://doctors.mediman.life/doctors'
      }
    ]
  };

  // Schema.org structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MediMan Doctors Directory',
    description: 'Find and book appointments with top doctors in Sri Lanka.',
    url: `https://doctors.mediman.life/doctors`,
    numberOfItems: totalDoctors,
    itemListElement: doctors.map((doctor, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Physician',
        name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
        url: `https://doctors.mediman.life/${doctor._id}`,
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
          <div className={styles.heroSection}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>Your Doctor Is Just a Click Away</h1>
              <p className={styles.description}>
                Explore verified specialists available for online and in-clinic consultations across Sri Lanka.<br />
                Choose from multiple specialties, transparent fees, and trusted professionals — all in one secure platform.
              </p>

              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <span className={styles.icon}>✔</span> Verified professionals
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.icon}>✔</span> Secure consultations
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.icon}>✔</span> Nationwide access
                </div>
              </div>

              <p className={styles.ctaText}>
                👉 Your care starts with the right doctor. 💙<br />
                Because timely care makes all the difference.
              </p>
            </div>
          </div>

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer />
    </div>
  );
}
