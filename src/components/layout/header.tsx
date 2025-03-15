import { Search } from "lucide-react";
import UserNav from "../user-nav";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Store as Tstore, User as Tuser } from "@/types";

interface HeaderProps {
  title: string;
  className?: string;
  stores: Tstore[];
  user: Tuser;
}

export default function Header({
  title,
  className,
  stores,
  user,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky px-4 h-14 top-0 z-50 w-full border-b bg-white",
        className
      )}
    >
      <div className="flex h-full items-center justify-between gap-4">
        <h1 className="hidden  text-xl md:block">{title}</h1>

        <h1 className="font-bold text-lg md:hidden">{title}</h1>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="w-full pl-8 h-9" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UserNav stores={stores} user={user} />
        </div>
      </div>
    </header>
  );
}
