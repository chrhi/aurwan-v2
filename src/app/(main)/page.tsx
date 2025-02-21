import Header from "@/components/layout/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default async function Page() {
  return (
    <>
      <Header title="home" />
      <MaxWidthWrapper className="w-full h-[100vh-55px]  mt-[55px] ">
        <p className="text-2xl font-bold ">hi there how are you</p>
      </MaxWidthWrapper>
    </>
  );
}
