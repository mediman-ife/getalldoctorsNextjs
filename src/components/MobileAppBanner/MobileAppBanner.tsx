"use client";

import { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";


const ANDROID_PACKAGE_NAME = "com.mediman.patient";
const IOS_APP_STORE_ID = "6751712281"; // Production App Store ID

export default function MobileAppBanner() {
    const [platform, setPlatform] = useState<"android" | "ios" | null>(null);
    const pathname = usePathname();
    const params = useParams();

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        let currentPlatform: "android" | "ios" | null = null;

        if (/android/i.test(userAgent)) {
            currentPlatform = "android";
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            currentPlatform = "ios";
        }

        setPlatform(currentPlatform);

        if (currentPlatform) {
            // Automatic Redirection Logic
            let deepLink = "mediman://doctors";
            let doctorId = params?.id;

            // Fallback info extraction
            if (!doctorId && pathname && pathname !== "/" && !pathname.startsWith("/api") && !pathname.startsWith("/doctors")) {
                const potentialId = pathname.substring(1);
                if (potentialId) {
                    doctorId = potentialId;
                }
            }

            if (doctorId) {
                deepLink = `mediman://doctor/${doctorId}`;
            }

            // Attempt to open deep link immediately
            window.location.href = deepLink;

            setTimeout(() => {
                if (document.hidden) return; // App likely opened

                // Fallback to store
                if (currentPlatform === "android") {
                    let storeUrl = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}&pcampaignid=web_share`;
                    if (doctorId) {
                        storeUrl += `&referrer=doctorId=${doctorId}`;
                    }
                    window.location.href = storeUrl;
                } else if (currentPlatform === "ios") {
                    let storeUrl = `https://apps.apple.com/app/id${IOS_APP_STORE_ID}`;
                    window.location.href = storeUrl;
                }
            }, 1500);
        }
    }, [pathname, params]);

    // Render nothing, logic is automatic
    return null;
}
