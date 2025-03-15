import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { createStoreSchema } from "@/lib/validators/store";
import { ZodError } from "zod";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's account
    const account = await prisma.account.findUnique({
      where: { userId },
    });

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
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

    return new NextResponse(JSON.stringify(stores), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[STORE_GET]", error);

    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate with Zod schema
    try {
      const validatedData = createStoreSchema.parse(body);

      // Get user's account
      const account = await prisma.account.findUnique({
        where: { userId },
      });

      if (!account) {
        return NextResponse.json(
          { error: "Account not found" },
          { status: 404 }
        );
      }

      // Create new store with validated data
      const store = await prisma.store.create({
        data: {
          ...validatedData,
          accountId: account.id,
        },
      });

      return NextResponse.json(store, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: "Validation failed", details: error.errors },
          { status: 400 }
        );
      }
      throw error; // Re-throw if it's not a ZodError
    }
  } catch (error) {
    console.error("[STORE_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
