"use client"

import * as React from "react"
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input, type InputProps } from "@/components/ui/input"

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <EyeNoneIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <EyeOpenIcon className="h-5 w-5" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
