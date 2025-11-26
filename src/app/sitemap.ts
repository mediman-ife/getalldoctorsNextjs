import type { MetadataRoute } from 'next';
import { fetchDoctors, getAllDoctorsForStaticParams } from '@/services/api';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;
export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://doctors.mediman.life';
  const now = new Date();

  // Main pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/doctors`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
  ];

  try {
    // Fetch all doctors for sitemap
    const allDoctors = await getAllDoctorsForStaticParams();

    // Generate doctor profile pages
    const doctorPages: MetadataRoute.Sitemap = allDoctors.map((doctor) => ({
      url: `${baseUrl}/${doctor._id}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    // Combine all pages
    return [...staticPages, ...doctorPages];

  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages if doctors fetch fails
    return staticPages;
  }
}

// Additional sitemap configuration
export const metadata = {
  sitemap: {
    generateRobotsTxt: true,
    generateIndexSitemap: false,
  },
};