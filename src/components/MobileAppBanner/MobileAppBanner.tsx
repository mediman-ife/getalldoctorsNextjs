"use client";

import { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import styles from "./MobileAppBanner.module.css";

const ANDROID_PACKAGE_NAME = "com.mediman.patient";
const IOS_APP_ID = "65932TQ539"; // Using Team ID from apple-app-site-association, usually needed for store URL if we have the App Store ID (numeric). 
// Since we don't have the App Store numeric ID yet, we'll use a placeholder or generic search if needed. 
// For now, I'll assume we can use a generic search or if the user provided one.
// User said: "iOS: App Store URL for app, optionally with doctor id as query string"
// I will use a placeholder for the App Store URL ID, let's say "id123456789" and ask user to update or rely on universal links mostly.
// Actually, I'll search for "Mediman" in store if ID is unknown, or just use a placeholder.
const IOS_APP_STORE_ID = "6751712281"; // Production App Store ID

export default function MobileAppBanner() {
    const [platform, setPlatform] = useState<"android" | "ios" | null>(null);
    const pathname = usePathname();
    const params = useParams();

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        if (/android/i.test(userAgent)) {
            setPlatform("android");
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            setPlatform("ios");
        }
    }, []);

    if (!platform) return null;

    const handleOpenApp = () => {
        let deepLink = "mediman://doctors";

        // Check if we are on a doctor profile page
        // Route is /[id] so pathname would be /<id>
        // but params.id would be available.
        if (params?.id) {
            deepLink = `mediman://doctor/${params.id}`;
        }

        const start = Date.now();

        // Attempt to open deep link
        window.location.href = deepLink;

        setTimeout(() => {
            const end = Date.now();
            // If the time elapsed is small, it means we are still in the browser (app didn't open)
            // The threshold is usually arbitrary, but since we set timeout for 1500ms...
            // Actually, if the app opens, the browser js execution might pause or page hides.
            // But simple check: if we are still here, redirect.

            // Check if page is hidden (if app opened, page visibility might change, but not always reliable 100%)
            if (document.hidden) return;

            // Fallback to store
            if (platform === "android") {
                let storeUrl = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}&pcampaignid=web_share`;
                if (params?.id) {
                    // Android Play Store referrer parameter
                    storeUrl += `&referrer=doctorId=${params.id}`;
                }
                window.location.href = storeUrl;
            } else if (platform === "ios") {
                // Production App Store URL
                let storeUrl = `https://apps.apple.com/app/id${IOS_APP_STORE_ID}`;
                window.location.href = storeUrl;
            }
        }, 1500);
    };

    return (
        <div className={styles.banner}>
            <div className={styles.text}>
                Experience the best of MediMan in our app
            </div>
            <div className={styles.buttonGroup}>
                <button className={`${styles.button} ${styles.primaryButton}`} onClick={handleOpenApp}>
                    Open in App
                </button>
                {/* We can add a separate 'Download App' button if needed, but the main logic usually covers both via fallback.
            The user asked for:
            - "Open in app" (primary)
            - "Download app" if app not installed or user chooses it.
            
            With the fallback logic, "Open in App" effectively becomes "Download App" if it fails.
            I'll add a secondary button specifically for "Download App" that goes straight to store.
         */}
                <button className={`${styles.button} ${styles.secondaryButton}`} onClick={() => {
                    if (platform === "android") {
                        window.location.href = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}&pcampaignid=web_share`;
                    } else {
                        window.location.href = `https://apps.apple.com/app/id${IOS_APP_STORE_ID}`;
                    }
                }}>
                    Download App
                </button>
            </div>
        </div>
    );
}
