"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      if (isRegisterMode) {
        // Add GDPR consent for registration
        formData.append("gdprConsent", "true");
      }

      const response = await signIn("credentials", {
        ...Object.fromEntries(formData),
        redirect: false,
      });

      if (response?.error) {
        setError(response.error);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("En feil oppstod under innlogging");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-primary-800">
            {isRegisterMode ? "Opprett konto" : "Logg inn på din konto"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isRegisterMode && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                  Navn
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={isRegisterMode}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Ditt fulle navn"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                E-post
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="din@epost.no"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Passord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Ditt passord"
              />
            </div>

            {isRegisterMode && (
              <div className="flex items-center">
                <input
                  id="gdprConsent"
                  name="gdprConsent"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="gdprConsent" className="ml-2 block text-sm text-neutral-900">
                  Jeg godtar personvernvilkårene (GDPR)
                </label>
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              {isRegisterMode ? "Opprett konto" : "Logg inn"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-primary-600 hover:text-primary-500 text-sm font-medium underline-offset-4 hover:underline transition-colors duration-200"
          >
            {isRegisterMode
              ? "Har du allerede en konto? Logg inn her"
              : "Ny bruker? Opprett konto her"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
