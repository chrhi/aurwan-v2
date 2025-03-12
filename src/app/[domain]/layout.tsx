import { PropsWithChildren } from "react";
import { Tajawal } from "next/font/google"; // Import Google Font

const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "700"] }); // Load Arabic Font

export default function StoreLayout({ children }: PropsWithChildren) {
  return (
    <div className={`w-full h-fit min-h-screen ${tajawal.className}`}>
      {children}
    </div>
  );
}
