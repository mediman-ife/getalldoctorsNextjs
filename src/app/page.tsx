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
      title: 'MediMan | Healthcare. Anytime. Anywhere. | Book Doctor Appointments Online',
      description: 'Find your favourite doctors, get e-prescriptions, manage appointments and followups, and keep your medical records securely in one app. Download MediMan App Now!',
      keywords: ['MediMan', 'Doctor Booking Sri Lanka', 'Sri Lanka Doctors', 'Online Doctor Consultation Sri Lanka', 'E-Channeling Sri Lanka', 'Telehealth', 'Family Care', 'Medical Records', 'Video Consultation', 'Clinic Consultation', 'Book Doctor Appointment', 'Find Doctors Sri Lanka', 'Healthcare App'],
      alternates: { canonical: `${baseUrl}/` },
      openGraph: {
        title: 'MediMan | Healthcare. Anytime. Anywhere.',
        description: 'Find your favourite doctors, get e-prescriptions, manage appointments and followups, and keep your medical records securely in one app.',
        url: `${baseUrl}/`,
        type: 'website',
        siteName: 'MediMan',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'MediMan | Healthcare. Anytime. Anywhere.',
        description: 'Find your favourite doctors, get e-prescriptions, manage appointments and followups, and keep your medical records securely in one app.',
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
    console.error('Error generating metadata for home page:', error);
    return {
      title: 'MediMan | Healthcare. Anytime. Anywhere.',
      description: 'Find and book appointments with top doctors in Sri Lanka. Online and clinic consultations available.',
    };
  }
}

// Server component for home page
export default async function Home() {
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
  // const currentPage = response?.pagination?.currentPage || 1;
  // const totalPages = Math.ceil(totalDoctors / 100);

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
      }
    ]
  };

  // Schema.org structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MediMan Doctors Directory',
    description: 'Find and book appointments with top doctors in Sri Lanka.',
    url: `https://doctors.mediman.life/`,
    numberOfItems: totalDoctors,
    itemListElement: doctors.map((doctor: any, index: number) => ({
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'MediMan',
              url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://doctors.mediman.life'}/`,
              logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://doctors.mediman.life'}/icon.png`,
              sameAs: [
                'https://www.facebook.com/medimanlife/',
                'https://www.instagram.com/mediman_life/',
                'https://www.linkedin.com/company/105617168/',
                'https://www.youtube.com/@mediman'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                telephone: '+94-11-466-8668',
                email: 'support@mediman.life',
                availableLanguage: ['English', 'Sinhala', 'Tamil']
              }
            })
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
