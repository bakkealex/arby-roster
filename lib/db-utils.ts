"use server";

import prisma from "@/lib/prisma";

/**
 * Checks if the User table exists in the database
 * @returns Promise<boolean> - true if the table exists, false otherwise
 */
export async function checkUserTableExists(): Promise<boolean> {
  try {
    // Try to query the user table
    await prisma.user.findFirst();
    return true;
  } catch {
    // If there's an error, the table likely doesn't exist
    return false;
  }
}

/**
 * Legacy function name for backwards compatibility
 */
export const checkPostTableExists = checkUserTableExists;
