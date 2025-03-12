"use client";

import StoreHeader from "../components/store-header";
import { Check, CheckCircle, Phone, Clock } from "lucide-react";
import { fbEvents } from "@/lib/pixel";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Track CompleteRegistration event when thank you page loads
    fbEvents.completeRegistration({
      content_name: "Acrylic Makeup Organizer Order",
      value: 3900,
      currency: "DZD",
    });
  }, []);

  return (
    <>
      <div className="" dir="rtl">
        <StoreHeader />

        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center py-8 px-4">
          <div className="max-w-3xl w-full bg-white  overflow-hidden">
            {/* Success icon */}
            <div className="flex flex-col items-center justify-center pt-10 pb-6">
              <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                تم استلام طلبك بنجاح!
              </h1>
              <p className="text-lg text-gray-500 mb-6 text-center">
                شكراً لثقتكم بنا. سنتواصل معكم في أقرب وقت لتأكيد الطلب.
              </p>
            </div>

            {/* Order process steps */}
            <div className="bg-gray-50 p-6 rounded-xl mx-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">الخطوات التالية:</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">تم استلام طلبك</p>
                    <p className="text-sm text-gray-500">
                      تم تسجيل طلبك في نظامنا بنجاح
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">التأكيد عبر الهاتف</p>
                    <p className="text-sm text-gray-500">
                      سيتصل بك أحد ممثلي خدمة العملاء لتأكيد تفاصيل طلبك
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">تجهيز الطلب</p>
                    <p className="text-sm text-gray-500">
                      سيتم تجهيز طلبك وإرساله في أقرب وقت ممكن
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">التوصيل</p>
                    <p className="text-sm text-gray-500">
                      سيصلك طلبك خلال 2-1 أيام عمل
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact info and support */}
            <div className="px-6 pb-8">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h4 className="font-medium text-gray-800">
                    هل لديك أي استفسار؟
                  </h4>
                  <p className="text-gray-500">يمكنك التواصل معنا عبر</p>
                  <p className="font-semibold mt-1 text-blue-600">
                    mahdi.chahri55@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
