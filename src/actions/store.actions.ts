"use server";

import { prisma } from "@/lib/db";
import { Store } from "@/types";
import { auth } from "@clerk/nextjs/server";

/**
 * Fetches the  store of the user from the API
 */
export async function getCurrentStoreAction(): Promise<Store[]> {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.log("you are not authenticated");
      return [];
    }

    // Get user's account
    const account = await prisma.account.findUnique({
      where: { userId },
    });

    if (!account) {
      console.log("you are not authenticated");
      return [];
    }

    // Get all stores for this account
    const stores = await prisma.store.findMany({
      where: {
        accountId: account.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return stores;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
}
