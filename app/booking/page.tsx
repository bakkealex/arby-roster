import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

export default async function BookingPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {session.user.role === "CUSTOMER" ? "Mine bookinger" : "Bookinger"}
          </h1>
          <p className="text-gray-600">
            {session.user.role === "CUSTOMER" && "Administrer dine bestillinger av vektertjenester"}
            {session.user.role === "EMPLOYEE" && "Oversikt over dine tildelte oppdrag"}
            {session.user.role === "ADMIN" && "Administrer alle bookinger og oppdrag"}
          </p>
        </div>

        {/* New Booking Button for Customers */}
        {session.user.role === "CUSTOMER" && (
          <div className="mb-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-medium">
              + Ny bestilling
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Bookings */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">
              {session.user.role === "CUSTOMER" ? "Aktive bestillinger" : "Kommende oppdrag"}
            </h2>

            <div className="space-y-4">
              {/* Mock booking items */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">Eksempel bestilling</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Bekreftet
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📅 Dato: 15. mars 2024, 18:00 - 02:00</p>
                  <p>📍 Sted: Oslo sentrum</p>
                  {session.user.role === "CUSTOMER" && <p>👤 Vekter: Ola Nordmann</p>}
                  {session.user.role === "EMPLOYEE" && <p>🏢 Kunde: Eksempel AS</p>}
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition">
                    Se detaljer
                  </button>
                  {session.user.role === "CUSTOMER" && (
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition">
                      Avbryt
                    </button>
                  )}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">Ukentlig oppdrag</h3>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Venter bekreftelse
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📅 Dato: 20. mars 2024, 22:00 - 06:00</p>
                  <p>📍 Sted: Stavanger</p>
                  {session.user.role === "CUSTOMER" && <p>👤 Vekter: Ikke tildelt</p>}
                  {session.user.role === "EMPLOYEE" && <p>🏢 Kunde: Sikkerhet Nord AS</p>}
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition">
                    Se detaljer
                  </button>
                  {session.user.role === "ADMIN" && (
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition">
                      Bekreft
                    </button>
                  )}
                </div>
              </div>

              <div className="text-center text-gray-500 py-8">
                <p>📋 Her vil alle bookinger vises</p>
                <p className="text-sm mt-2">Databasekoblinger kommer snart</p>
              </div>
            </div>
          </div>

          {/* Booking Statistics/Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Statistikk</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Totale bookinger:</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Denne måneden:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kommende:</span>
                  <span className="font-medium">5</span>
                </div>
                {session.user.role === "EMPLOYEE" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timer denne uke:</span>
                    <span className="font-medium">32</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Hurtighandlinger</h2>
              <div className="space-y-3">
                {session.user.role === "CUSTOMER" && (
                  <>
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                      📅 Ny bestilling
                    </button>
                    <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                      📋 Bestillingshistorikk
                    </button>
                  </>
                )}

                {session.user.role === "EMPLOYEE" && (
                  <>
                    <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                      ✅ Meld tilgjengelighet
                    </button>
                    <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                      📝 Oppdragsrapport
                    </button>
                  </>
                )}

                {session.user.role === "ADMIN" && (
                  <>
                    <button className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
                      👥 Tildel vektere
                    </button>
                    <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                      📊 Eksporter rapport
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Booking Status Filters */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Filtrer etter status</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" checked className="mr-2" />
                  <span className="text-sm">Bekreftet</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked className="mr-2" />
                  <span className="text-sm">Venter bekreftelse</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Avbrutt</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Fullført</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
