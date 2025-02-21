"use server";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@clerk/nextjs/server";
import { prisma as db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { fork } from "node:child_process";

// Custom error for unauthorized access
class UnauthorizedError extends Error {
  constructor(message = "Unauthorized access") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

// Verify user authorization
const verifyAuth = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new UnauthorizedError();
  }
  return userId;
};

export async function getProducts() {
  try {
    const userId = await verifyAuth();

    const products = await db.products.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: products };
  } catch (error) {
    return { error: "Failed to fetch products" };
  }
}

// Get a single product by ID (with auth check)
export async function getProduct(productId: string) {
  try {
    const userId = await verifyAuth();

    const product = await db.products.findUnique({
      where: {
        id: productId,
        userId, // Ensure the product belongs to the authenticated user
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return { data: product };
  } catch (error) {
    return { error: "Failed to fetch product" };
  }
}

// Create a new product
export async function createProduct(formData: {
  title: string;
  description: any; // JSON data
  price: number;
  compareAtPrice: number;
  media: any; // JSON data
}) {
  try {
    const userId = await verifyAuth();

    const product = await db.products.create({
      data: {
        userId,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        compareAtPrice: formData.compareAtPrice,
        media: formData.media,
        status: "ACTIVE",
      },
    });

    return { data: product };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

// Update an existing product
export async function updateProduct(
  productId: string,
  formData: {
    title?: string;
    description?: any;
    price?: number;
    compareAtPrice?: number;
    media?: any;
  }
) {
  try {
    const userId = await verifyAuth();

    // First verify the product belongs to the user
    const existingProduct = await db.products.findUnique({
      where: {
        id: productId,
        userId,
      },
    });

    if (!existingProduct) {
      throw new Error("Product not found or unauthorized");
    }

    const updatedProduct = await db.products.update({
      where: {
        id: productId,
      },
      data: formData,
    });

    revalidatePath("/products");
    return { data: updatedProduct };
  } catch (error) {
    return { error: "Failed to update product" };
  }
}

// Delete a product
export async function deleteProduct(productId: string) {
  try {
    const userId = await verifyAuth();

    // First verify the product belongs to the user
    const existingProduct = await db.products.findUnique({
      where: {
        id: productId,
        userId,
      },
    });

    if (!existingProduct) {
      throw new Error("Product not found or unauthorized");
    }

    await db.products.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete product" };
  }
}
