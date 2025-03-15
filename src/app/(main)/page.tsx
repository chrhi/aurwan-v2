import Header from "@/components/layout/header";
import { getAccountAction } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import { getCurrentStoreAction } from "@/actions/store.actions";
import PageView from "./page-view";

const Page = async () => {
  const [user, stores] = await Promise.all([
    getAccountAction(),
    getCurrentStoreAction(),
  ]);

  if (!user) {
    redirect("/auth-callback");
  }

  console.log(stores);

  return (
    <>
      <Header title="Dashboard" stores={stores} user={user} />
      <PageView user={user} stores={stores} />
    </>
  );
};

export default Page;
