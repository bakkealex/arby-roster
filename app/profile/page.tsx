import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { getMetadata } from "@/lib/config";

export const metadata = getMetadata("Profile");

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Profil
          </h1>
          <p className="text-neutral-600">
            Administrer din profil og innstillinger
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary-700">Profilinformasjon</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Navn
                </label>
                <input
                  type="text"
                  value={session.user.name || ""}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  E-post
                </label>
                <input
                  type="email"
                  value={session.user.email || ""}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Rolle
                </label>
                <div className="px-3 py-2 bg-neutral-100 rounded-md text-neutral-700">
                  {session.user.role === "EMPLOYEE" && "Ansatt"}
                  {session.user.role === "CUSTOMER" && "Kunde"}
                  {session.user.role === "ADMIN" && "Administrator"}
                </div>
              </div>

              {session.user.role === "EMPLOYEE" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Ansattnummer
                    </label>
                    <input
                      type="text"
                      placeholder="Ikke angitt"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      placeholder="Ikke angitt"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Sted
                    </label>
                    <input
                      type="text"
                      placeholder="Ikke angitt"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200">
                      <option value="ACTIVE">Aktiv</option>
                      <option value="INACTIVE">Inaktiv</option>
                      <option value="ON_LEAVE">Permisjon</option>
                    </select>
                  </div>
                </>
              )}

              <div className="pt-4">
                <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium">
                  Lagre endringer
                </button>
              </div>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary-700">Handlinger</h2>

            <div className="space-y-3">
              <button className="w-full bg-neutral-600 text-white px-4 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-200 font-medium">
                🔐 Endre passord
              </button>

              <button className="w-full bg-secondary-600 text-white px-4 py-2 rounded-md hover:bg-secondary-700 transition-colors duration-200 font-medium">
                📄 Last ned mine data
              </button>

              <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium">
                🗑️ Slett konto
              </button>
            </div>

            {session.user.role === "EMPLOYEE" && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4 text-primary-700">Sertifisering</h3>
                <div className="space-y-2">
                  <div className="text-sm text-neutral-600">
                    Neste resertifisering: <strong>Ikke angitt</strong>
                  </div>
                  <button className="w-full bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 transition-colors duration-200 text-sm font-medium">
                    📚 Se kurshistorikk
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* GDPR Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary-700">Personvern (GDPR)</h2>
          <div className="space-y-4">
            <p className="text-neutral-600">
              Vi behandler dine personopplysninger i henhold til GDPR og norsk personvernlovgivning.
            </p>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="gdpr-consent" checked readOnly className="text-primary-600 focus:ring-primary-500" />
              <label htmlFor="gdpr-consent" className="text-sm text-neutral-700">
                Jeg har samtykket til behandling av mine personopplysninger
              </label>
            </div>
            <div className="text-sm text-neutral-500">
              Samtykke gitt: {new Date().toLocaleDateString("no-NO")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
