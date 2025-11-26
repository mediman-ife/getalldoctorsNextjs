'use client';
import React from 'react';
import { Doctor } from '@/types/doctor';
import styles from './DoctorCard.module.css';
import { Video, MapPin } from 'lucide-react';
import Link from 'next/link';

interface DoctorCardProps {
    doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
    const { _id, firstName, lastName, designation, profileImage, charges, consultationType } = doctor;

    const hasOnline = consultationType.includes('ONLINE');
    const hasClinic = consultationType.includes('CLINIC');

    return (
        <a className={styles.card} href={`/${_id}`}>
            <div className={styles.imageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-elements */}
                <img
                    src={profileImage?.signedUrl || '/placeholder-doctor.png'}
                    alt={`${firstName} ${lastName}`}
                    className={styles.image}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Dr';
                    }}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 className={styles.name}>Dr. {firstName} {lastName}</h3>
                    <p className={styles.designation}>{designation}</p>
                </div>

                <div className={styles.prices}>
                    {hasOnline && (
                        <div className={styles.priceRow}>
                            <div className={styles.priceLabel}>
                                <Video size={16} color="#0066cc" />
                                <span>Online Consultation</span>
                            </div>
                            <span className={styles.priceValue}>
                                {charges.onlineCharge.currency} {charges.onlineCharge.amount}
                            </span>
                        </div>
                    )}

                    {hasClinic && (
                        <div className={styles.priceRow}>
                            <div className={styles.priceLabel}>
                                <MapPin size={16} color="#0066cc" />
                                <span>Clinic Consultation</span>
                            </div>
                            <span className={styles.priceValue}>
                                {charges.clinicCharge.currency} {charges.clinicCharge.amount}
                            </span>
                        </div>
                    )}
                </div>

                <button type="button" className={styles.viewButton}>
                    View
                </button>
            </div>
        </a>
    );
};

export default DoctorCard;
