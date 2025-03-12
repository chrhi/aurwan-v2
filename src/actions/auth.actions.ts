"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export type AccountWithClerkData = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  // Clerk user data
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
};

/**
 * Syncs the user's Clerk account with our database
 * Creates a new account if one doesn't exist
 */
export async function syncAccountAction(): Promise<boolean> {
  try {
    const { userId } = await auth();

    // Check authentication
    if (!userId) {
      redirect("/sign-in");
    }

    // Check if account already exists
    const existingAccount = await prisma.account.findUnique({
      where: {
        userId,
      },
    });

    // If account exists, return true
    if (existingAccount) {
      return true;
    }

    // Create new account
    await prisma.account.create({
      data: {
        userId,
      },
    });

    return true;
  } catch (error) {
    console.error("Error syncing account:", error);
    return false;
  }
}

/**
 * Gets the user's account data including Clerk profile information
 */
export async function getAccountAction(): Promise<AccountWithClerkData | null> {
  try {
    const { userId } = await auth();

    // Check authentication
    if (!userId) {
      return null;
    }

    // Get Clerk user data
    const user = await currentUser();

    if (!user) {
      return null;
    }

    // Get account from database
    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    });

    if (!account) {
      return null;
    }

    // Combine database account with Clerk user data
    return {
      ...account,
      email: user.emailAddresses[0]?.emailAddress ?? null,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    };
  } catch (error) {
    console.error("Error getting account:", error);
    return null;
  }
}
