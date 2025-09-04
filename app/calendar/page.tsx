import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { getMetadata } from "@/lib/config";

export const metadata = getMetadata("Calendar");

export default async function CalendarPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Kalender
          </h1>
          <p className="text-neutral-600">
            {session.user.role === "EMPLOYEE" && "Administrer din tilgjengelighet og se tildelte oppdrag"}
            {session.user.role === "CUSTOMER" && "Se tilgjengelige vektere og book tjenester"}
            {session.user.role === "ADMIN" && "Oversikt over all tilgjengelighet og bookinger"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Availability Section */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary-700">
              {session.user.role === "EMPLOYEE" ? "Min tilgjengelighet" :
                session.user.role === "CUSTOMER" ? "Tilgjengelige vektere" :
                  "All tilgjengelighet"}
            </h2>

            {session.user.role === "EMPLOYEE" && (
              <div className="mb-4">
                <button className="bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 transition-colors duration-200 font-medium">
                  + Legg til tilgjengelighet
                </button>
              </div>
            )}

            <div className="text-center text-neutral-500 py-8">
              <p>🗓️ Kalenderfunksjonalitet kommer snart</p>
              <p className="text-sm mt-2 text-neutral-400">Her vil du kunne administrere tilgjengelighet og se bookinger</p>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary-700">
              {session.user.role === "EMPLOYEE" ? "Mine oppdrag" :
                session.user.role === "CUSTOMER" ? "Mine bookinger" :
                  "Alle bookinger"}
            </h2>

            <div className="text-center text-neutral-500 py-8">
              <p>📋 Bookingsoversikt kommer snart</p>
              <p className="text-sm mt-2 text-neutral-400">Her vil du se alle relevante bookinger og oppdrag</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary-700">Hurtighandlinger</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-primary-600 text-white px-4 py-3 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium shadow-sm">
              📅 Ny tilgjengelighet
            </button>
            <button className="bg-accent-600 text-white px-4 py-3 rounded-md hover:bg-accent-700 transition-colors duration-200 font-medium shadow-sm">
              ➕ Ny booking
            </button>
            <button className="bg-secondary-600 text-white px-4 py-3 rounded-md hover:bg-secondary-700 transition-colors duration-200 font-medium shadow-sm">
              📊 Se rapporter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
