import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function StoreHeader() {
  return (
    <div className="w-full h-[70px] shadow border-b ">
      <MaxWidthWrapper className="h-full">
        <div className="w-full h-full flex items-center justify-between">
          <p>logo</p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
