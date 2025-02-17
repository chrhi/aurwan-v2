import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { User } from "@clerk/nextjs/server";

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
