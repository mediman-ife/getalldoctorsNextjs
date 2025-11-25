import React from 'react';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <a href="https://mediman.life" target="_blank" rel="noopener noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://mediman.life/wp-content/uploads/2025/10/mediman-logo-svg-re.svg"
                            alt="MediMan Logo"
                            className={styles.logo}
                        />
                    </a>
                </div>

                <nav className={styles.nav}>
                    <a href="https://mediman.life/" className={styles.navLink}>Home</a>
                    <a href="https://mediman.life/doctor/" className={styles.navLink}>Doctor</a>
                    <a href="https://mediman.life/faq/" className={styles.navLink}>FAQ</a>
                    <a href="https://mediman.life/contact/" className={styles.navLink}>Contact</a>
                </nav>

                <div className={styles.actions}>
                    <a href="https://mediman.life/userapp.html" className={styles.downloadButton}>
                        Download
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
