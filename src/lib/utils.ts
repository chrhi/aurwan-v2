import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { User } from "@clerk/nextjs/server";
import { Commune, LocationItem, Wilaya } from "@/types";

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function isMacOs() {
  if (typeof window === "undefined") return false;

  return window.navigator.userAgent.includes("Mac");
}

export function getUserEmail(user: User | null) {
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  return email;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deleteAllCookies() {
  // Get all the cookies for the current site
  const cookies = document.cookie.split(";");

  // Loop through each cookie and delete it
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

    // Set the cookie expiration date to the past to delete it
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }

  console.log("All cookies deleted.");
}

/**
 * Loads the Algeria cities data from the JSON file
 * @returns The array of location data
 */
export function loadAlgeriaData(): LocationItem[] {
  // Import the JSON file directly
  // This works with TypeScript and most bundlers (webpack, vite, etc.)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data: LocationItem[] = require("@/constants/algeria_cities.json");
  return data;
}

/**
 * Extracts all unique wilayats (states) from the Algeria cities data
 * @returns An array of objects containing wilaya code and names
 */
export function getAllWilayats(): Wilaya[] {
  const data = loadAlgeriaData();

  const wilayatsMap = new Map<string, Wilaya>();

  data.forEach((item) => {
    if (item.wilaya_code && item.wilaya_name_ascii && item.wilaya_name) {
      wilayatsMap.set(item.wilaya_code, {
        code: item.wilaya_code,
        name_ascii: item.wilaya_name_ascii,
        name: item.wilaya_name,
      });
    }
  });

  return Array.from(wilayatsMap.values());
}

/**
 * Gets all communes (cities) from a specific wilaya based on the wilaya code
 * @param wilayaCode - The code of the wilaya to filter by
 * @returns An array of objects containing commune details
 */
export function getCommunesByWilaya(wilayaCode: string): Commune[] {
  const data = loadAlgeriaData();

  if (!wilayaCode) {
    throw new Error("Wilaya code is required");
  }

  return data
    .filter((item) => item.wilaya_code === wilayaCode)
    .map((commune) => ({
      id: commune.id,
      name_ascii: commune.commune_name_ascii,
      name: commune.commune_name,
      daira_name_ascii: commune.daira_name_ascii,
      daira_name: commune.daira_name,
    }));
}
