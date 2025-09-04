import { Suspense } from "react";
import GdprContent from "./GdprContent";
import BackButton from "./BackButton";
import { config, getContactInfo, getMetadata } from "@/lib/config";

export const metadata = getMetadata("Personvern og GDPR");

export default function GdprPage() {
  const contactInfo = getContactInfo();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Personvern og GDPR
            </h1>
            <p className="text-gray-600">
              Informasjon om hvordan vi behandler dine personopplysninger
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Laster GDPR-informasjon...</span>
              </div>
            }
          >
            <GdprContent />
          </Suspense>

          <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">
              Dine rettigheter
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-800">
              <div>
                <h4 className="font-medium mb-2">📋 Rett til informasjon</h4>
                <p>Du har rett til å få informasjon om hvordan vi behandler dine personopplysninger.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">👁️ Rett til innsyn</h4>
                <p>Du kan be om en kopi av alle personopplysninger vi har registrert om deg.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">✏️ Rett til retting</h4>
                <p>Du kan be oss rette opp feil eller mangelfulle opplysninger om deg.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🗑️ Rett til sletting</h4>
                <p>Under visse omstendigheter kan du kreve at vi sletter dine personopplysninger.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🚫 Rett til begrensning</h4>
                <p>Du kan be oss begrense behandlingen av dine personopplysninger.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">📦 Rett til dataportabilitet</h4>
                <p>Du kan be om å få dine personopplysninger utlevert i et strukturert format.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Kontaktinformasjon
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Behandlingsansvarlig:</strong> {config.company.legalName}</p>
              <p><strong>E-post:</strong> <a href={contactInfo.formatted.emailLinks.privacy} className="text-blue-600 hover:text-blue-800">{contactInfo.privacyEmail}</a></p>
              <p><strong>Telefon:</strong> <a href={contactInfo.formatted.phoneLink} className="text-blue-600 hover:text-blue-800">{contactInfo.phone}</a></p>
              <p><strong>Adresse:</strong> {contactInfo.address.full}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Hvis du har spørsmål om behandlingen av dine personopplysninger eller ønsker å utøve dine rettigheter,
                kan du kontakte oss på <a href={contactInfo.formatted.emailLinks.privacy} className="text-blue-600 hover:text-blue-800">{contactInfo.privacyEmail}</a>.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}
