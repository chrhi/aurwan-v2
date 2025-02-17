"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSignUp } from "@clerk/nextjs"
import React from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { PasswordInput } from "@/components/password-input"
import { authSchema } from "@/lib/validators/auth"
import { useRouter } from "next/navigation"

import { LoadingSpinner } from "@/icons/loading-spinner"
import { z } from "zod"

type Inputs = z.infer<typeof authSchema>

export function SignUpForm() {
  const { isLoaded, signUp } = useSignUp()
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof authSchema>) {
    if (!isLoaded) return

    try {
      setIsLoading(true)
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      })

      // Send email verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      })

      router.push("/sign-up/verify-email")
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[480px] pt-4 min-h-[501.39px] h-fit">
      <CardHeader>
        <CardTitle>Create New Account</CardTitle>
        <CardDescription>
          Create a new account and enjoy a 14-day free trial with no credit card
          or hidden fees.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full h-[20px] flex justify-between items-center">
              <FormDescription>
                By clicking "Create Free Account" you agree to our Terms and
                Conditions.
              </FormDescription>
            </div>
            <Button
              data-ripple-light="true"
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full text-white font-bold rounded-xl bg-primary flex items-center justify-center gap-x-4"
            >
              Create Free Account
              {isLoading && <LoadingSpinner />}
            </Button>
          </form>
        </Form>
        <div className="w-full my-4 h-[20px] flex justify-center">
          <span>
            Already have an account?{" "}
            <Link href={"/sign-in"}>
              <span className="text-primary">Sign in.</span>
            </Link>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
