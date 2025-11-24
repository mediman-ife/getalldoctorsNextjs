'use client';
import React from 'react';
import { Doctor } from '@/types/doctor';
import styles from './DoctorCard.module.css';
import { Video, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DoctorCardProps {
    doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
    const { _id, firstName, lastName, designation, profileImage, charges, consultationType } = doctor;
    const router = useRouter();

    const hasOnline = consultationType.includes('ONLINE');
    const hasClinic = consultationType.includes('CLINIC');

    const handleCardClick = () => {
        router.push(`/doctors/${_id}`);
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <div className={styles.imageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={profileImage?.signedUrl || '/placeholder-doctor.png'}
                    alt={`${firstName} ${lastName}`}
                    className={styles.image}
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

                <button className={styles.viewButton} onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/doctors/${_id}`);
                }}>
                    View
                </button>
            </div>
        </div>
    );
};

export default DoctorCard;
