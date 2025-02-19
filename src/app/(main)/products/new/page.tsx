import AddProduct from "@/components/forms/products/add-product";
import Header from "@/components/layout/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Page() {
  return (
    <>
      <Header title="New Product" />
      <div className="w-full h-[100vh-55px]  mt-[55px] ">
        <MaxWidthWrapper>
          <AddProduct />
        </MaxWidthWrapper>
      </div>
    </>
  );
}
