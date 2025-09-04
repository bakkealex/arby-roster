export const dynamic = "force-dynamic"; // This disables SSG and ISR

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { checkUserTableExists } from "@/lib/db-utils";
import { config } from "@/lib/config";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const hasDatabase = await checkUserTableExists();

  if (!hasDatabase) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-primary-800">
            Velkommen til {config.app.name}
          </h1>
          <p className="text-neutral-600 mb-8">
            Databasen er ikke satt opp enda. Følg instruksjonene nedenfor for å komme i gang.
          </p>
          <Link
            href="/setup"
            className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors duration-200 text-lg font-medium"
          >
            Sett opp database
          </Link>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
          <h1 className="text-4xl font-bold mb-6 text-primary-800">
            {config.app.name}
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            {config.app.description}
          </p>
          <div className="space-y-4">
            <Link
              href="/login"
              className="block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors duration-200 text-lg font-medium"
            >
              Logg inn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-800 mb-2">
            Velkommen, {session.user.name}
          </h1>
          <p className="text-neutral-600">
            Rolle: {session.user.role === 'EMPLOYEE' ? 'Ansatt' : session.user.role === 'CUSTOMER' ? 'Kunde' : 'Admin'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold mb-4 text-primary-700">Kalender</h2>
            <p className="text-neutral-600 mb-4">
              {session.user.role === 'EMPLOYEE'
                ? 'Sett din tilgjengelighet og se kommende oppdrag'
                : 'Se tilgjengelige vektere og book tjenester'
              }
            </p>
            <Link
              href="/calendar"
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
            >
              Åpne kalender
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold mb-4 text-primary-700">Profil</h2>
            <p className="text-neutral-600 mb-4">
              Se og oppdater din profilinformasjon
            </p>
            <Link
              href="/profile"
              className="bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 transition-colors duration-200 text-sm font-medium"
            >
              Min profil
            </Link>
          </div>

          {session.user.role === 'ADMIN' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-xl font-semibold mb-4 text-primary-700">Administrasjon</h2>
              <p className="text-neutral-600 mb-4">
                Administrer brukere, oppdrag og systeminnstillinger
              </p>
              <Link
                href="/admin/users"
                className="bg-secondary-600 text-white px-4 py-2 rounded-md hover:bg-secondary-700 transition-colors duration-200 text-sm font-medium"
              >
                Admin panel
              </Link>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold mb-4 text-primary-700">Booking</h2>
            <p className="text-neutral-600 mb-4">
              {session.user.role === 'CUSTOMER'
                ? 'Se dine bookinger og send nye forespørsler'
                : 'Se tildelte oppdrag og oppdater status'
              }
            </p>
            <Link
              href="/booking"
              className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors duration-200 text-sm font-medium"
            >
              Se bookinger
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
