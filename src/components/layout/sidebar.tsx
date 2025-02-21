"use client";

import { cn } from "@/lib/utils";
import {
  Workflow,
  Home,
  ShoppingBag,
  LayoutTemplate,
  Store,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface SidebarItem {
  href: string;
  icon: React.ElementType;
  text: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { href: "/", icon: Home, text: "Home" },
  { href: "/products", icon: ShoppingBag, text: "Products" },
  { href: "/dashboard/orders", icon: Workflow, text: "Orders" },
  { href: "/dashboard/funnels", icon: LayoutTemplate, text: "Funnels" },
  { href: "/dashboard/stores", icon: Store, text: "Stores" },
];

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const SidebarContent = ({ onItemClick = () => {} }) => (
    <div className="flex flex-col h-full bg-zinc-100   ">
      <div className="flex items-center justify-start  border-b pl-4  h-14 ">
        <p className="text-xl  font-bold text-black dark:text-white">
          CraftedNext
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-2 py-4">
        <ul className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    "dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                  )}
                  onClick={onItemClick}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings Button at the bottom */}
      <div className="mt-auto pt-4  border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all w-full",
            "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            "dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
            "focus:outline-none focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
          )}
          onClick={onItemClick}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );

  // Desktop view - persistent sidebar
  if (!isMobile) {
    return (
      <div className="h-full w-56  hidden md:block">
        <SidebarContent />
      </div>
    );
  }

  // Mobile view - Sheet component
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-[999] md:hidden"
        aria-label="Open menu"
      >
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SheetClose className="absolute right-4  top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
            <SidebarContent
              onItemClick={() =>
                document
                  .querySelector<HTMLButtonElement>(
                    '[data-state="open"] button.rounded-sm'
                  )
                  ?.click()
              }
            />
          </SheetContent>
        </Sheet>
      </Button>
    </>
  );
};

export default Sidebar;
