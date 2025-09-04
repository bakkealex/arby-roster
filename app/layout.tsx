// app/layout.tsx
import "./globals.css";
import Header from "./Header";
import Providers from "./providers";
import { config, getMetadata, getViewport } from "@/lib/config";

export const metadata = getMetadata();
export const viewport = getViewport();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className="bg-neutral-50">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            {config.features.enableFooter && (
              <footer className="bg-primary-800 text-white py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-sm text-neutral-300">
                      {config.copyright.text}
                    </div>
                    <div className="flex space-x-4 mt-2 sm:mt-0">
                      {config.features.enableGdprPage && (
                        <a
                          href="/gdpr"
                          className="text-sm text-gray-300 hover:text-white transition"
                        >
                          Personvern
                        </a>
                      )}
                      {config.features.enableGdprPage && (
                        <span className="text-gray-500">•</span>
                      )}
                      <a
                        href={`mailto:${config.contact.email}`}
                        className="text-sm text-gray-300 hover:text-white transition"
                      >
                        Kontakt
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            )}
          </div>
        </Providers>
      </body>
    </html>
  );
}
