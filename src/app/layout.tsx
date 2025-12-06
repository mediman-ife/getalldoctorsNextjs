import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://doctors.mediman.life'),
  title: {
    default: "MediMan | Healthcare. Anytime. Anywhere. | Book Top Doctors Online",
    template: "%s | MediMan"
  },
  description: "Find your favourite doctors, get e-prescriptions, manage appointments and followups, and keep your medical records securely in one app. Book trusted doctors in Sri Lanka for video or in-clinic consultations.",
  keywords: [
    // === CORE BRAND ===
    'MediMan', 'MediMan App', 'MediMan Sri Lanka', 'MediMan Doctor App', 'MediMan Telehealth',

    // === TELEHEALTH / TELEMEDICINE ===
    'Telehealth Sri Lanka', 'Telemedicine Sri Lanka', 'Telemedicine App',
    'Online Doctor Consultation', 'Video Consultation Doctor', 'Virtual Doctor',
    'Online Healthcare', 'Digital Healthcare Sri Lanka', 'Remote Doctor Consultation',
    'Talk to Doctor Online', 'Chat with Doctor', 'Online Medical Consultation',
    'Virtual Healthcare', 'Remote Healthcare', 'Digital Health Platform',

    // === DOCTOR BOOKING ===
    'Book Doctor Online', 'E-Channeling Sri Lanka', 'Doctor Appointment Booking',
    'Find Doctor Near Me', 'Best Doctors Sri Lanka', 'Top Doctors Sri Lanka',
    'Doctor Appointment App', 'Book Appointment Online', 'Same Day Doctor Appointment',
    'Instant Doctor Consultation', 'Doctor on Demand', '24/7 Doctor',
    'Best Doctor App 2024', 'Top Healthcare App 2024',

    // === ALL MEDICAL SPECIALTIES ===
    'Ophthalmologist', 'Eye Doctor', 'Eye Specialist', 'LASIK Doctor',
    'Orthopaedic Surgeon', 'Bone Doctor', 'Spine Surgeon', 'Joint Specialist',
    'Cardiologist', 'Heart Doctor', 'Heart Specialist', 'Cardiac Surgeon',
    'Dermatologist', 'Skin Doctor', 'Skin Specialist', 'Acne Treatment',
    'Pediatrician', 'Child Doctor', 'Kids Doctor', 'Child Specialist',
    'Gynecologist', 'Obstetrician', 'Women Doctor', 'Pregnancy Doctor',
    'Neurologist', 'Brain Doctor', 'Nerve Specialist', 'Headache Doctor',
    'Psychiatrist', 'Mental Health Doctor', 'Depression Doctor', 'Anxiety Doctor',
    'ENT Specialist', 'Ear Nose Throat Doctor', 'ENT Doctor',
    'Dentist', 'Dental Doctor', 'Teeth Doctor', 'Dental Clinic',
    'General Physician', 'Family Doctor', 'GP Doctor', 'General Practitioner',
    'Internal Medicine', 'Gastroenterologist', 'Pulmonologist', 'Urologist',
    'Endocrinologist', 'Diabetes Doctor', 'Thyroid Doctor', 'Hormone Specialist',
    'Ayurvedic Doctor', 'Ayurveda Treatment', 'Homeopathy Doctor',

    // === COMMON MEDICAL CONDITIONS ===
    'Fever Treatment', 'Cold and Flu Doctor', 'COVID Doctor', 'Diabetes Consultation',
    'Blood Pressure Doctor', 'Hypertension Treatment', 'Back Pain Doctor',
    'Migraine Treatment', 'Allergy Doctor', 'Asthma Doctor', 'Arthritis Treatment',
    'Knee Pain Doctor', 'Shoulder Pain Treatment', 'Sports Injury Doctor',
    'Weight Loss Doctor', 'Obesity Treatment', 'PCOD Treatment', 'Infertility Doctor',
    'Hair Loss Treatment', 'Skin Problem Doctor', 'Stomach Pain Doctor',

    // === HEALTHCARE SERVICES ===
    'E-Prescription', 'Digital Prescription', 'Online Prescription',
    'Medical Records', 'Health Records App', 'Medical History App',
    'Second Opinion Doctor', 'Online Lab Reports', 'Health Checkup',
    'Family Healthcare', 'Corporate Healthcare', 'Health Insurance Doctor',

    // === SRI LANKA CITIES ===
    'Doctors Colombo', 'Doctors Kandy', 'Doctors Galle', 'Doctors Jaffna',
    'Doctors Matara', 'Doctors Negombo', 'Doctors Batticaloa', 'Doctors Trincomalee',
    'Doctors Kurunegala', 'Doctors Anuradhapura', 'Doctors Ratnapura',
    'Hospital Colombo', 'Clinic Colombo', 'Medical Center Sri Lanka',

    // === GLOBAL CITIES (UAE, UK, Australia) ===
    'Doctors Dubai', 'Doctors Abu Dhabi', 'Doctors Sharjah', 'Telehealth UAE',
    'Doctors London', 'Doctors Manchester', 'Telehealth UK', 'NHS Alternative',
    'Doctors Melbourne', 'Doctors Sydney', 'Telehealth Australia',
    'Doctors Singapore', 'Doctors Malaysia', 'Doctors Maldives',

    // === ACTION KEYWORDS ===
    'Consult Doctor Now', 'Get Medical Advice', 'Ask Doctor Online',
    'Find Specialist', 'Book Health Checkup', 'Get Second Opinion',
    'Emergency Doctor', 'Urgent Care Online', 'Medical Help Online',

    // === COMPETITOR ALTERNATIVES ===
    'Doc990 Alternative', 'oDoc Alternative', 'MyDoctor Alternative',
    'Best Doctor App Sri Lanka', 'Top Healthcare App Sri Lanka',
    'Practo Alternative', 'Lybrate Alternative', 'Apollo 247 Alternative'
  ],
  authors: [{ name: 'MediMan Life (PVT) Ltd' }],
  creator: 'MediMan Life (PVT) Ltd',
  publisher: 'MediMan Life (PVT) Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://doctors.mediman.life',
    siteName: 'MediMan',
    title: 'MediMan | Healthcare. Anytime. Anywhere.',
    description: 'Find your favourite doctors, get e-prescriptions, manage appointments and followups, and keep your medical records securely in one app.',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'MediMan - Healthcare Anytime, Anywhere',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediMan | Healthcare. Anytime. Anywhere.',
    description: 'Find your favourite doctors, get e-prescriptions, manage appointments and followups.',
    images: ['/icon.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://doctors.mediman.life',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const base = 'https://doctors.mediman.life'
  const mainSite = 'https://mediman.life'

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'MediMan',
    alternateName: 'MediMan Life',
    legalName: 'MediMan Life (PVT) Ltd',
    url: mainSite,
    logo: `${base}/icon.png`,
    description: 'A secure telehealth app to book trusted doctors, consult by video or in-clinic, get e-prescriptions, and manage family records – all in one place.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressLocality: 'Jaffna',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+94-11-466-8668',
        contactType: 'customer service',
        email: 'support@mediman.life',
        availableLanguage: ['English', 'Sinhala', 'Tamil']
      }
    ],
    sameAs: [
      'https://www.facebook.com/medimanlife/',
      'https://www.instagram.com/mediman_life/',
      'https://www.linkedin.com/company/105617168/',
      'https://www.youtube.com/@mediman'
    ],
  }

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MediMan Doctors Directory',
    url: base,
    description: 'Find and book appointments with verified doctors in Sri Lanka',
    publisher: {
      '@type': 'Organization',
      name: 'MediMan Life (PVT) Ltd',
      logo: `${base}/icon.png`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  // MedicalWebPage schema for health content authority
  const medicalWebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'MediMan - Sri Lanka\'s Premier Telehealth Platform',
    description: 'Book verified doctors online for video consultations, get e-prescriptions, and manage your family\'s health records securely.',
    url: base,
    mainContentOfPage: {
      '@type': 'WebPageElement',
      cssSelector: 'main'
    },
    specialty: [
      'Ophthalmology', 'Orthopedics', 'Cardiology', 'Dermatology',
      'Pediatrics', 'Gynecology', 'Neurology', 'Psychiatry',
      'ENT', 'General Medicine', 'Internal Medicine'
    ],
    audience: {
      '@type': 'PeopleAudience',
      audienceType: 'Patients seeking medical consultations in Sri Lanka'
    },
    lastReviewed: new Date().toISOString().split('T')[0],
  }

  // LocalBusiness schema for Sri Lanka presence
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'MediMan Telehealth',
    alternateName: 'MediMan Doctor Consultation',
    description: 'Online doctor consultations and clinic appointments across Sri Lanka. Book ophthalmologists, orthopedic surgeons, cardiologists, and 15+ specialties.',
    url: base,
    telephone: '+94-11-466-8668',
    email: 'support@mediman.life',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Colombo',
      addressLocality: 'Colombo',
      addressRegion: 'Western Province',
      postalCode: '00100',
      addressCountry: 'LK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.9271,
      longitude: 79.8612
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    priceRange: 'LKR 2000 - LKR 5000',
    paymentAccepted: 'Credit Card, Debit Card, Bank Transfer',
    currenciesAccepted: 'LKR',
    areaServed: [
      // Global Coverage
      { '@type': 'Place', name: 'Worldwide' },
      // Primary Markets
      { '@type': 'Country', name: 'Sri Lanka' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Singapore' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Malaysia' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'Maldives' },
      // All Sri Lanka Districts & Major Cities
      { '@type': 'City', name: 'Colombo' },
      { '@type': 'City', name: 'Kandy' },
      { '@type': 'City', name: 'Galle' },
      { '@type': 'City', name: 'Jaffna' },
      { '@type': 'City', name: 'Negombo' },
      { '@type': 'City', name: 'Kurunegala' },
      { '@type': 'City', name: 'Matara' },
      { '@type': 'City', name: 'Batticaloa' },
      { '@type': 'City', name: 'Trincomalee' },
      { '@type': 'City', name: 'Anuradhapura' },
      { '@type': 'City', name: 'Ratnapura' },
      { '@type': 'City', name: 'Badulla' },
      { '@type': 'City', name: 'Nuwara Eliya' },
      { '@type': 'City', name: 'Polonnaruwa' },
      { '@type': 'City', name: 'Hambantota' },
      { '@type': 'City', name: 'Ampara' },
      { '@type': 'City', name: 'Kalmunai' },
      { '@type': 'City', name: 'Vavuniya' },
      { '@type': 'City', name: 'Mannar' },
      { '@type': 'City', name: 'Kilinochchi' },
      { '@type': 'City', name: 'Mullaitivu' },
      { '@type': 'City', name: 'Puttalam' },
      { '@type': 'City', name: 'Chilaw' },
      { '@type': 'City', name: 'Kegalle' },
      { '@type': 'City', name: 'Kalutara' },
      { '@type': 'City', name: 'Gampaha' },
      { '@type': 'City', name: 'Moratuwa' },
      { '@type': 'City', name: 'Dehiwala' },
      { '@type': 'City', name: 'Mount Lavinia' },
      { '@type': 'City', name: 'Panadura' },
      { '@type': 'City', name: 'Horana' },
      { '@type': 'City', name: 'Weligama' },
      { '@type': 'City', name: 'Hikkaduwa' },
      { '@type': 'City', name: 'Unawatuna' },
      { '@type': 'City', name: 'Mirissa' },
      { '@type': 'City', name: 'Bentota' },
      { '@type': 'City', name: 'Beruwala' },
      { '@type': 'City', name: 'Dambulla' },
      { '@type': 'City', name: 'Sigiriya' },
      { '@type': 'City', name: 'Ella' },
      { '@type': 'City', name: 'Haputale' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Online Video Consultation',
            description: 'Consult with verified doctors via secure video call'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'E-Prescription',
            description: 'Get digital prescriptions sent directly to your phone'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Clinic Appointment Booking',
            description: 'Book in-person clinic visits with top doctors'
          }
        }
      ]
    }
  }

  // Service catalog schema
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Medical Specialties Available on MediMan',
    description: 'All medical specialties available for online and clinic consultations',
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: { '@type': 'MedicalSpecialty', name: 'Ophthalmology (Eye Care)' } },
      { '@type': 'ListItem', position: 2, item: { '@type': 'MedicalSpecialty', name: 'Orthopedics (Bone & Joint)' } },
      { '@type': 'ListItem', position: 3, item: { '@type': 'MedicalSpecialty', name: 'Cardiology (Heart)' } },
      { '@type': 'ListItem', position: 4, item: { '@type': 'MedicalSpecialty', name: 'Dermatology (Skin)' } },
      { '@type': 'ListItem', position: 5, item: { '@type': 'MedicalSpecialty', name: 'Pediatrics (Children)' } },
      { '@type': 'ListItem', position: 6, item: { '@type': 'MedicalSpecialty', name: 'Gynecology & Obstetrics' } },
      { '@type': 'ListItem', position: 7, item: { '@type': 'MedicalSpecialty', name: 'Neurology (Brain & Nerves)' } },
      { '@type': 'ListItem', position: 8, item: { '@type': 'MedicalSpecialty', name: 'Psychiatry (Mental Health)' } },
      { '@type': 'ListItem', position: 9, item: { '@type': 'MedicalSpecialty', name: 'ENT (Ear, Nose, Throat)' } },
      { '@type': 'ListItem', position: 10, item: { '@type': 'MedicalSpecialty', name: 'General Medicine' } },
      { '@type': 'ListItem', position: 11, item: { '@type': 'MedicalSpecialty', name: 'Internal Medicine' } },
      { '@type': 'ListItem', position: 12, item: { '@type': 'MedicalSpecialty', name: 'Gastroenterology' } },
      { '@type': 'ListItem', position: 13, item: { '@type': 'MedicalSpecialty', name: 'Pulmonology (Lungs)' } },
      { '@type': 'ListItem', position: 14, item: { '@type': 'MedicalSpecialty', name: 'Urology' } },
      { '@type': 'ListItem', position: 15, item: { '@type': 'MedicalSpecialty', name: 'Endocrinology (Diabetes/Thyroid)' } },
    ]
  }

  // SoftwareApplication schema for app downloads (AEO + ASO)
  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MediMan - Telehealth & Online Doctor',
    alternateName: 'MediMan App',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Android, iOS',
    description: 'Book trusted doctors, get video consultations, e-prescriptions, and manage your family health records - all in one secure telehealth app. Available across Sri Lanka.',
    url: 'https://mediman.life/userapp.html',
    downloadUrl: 'https://mediman.life/userapp.html',
    installUrl: 'https://mediman.life/userapp.html',
    screenshot: `${base}/icon.png`,
    softwareVersion: '1.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'LKR',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '100',
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Organization',
      name: 'MediMan Life (PVT) Ltd',
      url: mainSite
    },
    featureList: [
      'Video consultations with verified doctors',
      'Book clinic appointments',
      'Digital e-prescriptions',
      'Family health records',
      'Multi-language support (English, Sinhala, Tamil)',
      '15+ medical specialties'
    ]
  }

  // AEO (Answer Engine Optimization) - Global FAQ for AI assistants
  const aeoFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'MediMan Telehealth FAQ - Sri Lanka Online Doctor App',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is MediMan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MediMan is Sri Lanka\'s premier telehealth app that allows you to book trusted doctors for video consultations or clinic visits, get digital e-prescriptions, and manage your family\'s health records securely. Download free on Android and iOS.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I book a doctor on MediMan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Download the MediMan app from Google Play Store or Apple App Store. Search for a doctor by name or specialty, select video consultation or clinic visit, pick an available time slot, and pay securely. You\'ll receive instant confirmation.'
        }
      },
      {
        '@type': 'Question',
        name: 'What specialties are available on MediMan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MediMan offers 15+ medical specialties including Ophthalmology, Orthopedics, Cardiology, Dermatology, Pediatrics, Gynecology, Neurology, Psychiatry, ENT, General Medicine, Gastroenterology, Pulmonology, Urology, and Endocrinology.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much does a doctor consultation cost on MediMan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Consultation fees on MediMan range from LKR 2,000 to LKR 5,000 depending on the doctor and specialty. Video consultations and clinic visits may have different pricing. Each doctor\'s fee is clearly displayed on their profile.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is MediMan available in Sri Lanka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! MediMan is available across Sri Lanka including Colombo, Kandy, Galle, Jaffna, Negombo, Kurunegala, and all other cities. Download the app to consult with verified doctors from anywhere in Sri Lanka.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I get an e-prescription on MediMan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, after your consultation, the doctor can send you a digital e-prescription directly through the MediMan app. You can show this prescription at any pharmacy in Sri Lanka.'
        }
      },
      {
        '@type': 'Question',
        name: 'What languages does MediMan support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MediMan supports English, Sinhala, and Tamil. Many doctors on the platform are multilingual and can consult in your preferred language.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I download the MediMan app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Download MediMan for free from Google Play Store (Android) or Apple App Store (iOS). Visit https://mediman.life/userapp.html for direct download links to both stores.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is MediMan safe and secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, MediMan uses bank-level encryption to protect your health data. All doctors are verified medical professionals. Your medical records and personal information are stored securely and never shared without your consent.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the best online doctor app in Sri Lanka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MediMan is one of the best telehealth apps in Sri Lanka, offering 49+ verified doctors across 15+ specialties, video consultations, e-prescriptions, and family health record management. It\'s trusted by thousands of patients across Colombo, Kandy, Jaffna, and all Sri Lanka cities.'
        }
      }
    ]
  }

  // Speakable schema for voice search (Google Assistant, Alexa, Siri)
  const speakableJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'MediMan - Book Doctors Online in Sri Lanka',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.speakable-content', 'main p:first-of-type']
    },
    url: base,
    mainEntity: {
      '@type': 'MedicalBusiness',
      name: 'MediMan Telehealth',
      description: 'Book trusted doctors for video consultations or clinic visits. MediMan is Sri Lanka\'s premier telehealth app with 49+ verified doctors across 15+ specialties.',
    }
  }

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0052cc" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Core Web Vitals: Preconnect to external domains */}
        <link rel="preconnect" href="https://prod-mediman.s3.amazonaws.com" />
        <link rel="preconnect" href="https://prodapi.mediman.life" />
        <link rel="dns-prefetch" href="https://prod-mediman.s3.amazonaws.com" />
        <link rel="dns-prefetch" href="https://prodapi.mediman.life" />

        {/* Core Web Vitals: Preload critical fonts */}
        <link rel="preload" href="/icon.png" as="image" type="image/png" />

        {/* Canonical URL */}
        <link rel="canonical" href={base} />

        {/* AEO: Structured data for AI assistants */}
        <meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aeoFaqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      </body>
    </html>
  );
}
