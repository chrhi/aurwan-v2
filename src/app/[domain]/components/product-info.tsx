"use client";

import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { OrderProductForm } from "./order-form";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, ShieldCheck, Clock, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { initFacebookPixel, fbEvents } from "@/lib/pixel";

export default function ProductInfo() {
  const [selectedImage, setSelectedImage] = useState("/image-03.jpg");
  const [isZoomed, setIsZoomed] = useState(false);

  const productImages = [
    "/image-01.jpg",
    "/image-02.jpg",
    "/image-03.jpg",
    "/image-04.jpg",
  ];

  const productInfo = {
    content_name: "منظم مستحضرات التجميل الأكريليكي الشفاف",
    content_ids: ["cm86f53ti0001wmkkernjxr7s"],
    content_type: "product",
    value: 3500,
    currency: "DZD",
  };

  useEffect(() => {
    // Initialize Facebook Pixel
    initFacebookPixel();

    // Track ViewContent event when the product page is loaded
    fbEvents.viewContent(productInfo);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
  };

  // Calculate discount percentage
  const originalPrice = 5500;
  const currentPrice = 3500;
  const discountPercentage = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100
  );

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
                alt="منظم مستحضرات التجميل الأكريليكي"
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
            {/* New discount badge */}
            <Badge className="absolute bottom-2 right-2 bg-green-600">
              خصم {discountPercentage}%
            </Badge>
            {/* Free shipping badge */}
            <Badge className="absolute bottom-2 left-2 bg-blue-600">
              شحن مجاني
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
                  alt={`صورة مصغرة ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-y-6 md:pt-4">
          <div className="text-right">
            <h1 className="font-bold text-3xl md:text-4xl">
              منظم مستحضرات التجميل
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 justify-end">
              <span className="text-2xl font-bold text-right text-rose-600">
                3500 DZ
              </span>
              <span className="text-gray-500 text-lg line-through">
                5500 DZ
              </span>
              <Badge className="bg-green-600">
                توفير {originalPrice - currentPrice} DZ
              </Badge>
            </div>
            <div className="flex items-center justify-end">
              <span className="font-medium text-blue-600 flex items-center gap-1">
                <Truck className="h-4 w-4" /> الشحن مجاني على حسابنا
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 my-2">
            <div className="flex items-center gap-2 justify-end border rounded-md p-2 bg-blue-50">
              <span className="text-sm font-medium text-right text-blue-700">
                شحن مجاني
              </span>
              <Truck className="h-5 w-5 text-blue-600" />
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

          {/* Product information tabs */}
          <Tabs defaultValue="description" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">الوصف</TabsTrigger>
              <TabsTrigger value="benefits">المميزات</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="text-right mt-4">
              <p className="text-gray-600">
                يمكن لحامل العرض الأكريليكي الشفاف هذا عرض وتخزين جميع مستحضرات
                التجميل والمجوهرات بسهولة دون الحاجة إلى البحث في كل مكان. إنه
                منتج مثالي ليس فقط للحمام أو الغرور، بل مثالي للاستخدام في
                المنزل أو في مراكز التجميل أو المنتجعات الصحية.
              </p>

              <ul className="list-disc list-inside space-y-1 mr-4 mt-3">
                <li className="text-gray-600">
                  مصنوع من مادة ABS عالية الجودة ومتينة
                </li>
                <li className="text-gray-600">شفاف لرؤية محتوياته بسهولة</li>
                <li className="text-gray-600">
                  تصميم أنيق يناسب جميع الديكورات
                </li>
                <li className="text-gray-600">سهل التنظيف والصيانة</li>
              </ul>
            </TabsContent>

            <TabsContent value="benefits" className="text-right mt-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-semibold">ثلاثة أدراج واسعة</h4>
                  <p className="text-gray-600">
                    مع 3 أدراج، يمكنك وضع الكثير من مستحضرات التجميل مثل
                    المستحضر، واللوشن، وأحمر الشفاه، وظلال العيون، والفرشاة،
                    والقناع. تقليل مساحة المقعد.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold">غطاء مقاوم للغبار والماء</h4>
                  <p className="text-gray-600">
                    احمي مستحضرات التجميل الخاصة بك باستخدام غطاء شفاف مقاوم
                    للغبار والماء.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold">سهولة الوصول والتنقل</h4>
                  <p className="text-gray-600">
                    افتح وأغلق الغطاء في كلا الاتجاهين لتسهيل الوصول. تصميم
                    المقبض المنحني الإبداعي سهل الاستخدام ويمكن حمله في اليد
                    لسهولة الحركة.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Special offer banner with free shipping */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-3">
          <Truck className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-bold text-blue-800">
            عرض خاص: شحن مجاني على جميع الطلبات!
          </h3>
        </div>
        <p className="text-blue-700 text-center mt-2">
          نتحمل تكلفة الشحن بالكامل. السعر النهائي 3500 دينار فقط لا غير.
        </p>
      </div>

      {/* Frequently asked questions - reduce buying friction */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-right mb-4">الأسئلة الشائعة</h3>
        <div className="space-y-3">
          <div className="border rounded-lg p-3">
            <p className="font-medium text-right">ما هي أبعاد المنظم؟</p>
            <p className="text-gray-600 text-right mt-1">
              المنظم مناسب لمعظم المساحات، بأبعاد تسمح بتخزين مجموعة متنوعة من
              مستحضرات التجميل.
            </p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="font-medium text-right">
              هل يمكن استخدامه للمجوهرات أيضاً؟
            </p>
            <p className="text-gray-600 text-right mt-1">
              نعم، المنظم مثالي لتخزين وعرض المجوهرات والإكسسوارات الصغيرة
              بالإضافة إلى مستحضرات التجميل.
            </p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="font-medium text-right">
              هل تكلفة الشحن مشمولة في السعر؟
            </p>
            <p className="text-gray-600 text-right mt-1">
              نعم، نحن نتحمل تكلفة الشحن بالكامل. المبلغ الذي ستدفعه هو 3500
              دينار فقط بدون أي تكاليف إضافية.
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
