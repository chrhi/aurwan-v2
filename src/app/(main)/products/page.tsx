import Header from "@/components/layout/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Payment, columns } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <Header title="Products" />
      <MaxWidthWrapper className="my-10">
        <div className="w-full h-[50px] flex items-center justify-between ">
          <h2 className="text-3xl font-bold ">All Products </h2>

          <Button>Add new product</Button>
        </div>
        <div className=" py-4">
          <DataTable columns={columns} data={data} />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
