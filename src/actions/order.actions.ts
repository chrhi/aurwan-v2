"use server";

import { prisma } from "@/lib/db";
// ✅ Create a new order
export async function createOrder(data: {
  full_name: string;
  phone_number: number;
  wilaya_code: number;
  wilaya_name: string;
  city: string;
  address: string;
  quantity: number;
}) {
  try {
    const order = await prisma.order.create({
      data,
    });
    return { success: true, order };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create order." };
  }
}

// ✅ Get all orders
export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return orders;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// ✅ Update an order
export async function updateOrder(
  id: string,
  data: Partial<{
    full_name: string;
    phone_number: number;
    wilaya_code: number;
    wilaya_name: string;
    city: string;
    address: string;
    quantity: number;
  }>
) {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data,
    });
    return { success: true, order: updatedOrder };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to update order." };
  }
}

// ✅ Delete an order
export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to delete order." };
  }
}
