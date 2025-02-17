import { Search } from "lucide-react"
import MaxWidthWrapper from "../max-width-wrapper"
import UserNav from "../user-nav"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title: string
  className?: string
}

export default function Header({ title, className }: HeaderProps) {
  return (
    <header
      className={cn("sticky top-0 z-50 w-full border-b bg-white", className)}
    >
      <MaxWidthWrapper className="h-16 ">
        <div className="flex h-full items-center justify-between gap-4">
          {/* Logo/Title - Hidden on mobile */}
          <h1 className="hidden font-bold text-xl md:block">{title}</h1>

          {/* Mobile Title - Shown only on mobile */}
          <h1 className="font-bold text-lg md:hidden">{title}</h1>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="w-full pl-8 h-9" />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Add any additional nav items here */}
            <UserNav />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  )
}
