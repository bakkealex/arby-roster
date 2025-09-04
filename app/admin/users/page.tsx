"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { UserRole } from "@/types/user";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  gdprConsentDate?: string;
  gdprConsentVersion?: string;
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPendingUsers();
    }
  }, [status]);

  async function fetchPendingUsers() {
    try {
      const response = await fetch("/api/admin/pending-users");
      if (response.ok) {
        const users = await response.json();
        setPendingUsers(users);
      }
    } catch (error) {
      console.error("Error fetching pending users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function approveUser(userId: string, role: UserRole) {
    try {
      const response = await fetch("/api/admin/approve-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, role }),
      });

      if (response.ok) {
        // Remove the approved user from the list
        setPendingUsers(prev => prev.filter(user => user.id !== userId));
        alert("Bruker godkjent!");
      } else {
        alert("Feil ved godkjenning av bruker");
      }
    } catch (error) {
      console.error("Error approving user:", error);
      alert("Feil ved godkjenning av bruker");
    }
  }

  async function rejectUser(userId: string) {
    try {
      const response = await fetch("/api/admin/reject-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        // Remove the rejected user from the list
        setPendingUsers(prev => prev.filter(user => user.id !== userId));
        alert("Bruker avvist!");
      } else {
        alert("Feil ved avvisning av bruker");
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
      alert("Feil ved avvisning av bruker");
    }
  }

  if (status === "loading" || loading) {
    return <div className="flex justify-center items-center min-h-screen text-neutral-600">Laster...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== UserRole.ADMIN) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          Du har ikke tilgang til denne siden.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary-800">Brukeradministrasjon</h1>

      <div className="bg-white shadow-sm rounded-lg border border-neutral-200">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-primary-700">Ventende brukere ({pendingUsers.length})</h2>
          <p className="text-neutral-600 mt-2">
            Brukere som venter på godkjenning fra administrator
          </p>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="px-6 py-8 text-center text-neutral-500">
            Ingen brukere venter på godkjenning
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Bruker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Registrert
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    GDPR Samtykke
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Handlinger
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {pendingUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                        <div className="text-sm text-neutral-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(user.createdAt).toLocaleDateString("no-NO")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {user.gdprConsentDate ? (
                        <div>
                          <div className="text-accent-600">✅ Godkjent</div>
                          <div className="text-xs text-neutral-400">
                            {new Date(user.gdprConsentDate).toLocaleDateString("no-NO")}
                          </div>
                          {user.gdprConsentVersion && (
                            <div className="text-xs text-neutral-400">v{user.gdprConsentVersion}</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-red-600">❌ Ikke godkjent</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => approveUser(user.id, UserRole.EMPLOYEE)}
                        className="bg-accent-600 hover:bg-accent-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
                      >
                        Godkjenn som Ansatt
                      </button>
                      <button
                        onClick={() => approveUser(user.id, UserRole.CUSTOMER)}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
                      >
                        Godkjenn som Kunde
                      </button>
                      <button
                        onClick={() => rejectUser(user.id)}
                        className="bg-neutral-500 hover:bg-neutral-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
                      >
                        Avvis
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
