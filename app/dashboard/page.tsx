import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { getMetadata } from "@/lib/config";

export const metadata = getMetadata("Dashboard");
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Velkommen tilbake, {session.user.name}
          </p>
          <p className="text-sm text-gray-500">
            Rolle: {session.user.role === 'EMPLOYEE' ? 'Ansatt' : session.user.role === 'CUSTOMER' ? 'Kunde' : 'Admin'}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">
              {session.user.role === "EMPLOYEE" ? "Tilgjengelighet" : "Bookinger"}
            </h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">Registrerte</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Aktive oppdrag</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500">Pågående</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Venter godkjenning</h3>
            <p className="text-3xl font-bold text-yellow-600">0</p>
            <p className="text-sm text-gray-500">Bookinger</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Fullførte</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500">Dette året</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold mb-4 text-primary-700">Hurtighandlinger</h2>
            <div className="space-y-3">
              <Link
                href="/calendar"
                className="block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 text-center font-medium"
              >
                📅 Åpne kalender
              </Link>
              <Link
                href="/profile"
                className="block bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 transition-colors duration-200 text-center font-medium"
              >
                👤 Rediger profil
              </Link>
              {session.user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 text-center font-medium"
                >
                  ⚙️ Admin panel
                </Link>
              )}
              <Link
                href="/booking"
                className="block bg-secondary-600 text-white px-4 py-2 rounded-md hover:bg-secondary-700 transition-colors duration-200 text-center font-medium"
              >
                📋 Se bookinger
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Siste aktivitet</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• System opprettet</p>
              <p className="text-sm text-gray-600">• Profil konfigurert</p>
              <p className="text-sm text-gray-500">• Klar for bruk</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Systeminfo</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">• Arby Roster v1.0</p>
              <p className="text-sm text-gray-600">• Database aktiv</p>
              <p className="text-sm text-gray-600">• Alle systemer operative</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
