import { PrismaClient, UserRole, EmployeeStatus } from "@prisma/client";
import bcryptjs from "bcryptjs";

// Get environment variables with fallbacks
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Arby Roster";
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Arby Roster AS";
const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || "Arby Roster AS";
const COMPANY_ORG_NUMBER = process.env.NEXT_PUBLIC_COMPANY_ORG_NUMBER || "123 456 789";
const PRIVACY_EMAIL = process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "personvern@arbyroster.no";
const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+47 12 34 56 78";
const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Eksempelveien 123";
const COMPANY_POSTAL_CODE = process.env.NEXT_PUBLIC_COMPANY_POSTAL_CODE || "0123";
const COMPANY_CITY = process.env.NEXT_PUBLIC_COMPANY_CITY || "Oslo";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Hash password for all test users
  const hashedPassword = await bcryptjs.hash("123456", 12);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@arbyroster.no" },
    update: {},
    create: {
      email: "admin@arbyroster.no",
      password: hashedPassword,
      name: "Admin Bruker",
      role: UserRole.ADMIN,
      gdprConsent: true,
      gdprConsentDate: new Date(),
      gdprConsentVersion: "1",
      isApproved: true,
      approvedAt: new Date(),
      approvedBy: "system",
    },
  });

  // Create employee user
  const employee = await prisma.user.upsert({
    where: { email: "ansatt@arbyroster.no" },
    update: {},
    create: {
      email: "ansatt@arbyroster.no",
      password: hashedPassword,
      name: "Ola Nordmann",
      role: UserRole.EMPLOYEE,
      phone: "+47 123 45 678",
      employeeNumber: "EMP001",
      location: "Oslo",
      operativeStatus: EmployeeStatus.ACTIVE,
      gdprConsent: true,
      gdprConsentDate: new Date(),
      gdprConsentVersion: "1",
      isApproved: true,
      approvedAt: new Date(),
      approvedBy: "system",
    },
  });

  // Create customer user
  const customer = await prisma.user.upsert({
    where: { email: "kunde@arbyroster.no" },
    update: {},
    create: {
      email: "kunde@arbyroster.no",
      password: hashedPassword,
      name: "Kunde AS",
      role: UserRole.CUSTOMER,
      gdprConsent: true,
      gdprConsentDate: new Date(),
      gdprConsentVersion: "1",
      isApproved: true,
      approvedAt: new Date(),
      approvedBy: "system",
    },
  });

  // Create GDPR information
  const gdprInfo = await prisma.gdprInfo.upsert({
    where: { id: "gdpr-main" },
    update: {},
    create: {
      id: "gdpr-main",
      title: `Personvernerklæring for ${COMPANY_NAME}`,
      version: "1.0",
      isActive: true,
      content: `# Personvernerklæring for ${COMPANY_NAME}

## 1. Behandlingsansvarlig

${COMPANY_LEGAL_NAME} er behandlingsansvarlig for behandlingen av personopplysninger som beskrevet i denne personvernerklæringen.

**Kontaktinformasjon:**
- Bedrift: ${COMPANY_LEGAL_NAME}
- Organisasjonsnummer: ${COMPANY_ORG_NUMBER}
- E-post: ${PRIVACY_EMAIL}
- Telefon: ${COMPANY_PHONE}
- Adresse: ${COMPANY_ADDRESS}, ${COMPANY_POSTAL_CODE} ${COMPANY_CITY}

## 2. Hvilke personopplysninger behandler vi?

Vi behandler følgende kategorier av personopplysninger:

### For ansatte:
- Kontaktinformasjon (navn, e-post, telefon)
- Ansattnummer og arbeidssted
- Operativ status og tilgjengelighet
- Sertifiseringsdatoer og kurshistorikk
- Tilbakemeldinger og vurderinger

### For kunder:
- Kontaktinformasjon (navn, e-post, telefon)
- Bestillingshistorikk og preferanser
- Kommunikasjon og meldinger

### For alle brukere:
- Innloggingsinformasjon og brukerpreferanser
- Aktivitetslogger og systembruk
- IP-adresser og enhetsopplysninger

## 3. Formålet med behandlingen

Vi behandler dine personopplysninger for følgende formål:

- **Tjenesteyting**: For å tilby våre vektertjenester og administrere bookinger
- **Brukeradministrasjon**: For å administrere brukerkontoer og tilganger
- **Kommunikasjon**: For å kommunisere med brukere om tjenester og bookinger
- **Kvalitetssikring**: For å forbedre våre tjenester og sikre kvalitet
- **Juridiske forpliktelser**: For å oppfylle lovpålagte krav innen sikkerhetsbransjen

## 4. Rettsgrunnlag for behandlingen

Behandlingen av dine personopplysninger er basert på:

- **Samtykke**: Du har gitt eksplisitt samtykke til behandlingen
- **Kontraktsoppfyllelse**: Behandlingen er nødvendig for å oppfylle våre avtaler
- **Rettslig forpliktelse**: Vi er pålagt å behandle opplysningene i henhold til lov
- **Berettiget interesse**: Vi har en berettiget interesse i å drive virksomheten effektivt

## 5. Hvor lenge oppbevarer vi opplysningene?

Vi oppbevarer dine personopplysninger bare så lenge det er nødvendig for formålene beskrevet over:

- **Aktive brukere**: Så lenge kontoen er aktiv
- **Inaktive brukere**: 3 år etter siste aktivitet
- **Bookinghistorikk**: 5 år for regnskapsmessige formål
- **Kommunikasjon**: 2 år etter siste kontakt

## 6. Deling av personopplysninger

Vi deler ikke dine personopplysninger med tredjeparter, med unntak av:

- **Underleverandører**: Som hjelper oss med å levere tjenester (f.eks. hosting)
- **Offentlige myndigheter**: Når vi er lovpålagt til det
- **Samarbeidspartnere**: Med ditt eksplisitte samtykke

Alle våre leverandører er bundet av databehandleravtaler og GDPR-krav.

## 7. Dine rettigheter

I henhold til GDPR har du følgende rettigheter:

- **Rett til informasjon**: Du har rett til informasjon om behandlingen
- **Rett til innsyn**: Du kan be om en kopi av dine personopplysninger
- **Rett til retting**: Du kan be oss rette feil i dine opplysninger
- **Rett til sletting**: Du kan be oss slette dine personopplysninger
- **Rett til begrensning**: Du kan be oss begrense behandlingen
- **Rett til dataportabilitet**: Du kan få dine data i et strukturert format
- **Rett til å trekke tilbake samtykke**: Du kan når som helst trekke tilbake samtykke

For å utøve dine rettigheter, kontakt oss på ${PRIVACY_EMAIL}.

## 8. Sikkerhet

Vi har implementert tekniske og organisatoriske tiltak for å beskytte dine personopplysninger:

- **Kryptering**: All dataoverføring og lagring er kryptert
- **Tilgangskontroll**: Begrenset tilgang basert på rolle og behov
- **Overvåking**: Kontinuerlig overvåking av systemsikkerhet
- **Backup**: Regelmessige sikkerhetskopier med kryptering
- **Opplæring**: Ansatte får regelmessig opplæring i personvern

## 9. Klagerett

Du har rett til å klage til Datatilsynet hvis du mener vi ikke behandler dine personopplysninger i henhold til gjeldende rett.

**Datatilsynet:**
- Nettside: www.datatilsynet.no
- Telefon: 22 39 69 00
- E-post: postkasse@datatilsynet.no

## 10. Endringer i personvernerklæringen

Vi kan oppdatere denne personvernerklæringen fra tid til annen. Vesentlige endringer vil bli kommunisert til brukerne via e-post eller gjennom systemet.

## 11. Kontakt oss

Hvis du har spørsmål om denne personvernerklæringen eller vår behandling av personopplysninger, kontakt oss:

- E-post: ${PRIVACY_EMAIL}
- Telefon: ${COMPANY_PHONE}
- Adresse: ${COMPANY_ADDRESS}, ${COMPANY_POSTAL_CODE} ${COMPANY_CITY}

Sist oppdatert: ${new Date().toLocaleDateString("no-NO")}`,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`👤 Admin user: ${admin.email}`);
  console.log(`👤 Employee user: ${employee.email}`);
  console.log(`👤 Customer user: ${customer.email}`);
  console.log(`📄 GDPR info: ${gdprInfo.title}`);
  console.log(`🏢 Company: ${COMPANY_NAME}`);
  console.log("🔑 Default password for all users: 123456");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
