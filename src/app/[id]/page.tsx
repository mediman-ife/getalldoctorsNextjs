import { Metadata } from 'next';
import { getDoctorProfileInfo, getAllDoctorsForStaticParams } from '@/services/api';
import { Video, MapPin, Globe, Languages, Stethoscope, Clock, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';
import ShareButtons from '@/components/ShareButtons/ShareButtons';

// ISR configuration - revalidate every 5 minutes
export const revalidate = 300;

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static parameters for all doctors
export async function generateStaticParams() {
  try {
    const allDoctors = await getAllDoctorsForStaticParams();
    return allDoctors.map((doctor) => ({
      id: doctor._id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = 'https://doctors.mediman.life';

  try {
    const response = await getDoctorProfileInfo(id);
    if (response.success) {
      const doctor = response.data.doctor;

      // Construct rich title and description
      const specialty = doctor.service?.length ? doctor.service[0] : doctor.designation;
      const title = `Dr. ${doctor.firstName} ${doctor.lastName} - ${specialty} in ${doctor.country} | MediMan`;

      const aboutSnippet = doctor.about
        ? doctor.about.substring(0, 155).replace(/\s+/g, ' ').trim() + (doctor.about.length > 155 ? '...' : '')
        : `Book an appointment with Dr. ${doctor.firstName} ${doctor.lastName}.`;

      const description = `Consult Dr. ${doctor.firstName} ${doctor.lastName}, a ${doctor.designation} specializing in ${doctor.service?.join(', ') || specialty} in ${doctor.country}. ${aboutSnippet}`;

      // Generate keywords
      const keywords = [
        `Dr. ${doctor.firstName} ${doctor.lastName}`,
        doctor.designation,
        ...(doctor.service || []),
        doctor.country,
        'MediMan',
        'Doctor Appointment',
        'Online Consultation',
        'Healthcare'
      ].filter(Boolean);

      return {
        title,
        description,
        keywords,
        alternates: { canonical: `${baseUrl}/${id}` },
        openGraph: {
          title,
          description,
          url: `${baseUrl}/${id}`,
          type: 'profile',
          siteName: 'MediMan',
          locale: 'en_US',
          images: [{
            url: (doctor.profileImage?.signedUrl || `${baseUrl}/icon.png`),
            alt: `Dr. ${doctor.firstName} ${doctor.lastName}`,
            width: 1200,
            height: 630,
          }],
          // @ts-ignore - Next.js types might not explicitly show these but they are valid for type: 'profile'
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          gender: doctor.gender,
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
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
    }
  } catch (error) {
    console.error('Error generating metadata for doctor profile:', error);
  }

  return {
    title: 'Doctor Profile | MediMan',
    description: 'View doctor profile and book appointments on MediMan.',
  };
}

// Server component for doctor profile page
export default async function DoctorProfilePage({ params }: PageProps) {
  const { id } = await params;
  let doctor = null;
  let error = null;

  try {
    const response = await getDoctorProfileInfo(id);
    if (response.success) {
      doctor = response.data.doctor;
    } else {
      error = response.message || 'Failed to load doctor profile';
    }
  } catch (err) {
    error = 'An error occurred while loading the profile.';
    console.error('Error loading doctor profile:', err);
  }

  if (error || !doctor) {
    notFound();
  }

  const {
    firstName, lastName, designation, profileImage,
    about, experience, country, languages, service,
    charges, consultationType, gender
  } = doctor;

  const baseUrl = 'https://doctors.mediman.life';

  // Schema.org structured data for medical professional
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: `Dr. ${firstName} ${lastName}`,
    description: `${designation}. ${about ? about.substring(0, 150) + '...' : ''}`,
    url: `${baseUrl}/${id}`,
    image: profileImage?.signedUrl,
    medicalSpecialty: service?.map(s => ({
      '@type': 'MedicalSpecialty',
      name: s
    })),
    address: {
      '@type': 'PostalAddress',
      addressCountry: country,
    },
    priceRange: charges.clinicCharge.amount ? `${charges.clinicCharge.currency} ${charges.clinicCharge.amount}` : '$$',
    offers: [
      ...(consultationType.includes('ONLINE') ? [{
        '@type': 'Offer',
        name: 'Online Consultation',
        price: charges.onlineCharge.amount,
        priceCurrency: charges.onlineCharge.currency,
        availability: 'https://schema.org/InStock',
        validThrough: '2025-12-31',
      }] : []),
      ...(consultationType.includes('CLINIC') ? [{
        '@type': 'Offer',
        name: 'Clinic Consultation',
        price: charges.clinicCharge.amount,
        priceCurrency: charges.clinicCharge.currency,
        availability: 'https://schema.org/InStock',
        validThrough: '2025-12-31',
      }] : []),
    ],
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.profileCard}>
            {/* Profile Header */}
            <div className={styles.header}>
              <div className={styles.imageWrapper}>
                <img
                  src={profileImage?.signedUrl || '/icon.png'}
                  alt={`Dr. ${firstName} ${lastName}${designation ? ' – ' + designation : ''}`}
                  className={styles.image}
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>
              <div className={styles.headerInfo}>
                <h1 className={styles.name}>Dr. {firstName} {lastName}</h1>
                <p className={styles.designation}>{designation}</p>
                <div className={styles.badges}>
                  {experience !== undefined && experience > 0 && (
                    <span className={styles.badge}>
                      <Clock size={14} /> {experience} Years Experience
                    </span>
                  )}
                  <span className={styles.badge}>
                    <Globe size={14} /> {country}
                  </span>
                  {gender && (
                    <span className={styles.badge}>
                      {gender === 'MALE' ? '👨' : gender === 'FEMALE' ? '👩' : '👤'} {gender}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.contentGrid}>
              {/* Left Column - Professional Info */}
              <div className={styles.leftColumn}>
                {about && (
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>About Dr. {firstName}</h3>
                    <p className={styles.aboutText}>{about}</p>
                  </section>
                )}

                {service && service.length > 0 && (
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                      <Stethoscope size={20} /> Services
                    </h3>
                    <ul className={styles.serviceList}>
                      {service.map((serviceItem: string, index: number) => (
                        <li key={index} className={styles.serviceItem}>{serviceItem}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {languages && languages.length > 0 && (
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                      <Languages size={20} /> Languages
                    </h3>
                    <div className={styles.tags}>
                      {languages.map((lang: string, index: number) => (
                        <span key={index} className={styles.tag}>{lang}</span>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column - Booking & Fees */}
              <div className={styles.rightColumn}>
                <div className={styles.bookingCard}>
                  <h3 className={styles.bookingTitle}>Consultation Fees</h3>

                  {consultationType.includes('ONLINE') && (
                    <div className={styles.feeRow}>
                      <div className={styles.feeType}>
                        <Video size={18} color="#0066cc" />
                        <div>
                          <span className={styles.feeLabel}>Online Consultation</span>
                          <span className={styles.feeDuration}>{charges.onlineSlotDuration} mins</span>
                        </div>
                      </div>
                      <span className={styles.feeAmount}>
                        {charges.onlineCharge.currency} {charges.onlineCharge.amount}
                      </span>
                    </div>
                  )}

                  {consultationType.includes('CLINIC') && (
                    <div className={styles.feeRow}>
                      <div className={styles.feeType}>
                        <MapPin size={18} color="#0066cc" />
                        <div>
                          <span className={styles.feeLabel}>Clinic Consultation</span>
                          <span className={styles.feeDuration}>{charges.clinicSlotDuration || 15} mins</span>
                        </div>
                      </div>
                      <span className={styles.feeAmount}>
                        {charges.clinicCharge.currency} {charges.clinicCharge.amount}
                      </span>
                    </div>
                  )}

                  <div className={styles.bookingActions}>
                    <a
                      href="https://mediman.life/userapp.html"
                      className={styles.bookButton}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Calendar size={16} color="white" />
                      Download MediMan App
                    </a>
                    <p className={styles.bookingNote}>Available on Android and iOS. Book appointments, get e-prescriptions, and manage your health records securely.</p>
                  </div>
                </div>
                <ShareButtons
                  doctor={{ _id: id, firstName, lastName, designation, service, about, profileImage }}
                  profileUrl={`https://doctors.mediman.life/${id}`}
                  availableText={`Available on MediMan${consultationType?.length ? ' · ' + consultationType.join('/') : ''}`}
                />
              </div>
            </div>
          </div>
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
