import Header from "@/components/layout/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { OrdersColumns } from "@/components/tables/orders-column";
import { DataTable } from "@/components/tables/data-table";

import { Order } from "@/types";
import { getAllOrders } from "@/actions/order.actions";

async function getData(): Promise<Order[]> {
  const data = await getAllOrders();

  if (!data) {
    return [];
  }

  const orders: Order[] = data?.map((item) => {
    return {
      id: item.id,
      status: "PENDING",
      address: item.address,
      city: item.city,
      full_name: item.full_name,
      quantity: item.quantity,
      phone_number: item.phone_number,
      wilaya_code: item.wilaya_code,
      wilaya_name: item.wilaya_name,
      createdAt: item.createdAt.toISOString(),
    };
  });

  return orders;
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <Header title="Products" />
      <MaxWidthWrapper className="my-10">
        <div className="w-full h-[50px] flex items-center justify-between ">
          <h2 className="text-xl font-bold ">All The Orders </h2>
        </div>
        <div className=" py-4">
          <DataTable columns={OrdersColumns} data={data} />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
