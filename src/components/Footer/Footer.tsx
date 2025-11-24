import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.copyright}>
                    &copy; 2025 MediMan Life (PVT) Ltd. All rights reserved.
                </div>
                <div className={styles.links}>
                    <a href="https://mediman.life/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        Term & Conditions
                    </a>
                    <a href="https://mediman.life/privacy-policy/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        Privacy Policy
                    </a>
                    <a href="https://mediman.life/delete-account/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        Delete Account
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
