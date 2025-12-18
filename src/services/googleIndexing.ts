import 'server-only';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

// Try to load service account credentials from JSON file or environment variables
let GOOGLE_SERVICE_ACCOUNT_EMAIL: string | undefined;
let GOOGLE_PRIVATE_KEY: string | undefined;

// Option 1: Try loading from JSON file
const jsonFilePath = path.join(process.cwd(), 'liquid-champion-446318-n2-de9d58ffd34e.json');
try {
    if (fs.existsSync(jsonFilePath)) {
        const credentials = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        GOOGLE_SERVICE_ACCOUNT_EMAIL = credentials.client_email;
        GOOGLE_PRIVATE_KEY = credentials.private_key;
        console.log('✅ Google credentials loaded from JSON file');
    }
} catch (error) {
    console.warn('Could not load Google credentials from JSON file:', error);
}

// Option 2: Fall back to environment variables
if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
}

/**
 * Google Indexing API Service
 * Used to request Google to index/re-index URLs for faster SEO visibility
 */
class GoogleIndexingService {
    private auth: any;
    private indexing: any;

    constructor() {
        if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
            console.warn('Google Indexing API credentials not configured');
            return;
        }

        // Initialize JWT auth with service account
        this.auth = new google.auth.JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        // Initialize Indexing API
        this.indexing = google.indexing({
            version: 'v3',
            auth: this.auth,
        });
    }

    /**
     * Request Google to index or update a URL
     * @param url - The URL to index
     * @param type - 'URL_UPDATED' for new/updated content, 'URL_DELETED' for removed content
     */
    async requestIndexing(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<{ success: boolean; message: string }> {
        if (!this.indexing) {
            return { success: false, message: 'Google Indexing API not configured' };
        }

        try {
            const response = await this.indexing.urlNotifications.publish({
                requestBody: {
                    url,
                    type,
                },
            });

            console.log(`✅ Indexing request sent for: ${url}`, response.data);
            return {
                success: true,
                message: `Successfully requested indexing for ${url}`,
            };
        } catch (error: any) {
            console.error(`❌ Failed to request indexing for ${url}:`, error.message);
            return {
                success: false,
                message: error.message || 'Failed to request indexing',
            };
        }
    }

    /**
     * Batch request indexing for multiple URLs
     * @param urls - Array of URLs to index
     */
    async batchRequestIndexing(urls: string[]): Promise<{ successes: number; failures: number; results: any[] }> {
        const results: any[] = [];
        let successes = 0;
        let failures = 0;

        for (const url of urls) {
            const result = await this.requestIndexing(url);
            results.push({ url, ...result });

            if (result.success) {
                successes++;
            } else {
                failures++;
            }

            // Rate limiting - Google Indexing API has quotas
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return { successes, failures, results };
    }

    /**
     * Request indexing for a doctor profile page
     * @param doctorId - The doctor's unique ID
     */
    async indexDoctorProfile(doctorId: string): Promise<{ success: boolean; message: string }> {
        const url = `https://doctors.mediman.life/${doctorId}`;
        return this.requestIndexing(url);
    }

    /**
     * Request indexing for all main pages (sitemap refresh)
     */
    async indexMainPages(): Promise<{ successes: number; failures: number; results: any[] }> {
        const mainUrls = [
            'https://doctors.mediman.life/',
            'https://doctors.mediman.life/doctors',
        ];
        return this.batchRequestIndexing(mainUrls);
    }
}

// Export singleton instance
export const googleIndexingService = new GoogleIndexingService();
export default GoogleIndexingService;
