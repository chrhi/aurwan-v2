"use client"

import type { FC } from "react"
import * as React from "react"
import { SignOutButton } from "@clerk/nextjs"
import { useMounted } from "@/hooks/use-mounted"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

interface Props {
  name: string
  lang: string
}

const LogoutButton: FC<Props> = ({ name, lang }) => {
  const mounted = useMounted()

  if (!mounted) {
    return (
      <DropdownMenuItem
        disabled
        className="w-full h-full flex justify-between items-center p-3 "
      >
        {lang === "en" ? (
          <>
            <span className="text-red-500">{name}</span>
            <LogOut className=" h-4 w-4 text-red-500" />
          </>
        ) : (
          <>
            <LogOut className=" h-4 w-4 text-red-500" />
            <span className="text-red-500">{name}</span>
          </>
        )}
      </DropdownMenuItem>
    )
  }

  return (
    <SignOutButton>
      <DropdownMenuItem className="w-full h-full flex justify-between items-center p-3 ">
        {lang === "en" ? (
          <>
            <span className="text-red-500">{name}</span>
            <LogOut className=" h-4 w-4 text-red-500" />
          </>
        ) : (
          <>
            <LogOut className=" h-4 w-4 text-red-500" />
            <span className="text-red-500">{name}</span>
          </>
        )}
      </DropdownMenuItem>
    </SignOutButton>
  )
}

export default LogoutButton
