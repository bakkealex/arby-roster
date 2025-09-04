"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { GdprInfo } from "@/types/gdpr";

export default function GdprContent() {
  const [gdprInfo, setGdprInfo] = useState<GdprInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGdprInfo = async () => {
      try {
        const response = await fetch("/api/gdpr");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setGdprInfo(data);
      } catch (err) {
        console.error("Error fetching GDPR info:", err);
        setError("Kunne ikke laste GDPR-informasjon");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGdprInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Laster GDPR-informasjon...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <span className="text-red-600 text-xl mr-3">⚠️</span>
          <div>
            <h3 className="text-red-800 font-medium">Feil ved lasting av GDPR-informasjon</h3>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!gdprInfo) {
    return (
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6">
        <div className="flex items-center">
          <span className="text-yellow-500 text-xl mr-3">ℹ️</span>
          <div>
            <h3 className="text-yellow-800 font-medium">Ingen GDPR-informasjon tilgjengelig</h3>
            <p className="text-yellow-600 text-sm mt-1">
              GDPR-informasjon er ikke konfigurert i systemet ennå.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-none">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {gdprInfo.title}
        </h2>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Versjon: {gdprInfo.version}</span>
          <span>•</span>
          <span>Sist oppdatert: {new Date(gdprInfo.updatedAt).toLocaleDateString("no-NO")}</span>
        </div>
      </div>

      <div
        className="gdpr-content text-gray-700 leading-relaxed prose prose-gray max-w-none
                   prose-headings:text-gray-900 prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8
                   prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                   prose-h3:text-xl prose-h3:font-medium prose-h3:mb-3 prose-h3:mt-5
                   prose-p:mb-4 prose-p:text-base prose-p:leading-7
                   prose-ul:mb-4 prose-ul:pl-6 prose-ol:mb-4 prose-ol:pl-6 
                   prose-li:mb-2 prose-li:text-base prose-li:leading-6
                   prose-strong:font-semibold prose-strong:text-gray-900
                   prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                   prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic"
      >
        <ReactMarkdown>{gdprInfo.content}</ReactMarkdown>
      </div>
    </div>
  );
}
