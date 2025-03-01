import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function ProductsRow({ title }: { title: string }) {
  return (
    <MaxWidthWrapper className="w-full h-fit flex flex-col my-10">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <div className="w-full h-fit min-h-[400px] grid grid-cols-1 md:grid-cols-4"></div>
    </MaxWidthWrapper>
  );
}
