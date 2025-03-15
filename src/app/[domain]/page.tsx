import MaxWidthWrapper from "@/components/max-width-wrapper";
import AnnouncementBar from "./components/announcement-bar";
import StoreHeader from "./components/store-header";
import SimpleProductCard from "./components/simple-product-card";

export default function Page() {
  return (
    <>
      <AnnouncementBar />
      <StoreHeader />
      <div className="w-full py-20 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600 text-white relative overflow-hidden">
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center relative z-10">
          {/* Arabic heading */}
          <h1
            className="text-4xl md:text-6xl font-bold text-center mb-6"
            style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
          >
            مجموعة الربيع الجديدة
          </h1>
          {/* Arabic subheading */}
          <p
            className="text-xl md:text-2xl text-center mb-8 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
          >
            اكتشف تشكيلتنا الفاخرة من المنتجات الراقية بتصاميم أنيقة وجودة
            استثنائية
          </p>

          {/* Decorative separator */}
          <div className="w-24 h-1 bg-white opacity-80 rounded mb-6"></div>

          {/* Decorative flower pattern */}
          <div className="text-4xl mb-4">✿ ❈ ✿</div>
        </div>

        {/* Side decorations */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden md:block text-6xl opacity-20">
          ❈ ❈ ❈
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:block text-6xl opacity-20">
          ❈ ❈ ❈
        </div>
      </div>

      <div className="text-center my-12 h-fit ">
        <h2
          className="text-3xl font-bold text-gray-800 mb-4"
          style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
        >
          منتجاتنا المميزة
        </h2>
        <div className="w-16 h-1 bg-rose-500 mx-auto"></div>
      </div>

      <div className="flex justify-center items-center h-fit ">
        <SimpleProductCard />
      </div>

      {/* Call to action */}

      <MaxWidthWrapper className="my-12">
        <div className="text-center">
          <p
            className="text-lg text-gray-600 mb-6"
            style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
          >
            استكشف المزيد من منتجاتنا الراقية
          </p>
          <div className="inline-block border-b-2 border-rose-500 pb-1 text-rose-600 font-medium">
            قريباً
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
