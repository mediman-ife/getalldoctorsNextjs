import React from 'react';
import { Metadata } from 'next';
import { getDoctorProfileInfo } from '@/services/api';
import Header from '@/components/Header/Header';
import styles from './page.module.css';
import { Video, MapPin, Globe, Languages, Stethoscope, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic'
export const revalidate = 3600
export const runtime = 'edge'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    try {
        const response = await getDoctorProfileInfo(id)
        if (response.success) {
            const d = response.data.doctor
            const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://medimandoctor.sugeevanit25.workers.dev'
            return {
                title: `Dr. ${d.firstName} ${d.lastName} | MediMan`,
                description: d.designation || 'Find and book appointments with top doctors in Sri Lanka.',
                alternates: { canonical: `${base}/doctors/${id}` },
                openGraph: {
                    title: `Dr. ${d.firstName} ${d.lastName} | MediMan`,
                    description: d.designation || 'Find and book appointments with top doctors in Sri Lanka.',
                    url: `${base}/doctors/${id}`,
                    images: d.profileImage?.signedUrl ? [{ url: d.profileImage.signedUrl }] : undefined,
                },
            }
        }
    } catch {}
    return { title: 'Doctor | MediMan' }
}

// No static params: dynamic routes resolve at request time

// Dynamic route: don’t generate static params to avoid build-time API calls

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
        console.error(err);
    }

    if (error || !doctor) {
        return notFound();
    }

    const {
        firstName, lastName, designation, profileImage,
        about, experience, country, languages, service,
        charges, consultationType
    } = doctor;

    const jsonld = {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: `Dr. ${firstName} ${lastName}`,
        description: designation,
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://medimandoctor.sugeevanit25.workers.dev'}/doctors/${id}`,
        image: profileImage?.signedUrl,
        medicalSpecialty: service && service.length > 0 ? service : undefined,
        areaServed: country,
        offers: consultationType.includes('ONLINE')
            ? { '@type': 'Offer', price: charges.onlineCharge.amount, priceCurrency: charges.onlineCharge.currency }
            : undefined,
    }

    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.container}>
                <a href="/" className={styles.backLink}>← Back to Doctors</a>

                <div className={styles.profileCard}>
                    <div className={styles.header}>
                        <div className={styles.imageWrapper}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={profileImage?.signedUrl || '/placeholder-doctor.png'}
                                alt={`Dr. ${firstName} ${lastName}`}
                                className={styles.image}
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
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentGrid}>
                        <div className={styles.leftColumn}>
                            <section className={styles.section}>
                                <h3 className={styles.sectionTitle}>About</h3>
                                <p className={styles.aboutText}>{about}</p>
                            </section>

                            {service && service.length > 0 && (
                                <section className={styles.section}>
                                    <h3 className={styles.sectionTitle}>
                                        <Stethoscope size={20} /> Services
                                    </h3>
                                    <ul className={styles.serviceList}>
                                        {service.map((s: string, index: number) => (
                                            <li key={index}>{s}</li>
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

                                <a href="https://mediman.life/userapp.html" className={styles.bookButton} target="_blank" rel="noopener noreferrer">
                                    Download MediMan App
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
        </div>
    );
}
