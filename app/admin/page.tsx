import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administrasjon
          </h1>
          <p className="text-gray-600">
            Administrer brukere, bookinger og systeminnstillinger
          </p>
        </div>

        {/* Admin Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Brukere</h3>
                <p className="text-2xl font-bold text-blue-600">47</p>
                <p className="text-sm text-gray-500">Totalt registrerte</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Bookinger</h3>
                <p className="text-2xl font-bold text-green-600">156</p>
                <p className="text-sm text-gray-500">Denne måneden</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Ventende</h3>
                <p className="text-2xl font-bold text-orange-600">12</p>
                <p className="text-sm text-gray-500">Krever handling</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">💼</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Aktive vektere</h3>
                <p className="text-2xl font-bold text-purple-600">23</p>
                <p className="text-sm text-gray-500">På jobb nå</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Brukerstyring</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                + Ny bruker
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Søk etter brukere..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2">Navn</th>
                    <th className="text-left py-3 px-2">E-post</th>
                    <th className="text-left py-3 px-2">Rolle</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Handlinger</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2">Admin Bruker</td>
                    <td className="py-3 px-2">admin@arbyroster.no</td>
                    <td className="py-3 px-2">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                        Administrator
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Aktiv
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">
                        Rediger
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2">Ola Nordmann</td>
                    <td className="py-3 px-2">ola@example.com</td>
                    <td className="py-3 px-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        Ansatt
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Aktiv
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">
                        Rediger
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Deaktiver
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2">Kunde AS</td>
                    <td className="py-3 px-2">kontakt@kunde.no</td>
                    <td className="py-3 px-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Kunde
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Aktiv
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">
                        Rediger
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Deaktiver
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center text-gray-500 py-4">
              <p className="text-sm">Viser 3 av 47 brukere</p>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Hurtighandlinger</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  👤 Opprett ny bruker
                </button>
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                  📊 Generer rapport
                </button>
                <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                  💾 Eksporter data
                </button>
                <button className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
                  ⚙️ Systeminnstillinger
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Ventende godkjenninger</h2>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">Ny vekterbestilling</h4>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Venter
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Kunde AS har bestilt vekter for 15. mars
                  </p>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition">
                      Godkjenn
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition">
                      Avvis
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">Ny registrering</h4>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Ny
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Kari Hansen har registrert seg som vekter
                  </p>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition">
                      Aktiver
                    </button>
                    <button className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition">
                      Se profil
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Systemstatus</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Database:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    ✅ Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">E-posttjeneste:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    ✅ Fungerer
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Backup:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    ✅ Dagens
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Oppetid:</span>
                  <span className="text-sm font-medium">99.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GDPR Management Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">GDPR-styring</h2>
            <a
              href="/gdpr"
              target="_blank"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              📄 Se gjeldende personvernerklæring
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tittel på personvernerklæring
                </label>
                <input
                  type="text"
                  placeholder="Personvernerklæring for Arby Roster"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Versjon
                </label>
                <input
                  type="text"
                  placeholder="1.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Innhold (Markdown støttes)
                </label>
                <textarea
                  rows={12}
                  placeholder="Skriv inn personvernerklæringen her..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                />
              </div>

              <div className="flex space-x-3">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                  💾 Lagre og publiser
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                  👁️ Forhåndsvis
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Gjeldende versjon</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Tittel:</span>
                  <p className="text-sm text-gray-900">Personvernerklæring for Arby Roster</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Versjon:</span>
                  <p className="text-sm text-gray-900">1.0</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Sist oppdatert:</span>
                  <p className="text-sm text-gray-900">{new Date().toLocaleDateString("no-NO")}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs ml-2">
                    ✅ Aktiv
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-md font-medium mb-3">Historikk</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  <div className="text-xs text-gray-600 p-2 bg-white rounded border">
                    v1.0 - {new Date().toLocaleDateString("no-NO")} - Første versjon
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-md font-medium mb-3">GDPR-statistikk</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Totale samtykker:</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Denne måneden:</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tilbaketrukket:</span>
                    <span className="font-medium">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
