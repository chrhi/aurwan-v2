import Header from "@/components/layout/header";

export default async function Page() {
  return (
    <>
      <Header title="home" />
      <div className="w-full h-[100vh-55px] bg-gray-100 mt-[55px] ">
        <p>this is the existing account</p>
      </div>
    </>
  );
}
