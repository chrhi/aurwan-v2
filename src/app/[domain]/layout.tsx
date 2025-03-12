import { PropsWithChildren } from "react";
import { Tajawal } from "next/font/google";
import { Metadata } from "next";

const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "منظم مستحضرات التجميل الأكريليكي الشفاف | متجر أونلاين",
    description:
      "منظم مستحضرات التجميل الأكريليكي الشفاف مع ثلاثة أدراج واسعة. تسوق الآن واحصل على توصيل سريع خلال 48 ساعة والدفع عند الاستلام متاح",
    keywords:
      "منظم مستحضرات التجميل, منظم أكريليك, منظم شفاف, مستحضرات تجميل, تخزين مكياج",
  };
}

export default function StoreLayout({ children }: PropsWithChildren) {
  return (
    <div className={`w-full h-fit min-h-screen ${tajawal.className}`}>
      {children}
    </div>
  );
}
