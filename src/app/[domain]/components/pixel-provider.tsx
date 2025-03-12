"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { initFacebookPixel, pageView } from "@/lib/pixel";

export default function PixelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Facebook Pixel
    initFacebookPixel();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      pageView();
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}
