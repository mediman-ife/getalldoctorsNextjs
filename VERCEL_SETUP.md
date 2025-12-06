# Vercel Environment Variables Setup for Google Indexing API

## Required Environment Variables

Add these to your Vercel project settings (Settings > Environment Variables):

### 1. GOOGLE_SERVICE_ACCOUNT_EMAIL
```
mediman-search-console@liquid-champion-446318-n2.iam.gserviceaccount.com
```

### 2. GOOGLE_PRIVATE_KEY
Copy the entire private key from the JSON file (including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines).

**Important:** In Vercel, paste the key with actual newlines, NOT escaped \n characters.

---

## How Auto-Indexing Works

1. **Cron Job Trigger:** When `/api/cron/revalidate-doctors` is called:
   - Fetches all doctors from API
   - Revalidates cache
   - **Automatically requests Google indexing for all doctor URLs**

2. **Manual Indexing:** Call `/api/google-index` with:
   ```json
   { "doctorId": "doctor_id_here" }
   ```
   or
   ```json
   { "indexMainPages": true }
   ```

---

## Vercel Cron Setup (vercel.json)

Add this to your `vercel.json` to auto-run the cron every 10 minutes:

```json
{
  "crons": [
    {
      "path": "/api/cron/revalidate-doctors",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

This ensures new doctors are automatically indexed!
