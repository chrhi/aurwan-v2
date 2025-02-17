import { PropsWithChildren } from "react";

import Sidebar from "@/components/layout/sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="relative h-screen     flex flex-col md:flex-row bg-zinc-900 overflow-hidden">
        <div className="hidden md:block transition-all duration-300 h-full relative z-10">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-coloverflow-hidden ">
          <div className="flex-1 overflow-y-auto  bg-gray-50  shadow-sm relative z-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
