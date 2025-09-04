"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium"
    >
      ← Tilbake
    </button>
  );
}
