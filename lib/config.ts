// Environment-based configuration for multi-client branding
// This allows each instance to be customized via environment variables

export const config = {
  // Application Identity
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Arby Roster",
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Minimalistisk og sikker plattform for administrasjon og booking av vektere",
    tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || "Profesjonell vektertjeneste administrasjon",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    environment: process.env.NEXT_PUBLIC_APP_ENVIRONMENT || "development",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },

  // Company Information
  company: {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Arby Roster AS",
    legalName: process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || "Arby Roster AS",
    orgNumber: process.env.NEXT_PUBLIC_COMPANY_ORG_NUMBER || "123 456 789",
    businessType: process.env.NEXT_PUBLIC_BUSINESS_TYPE || "Vektertjenester",
    serviceArea: process.env.NEXT_PUBLIC_SERVICE_AREA || "Hele Norge",
    establishedYear: process.env.NEXT_PUBLIC_ESTABLISHED_YEAR || "2024",
  },

  // Copyright Information
  copyright: {
    year: process.env.NEXT_PUBLIC_COPYRIGHT_YEAR || new Date().getFullYear().toString(),
    holder: process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER || "Arby Roster AS",
    text: `© ${process.env.NEXT_PUBLIC_COPYRIGHT_YEAR || new Date().getFullYear()} ${process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER || "Arby Roster AS"}. Alle rettigheter forbeholdes.`,
  },

  // Contact Information
  contact: {
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "kontakt@arbyroster.no",
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@arbyroster.no",
    privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "personvern@arbyroster.no",
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+47 12 34 56 78",
    address: {
      street: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Eksempelveien 123",
      postalCode: process.env.NEXT_PUBLIC_COMPANY_POSTAL_CODE || "0123",
      city: process.env.NEXT_PUBLIC_COMPANY_CITY || "Oslo",
      country: process.env.NEXT_PUBLIC_COMPANY_COUNTRY || "Norge",
      full: `${process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Eksempelveien 123"}, ${process.env.NEXT_PUBLIC_COMPANY_POSTAL_CODE || "0123"} ${process.env.NEXT_PUBLIC_COMPANY_CITY || "Oslo"}`,
    },
  },

  // Social Media & Web
  social: {
    website: process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://arbyroster.no",
    linkedin: process.env.NEXT_PUBLIC_COMPANY_LINKEDIN || "",
    facebook: process.env.NEXT_PUBLIC_COMPANY_FACEBOOK || "",
    twitter: process.env.NEXT_PUBLIC_COMPANY_TWITTER || "",
  },

  // Feature Flags
  features: {
    enableRegistration: process.env.NEXT_PUBLIC_ENABLE_REGISTRATION === "true",
    enableGdprPage: process.env.NEXT_PUBLIC_ENABLE_GDPR_PAGE === "true",
    enableFooter: process.env.NEXT_PUBLIC_ENABLE_FOOTER === "true",
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  },

  // Branding & Design
  branding: {
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#3B82F6",
    secondaryColor: process.env.NEXT_PUBLIC_SECONDARY_COLOR || "#1F2937",
    accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || "#10B981",
    logoUrl: process.env.NEXT_PUBLIC_BRAND_LOGO_URL || "",
    faviconUrl: process.env.NEXT_PUBLIC_FAVICON_URL || "",
  },
} as const;

// Helper function to get formatted contact information
export const getContactInfo = () => ({
  ...config.contact,
  formatted: {
    fullAddress: config.contact.address.full,
    emailLinks: {
      general: `mailto:${config.contact.email}`,
      support: `mailto:${config.contact.supportEmail}`,
      privacy: `mailto:${config.contact.privacyEmail}`,
    },
    phoneLink: `tel:${config.contact.phone}`,
  },
});

// Helper function to get full company info for legal pages
export const getCompanyInfo = () => ({
  ...config.company,
  formatted: {
    fullLegalName: `${config.company.legalName} (Org.nr: ${config.company.orgNumber})`,
    establishedText: `Etablert ${config.company.establishedYear}`,
    businessDescription: `${config.company.businessType} - ${config.company.serviceArea}`,
  },
});

// Helper function for page metadata
export const getMetadata = (pageTitle?: string) => ({
  title: pageTitle ? `${pageTitle} | ${config.app.name}` : config.app.name,
  description: config.app.description,
  keywords: `vektere, sikkerhet, booking, administrasjon, ${config.company.name}`,
  author: config.company.name,
  copyright: config.copyright.text,
});

// Helper function for viewport configuration
export const getViewport = () => ({
  width: "device-width",
  initialScale: 1,
});

export default config;
