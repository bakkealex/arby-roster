"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { config } from "@/lib/config";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white shadow-sm border-b border-neutral-200 py-4 px-8">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary-800 hover:text-primary-600 transition-colors">
          {config.app.name}
        </Link>
        <div className="flex items-center space-x-3">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/calendar"
                className="bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 transition-colors duration-200 text-sm font-medium"
              >
                Kalender
              </Link>
              {session.user?.role === 'ADMIN' && (
                <Link
                  href="/admin/users"
                  className="bg-secondary-600 text-white px-4 py-2 rounded-md hover:bg-secondary-700 transition-colors duration-200 text-sm font-medium"
                >
                  Admin
                </Link>
              )}
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-neutral-200">
                <div className="text-sm text-neutral-600">
                  {session.user?.name && <div className="font-medium text-neutral-800">{session.user.name}</div>}
                  <div className="text-xs">{session.user?.email}</div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-neutral-500 text-white px-4 py-2 rounded-md hover:bg-neutral-600 transition-colors duration-200 text-sm font-medium"
                >
                  Logg ut
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 text-sm font-medium">
              Logg inn
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
