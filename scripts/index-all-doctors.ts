/**
 * Script to request Google indexing for all doctor profiles
 * Run with: npx ts-node scripts/index-all-doctors.ts
 */

import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://doctors.mediman.life';
const API_URL = 'https://prodapi.mediman.life';

// Load credentials from JSON file
const jsonFilePath = path.join(process.cwd(), 'liquid-champion-446318-n2-de9d58ffd34e.json');
const credentials = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Initialize Google Auth
const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
});

// Initialize Indexing API
const indexing = google.indexing({
    version: 'v3',
    auth: auth,
});

async function requestIndexing(url: string): Promise<boolean> {
    try {
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url,
                type: 'URL_UPDATED',
            },
        });
        console.log(`✅ Indexed: ${url}`);
        return true;
    } catch (error: any) {
        console.error(`❌ Failed: ${url} - ${error.message}`);
        return false;
    }
}

async function fetchAllDoctors(): Promise<string[]> {
    // Read API key from .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const apiKeyMatch = envContent.match(/NEXT_PUBLIC_MEDIMAN_API_KEY=(.+)/);
    const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : '';

    console.log(`Using API key: ${apiKey.substring(0, 10)}...`);

    const response = await fetch(`${API_URL}/publicRoutes/getAllDoctors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'key': apiKey,
        },
        body: JSON.stringify({ pageNumber: 1, limit: 100 }),
    });

    const data = await response.json();

    if (data.success && data.data) {
        return data.data.map((doc: any) => doc._id);
    }

    console.log('API Response:', data);
    return [];
}

async function main() {
    console.log('🚀 Starting Google Indexing for all doctor profiles...\n');

    // Main pages to index
    const mainUrls = [
        `${BASE_URL}/`,
        `${BASE_URL}/doctors`,
    ];

    // Fetch all doctor IDs
    console.log('📋 Fetching all doctors from API...');
    const doctorIds = await fetchAllDoctors();
    console.log(`Found ${doctorIds.length} doctors\n`);

    // Build all URLs
    const doctorUrls = doctorIds.map(id => `${BASE_URL}/${id}`);
    const allUrls = [...mainUrls, ...doctorUrls];

    let successes = 0;
    let failures = 0;

    console.log(`📨 Requesting indexing for ${allUrls.length} URLs...\n`);

    for (const url of allUrls) {
        const success = await requestIndexing(url);
        if (success) {
            successes++;
        } else {
            failures++;
        }

        // Rate limiting - wait 100ms between requests
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Successful: ${successes}`);
    console.log(`   ❌ Failed: ${failures}`);
    console.log(`   📄 Total: ${allUrls.length}`);
}

main().catch(console.error);
