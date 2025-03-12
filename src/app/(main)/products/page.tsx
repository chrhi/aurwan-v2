import { getProducts } from "@/actions/product.actions";
import Header from "@/components/layout/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ProductsColumns } from "@/components/tables/products-columns";
import { DataTable } from "@/components/tables/data-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import Link from "next/link";

async function getData(): Promise<Product[]> {
  const { data } = await getProducts();

  if (!data) {
    return [];
  }

  const products = data?.map((item) => {
    return {
      id: item.id,
      status: "Active",
      price: Number(item.price),
      title: item.title,
      //@ts-expect-error this urls exists
      media: item.media?.urls[0] as string,
      createdAt: item.createdAt,
    };
  });

  return products;
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <Header title="Products" />
      <MaxWidthWrapper className="my-10">
        <div className="w-full h-[50px] flex items-center justify-between ">
          <h2 className="text-xl font-bold ">All Products </h2>

          <Link className={cn(buttonVariants())} href={"/products/new"}>
            Add new product
          </Link>
        </div>
        <div className=" py-4">
          <DataTable columns={ProductsColumns} data={data} />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
