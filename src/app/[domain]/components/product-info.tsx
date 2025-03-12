"use client";

import { useState } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { OrderProductForm } from "./order-form";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Truck, ShieldCheck, Clock, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductInfo() {
  const [selectedImage, setSelectedImage] = useState("/image-03.jpg");
  const [isZoomed, setIsZoomed] = useState(false);

  const testimonials = [
    {
      name: "سارة م.",
      rating: 5,
      comment:
        "منتج رائع! لاحظت تحسناً كبيراً في بشرتي بعد أسبوع واحد فقط من الاستخدام.",
    },
    {
      name: "فاطمة ع.",
      rating: 5,
      comment: "جودة استثنائية بسعر معقول. سأطلب مرة أخرى بالتأكيد!",
    },
    {
      name: "ليلى ح.",
      rating: 4,
      comment: "تغليف أنيق والمنتج فعال جداً. أنصح به بشدة.",
    },
  ];

  // Product images - for gallery
  const productImages = ["/image-01.jpg", "/image-02.jpg", "/image-03.jpg"];

  // Handle zoom effect on image hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <MaxWidthWrapper>
      <div className="w-full h-fit min-h-screen grid grid-cols-1 md:grid-cols-2 p-4 gap-8 py-6">
        {/* Product Image Section */}
        <div className="w-full h-full flex flex-col gap-y-4">
          {/* Main product image with zoom capability */}
          <div
            className={cn(
              "w-full h-[400px] rounded-lg overflow-hidden relative cursor-zoom-in",
              isZoomed && "bg-no-repeat"
            )}
            style={
              isZoomed
                ? {
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: "200%",
                  }
                : {}
            }
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isZoomed && setIsZoomed(false)}
          >
            {!isZoomed && (
              <img
                src={selectedImage}
                alt="Luxury Cosmetics"
                className="w-full h-full object-cover"
              />
            )}

            {/* Badges for social proof and scarcity */}
            <Badge className="absolute top-2 left-2 bg-rose-600">
              الأكثر مبيعاً
            </Badge>
            <Badge className="absolute top-2 right-2 bg-amber-500">
              باقي 7 فقط
            </Badge>
          </div>

          {/* Thumbnail gallery */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {productImages.map((img, index) => (
              <div
                key={index}
                className={cn(
                  "h-20 bg-gray-100 rounded cursor-pointer hover:opacity-80 transition border-2",
                  selectedImage === img
                    ? "border-rose-600"
                    : "border-transparent"
                )}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full h-full flex flex-col gap-y-6 md:pt-4">
          {/* Product Category + Title */}
          <div className="text-right">
            <p className="text-rose-600 text-sm font-medium mb-1">
              مستحضرات التجميل الطبيعية
            </p>
            <h1 className="font-bold text-3xl md:text-4xl">
              مواد التجميل الفاخرة
            </h1>
          </div>

          {/* Star Rating - social proof */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm text-gray-600">(126 تقييم)</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-amber-500 text-amber-500"
                />
              ))}
            </div>
          </div>

          {/* Pricing with discount - anchor pricing */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 justify-end">
              <span className="text-gray-500 line-through text-lg">
                10000 DZ
              </span>
              <span className="text-2xl font-bold text-right text-rose-600">
                5000 DZ
              </span>
            </div>
            <div className="flex justify-end items-center gap-2">
              <p className="text-green-600 text-right text-sm font-medium">
                وفر 50٪ - عرض لفترة محدودة
              </p>
              <Badge className="bg-green-600">-50%</Badge>
            </div>
          </div>

          {/* Trust badges - reduce purchase anxiety */}
          <div className="grid grid-cols-2 gap-3 my-2">
            <div className="flex items-center gap-2 justify-end border rounded-md p-2">
              <span className="text-sm font-medium text-right">شحن سريع</span>
              <Truck className="h-5 w-5 text-rose-600" />
            </div>
            <div className="flex items-center gap-2 justify-end border rounded-md p-2">
              <span className="text-sm font-medium text-right">
                ضمان استرجاع 100%
              </span>
              <ShieldCheck className="h-5 w-5 text-rose-600" />
            </div>
            <div className="flex items-center gap-2 justify-end border rounded-md p-2">
              <span className="text-sm font-medium text-right">
                الدفع عند الاستلام
              </span>
              <ThumbsUp className="h-5 w-5 text-rose-600" />
            </div>
            <div className="flex items-center gap-2 justify-end border rounded-md p-2">
              <span className="text-sm font-medium text-right">
                توصيل خلال 48 ساعة
              </span>
              <Clock className="h-5 w-5 text-rose-600" />
            </div>
          </div>

          {/* Order form */}
          <div className="flex flex-col w-full gap-2 mt-2">
            <OrderProductForm />
          </div>

          {/* Customer count indicator - social proof */}
          <div className="bg-rose-50 p-3 rounded-md text-center my-2">
            <p className="text-rose-700 font-medium text-sm">
              👀 53 شخص يشاهدون هذا المنتج الآن | ✓ تم بيع 312 خلال 24 ساعة
              الماضية
            </p>
          </div>

          {/* Product information tabs */}
          <Tabs defaultValue="description" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">الوصف</TabsTrigger>
              <TabsTrigger value="benefits">الفوائد</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="text-right mt-4">
              <p className="text-gray-600">
                مجموعة مستحضرات التجميل الفاخرة مصنوعة من أجود المكونات
                الطبيعية. تتميز منتجاتنا بتركيبة خالية من المواد الكيميائية
                الضارة وغير مختبرة على الحيوانات. مثالية للبشرة الحساسة وتوفر
                نتائج مذهلة ودائمة.
              </p>

              <ul className="list-disc list-inside space-y-1 mr-4 mt-3">
                <li className="text-gray-600">
                  خالية من البارابين والعطور الاصطناعية
                </li>
                <li className="text-gray-600">مناسبة لجميع أنواع البشرة</li>
                <li className="text-gray-600">تدوم طوال اليوم</li>
                <li className="text-gray-600">مصنوعة من مكونات مستدامة</li>
              </ul>
            </TabsContent>

            <TabsContent value="benefits" className="text-right mt-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-semibold">تجديد البشرة</h4>
                  <p className="text-gray-600">
                    تعمل مكوناتنا الطبيعية على تجديد خلايا البشرة وإعادة نضارتها
                    خلال أسبوعين من الاستخدام المنتظم.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold">ترطيب عميق</h4>
                  <p className="text-gray-600">
                    توفر تركيبتنا الفريدة ترطيباً يدوم لمدة 24 ساعة، مما يجعل
                    البشرة ناعمة ومشرقة.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold">حماية من العوامل البيئية</h4>
                  <p className="text-gray-600">
                    تحتوي على مضادات أكسدة طبيعية تحمي البشرة من التلوث والأشعة
                    فوق البنفسجية.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                {testimonials.map((review, index) => (
                  <div key={index} className="border-b pb-3">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating
                                  ? "fill-amber-500 text-amber-500"
                                  : "text-gray-200"
                              )}
                            />
                          ))}
                      </div>
                      <p className="font-medium text-right">{review.name}</p>
                    </div>
                    <p className="text-gray-600 text-right mt-1">
                      {review.comment}
                    </p>
                  </div>
                ))}

                <div className="text-center">
                  <p className="text-rose-600 font-medium cursor-pointer">
                    عرض جميع التقييمات (126)
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Frequently asked questions - reduce buying friction */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-right mb-4">الأسئلة الشائعة</h3>
        <div className="space-y-3">
          <div className="border rounded-lg p-3">
            <p className="font-medium text-right">كم المدة المتوقعة للتوصيل؟</p>
            <p className="text-gray-600 text-right mt-1">
              يتم التوصيل عادة خلال 2-3 أيام عمل لجميع مناطق الجزائر.
            </p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="font-medium text-right">
              هل المنتج مناسب للبشرة الحساسة؟
            </p>
            <p className="text-gray-600 text-right mt-1">
              نعم، جميع منتجاتنا مختبرة ومناسبة لجميع أنواع البشرة بما فيها
              البشرة الحساسة.
            </p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="font-medium text-right">ما هي سياسة الإرجاع؟</p>
            <p className="text-gray-600 text-right mt-1">
              إذا لم تكن راضيًا عن المنتج، يمكنك إرجاعه خلال 14 يومًا واسترداد
              كامل المبلغ.
            </p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
