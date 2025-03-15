import { getAccountAction } from "@/actions/auth.actions";
import { getCurrentStoreAction } from "@/actions/store.actions";
import AddProduct from "@/components/forms/products/add-product";
import Header from "@/components/layout/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { redirect } from "next/navigation";

export default async function Page() {
  const [user, stores] = await Promise.all([
    getAccountAction(),
    getCurrentStoreAction(),
  ]);

  if (!user) {
    redirect("/auth-callback");
  }

  return (
    <>
      <Header title="New Product" stores={stores} user={user} />
      <div className="w-full h-[100vh-55px]  mt-[55px] ">
        <MaxWidthWrapper>
          <AddProduct />
        </MaxWidthWrapper>
      </div>
    </>
  );
}
