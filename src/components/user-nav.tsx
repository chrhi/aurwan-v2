"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LogOut, Settings, User, CreditCard, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { Store as Tstore, User as Tuser } from "@/types";

export default function UserNav({
  user,
  currentStore,
}: {
  stores: Tstore[];
  user: Tuser;
  currentStore?: Tstore;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/signin");
  };

  return (
    <div className="flex items-center gap-4">
      {/* Current Store Display */}
      {currentStore && (
        <div className="flex items-center gap-2 px-4 py-2 border rounded-lg w-[250px]">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: currentStore.color }}
          />
          <span className="truncate font-medium">{currentStore.name}</span>
        </div>
      )}

      {/* User Profile */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} alt={user?.name || ""} />
              <AvatarFallback>
                {user?.name?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="end" forceMount>
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={() => router.push("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={() => router.push("/billing")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={() => router.push("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={() => router.push("/stores/new")}
            >
              <Store className="mr-2 h-4 w-4" />
              Create new store
            </Button>
          </div>
          <Separator className="my-2" />
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
