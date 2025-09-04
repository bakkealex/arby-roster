"use client";

import { useState } from "react";

interface CalendarViewProps {
  userRole: string;
  userId: string;
  availability: Record<string, unknown>[];
  bookings: Record<string, unknown>[];
}

export default function CalendarView({ userRole }: CalendarViewProps) {
  const [selectedDate] = useState<Date | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("no-NO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {userRole === "EMPLOYEE" ? "Min tilgjengelighet" : "Kalender"}
      </h2>

      {/* Placeholder for calendar functionality */}
      <div className="text-center py-8 text-neutral-500">
        <p>🗓️ Kalenderfunksjonalitet kommer snart</p>
        <p className="text-sm mt-2">Kalendervisning vil bli implementert her</p>
        {selectedDate && <p>Valgt dato: {formatDate(selectedDate)}</p>}
      </div>
    </div>
  );
}
