import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function StoreHeader() {
  return (
    <div dir="ltr" className="w-full h-[60px]  border-b ">
      <MaxWidthWrapper className="h-full">
        <div className="w-full h-full flex items-center justify-between">
          <p className="text-black italic font-bold text-xl">Chamse store</p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
