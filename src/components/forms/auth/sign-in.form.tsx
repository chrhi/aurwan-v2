/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PasswordInput } from "@/components/password-input";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { authSchemaLogin } from "@/lib/validators/auth";

import { LoadingSpinner } from "@/icons/loading-spinner";
import { z } from "zod";

type Inputs = z.infer<typeof authSchemaLogin>;

export function SignInForm() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      form.setValue("email", savedEmail);
      form.setValue("password", savedPassword);
      setRememberMe(true);
    }
  }, [form]);

  async function onSubmit(data: z.infer<typeof authSchemaLogin>) {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        if (rememberMe) {
          localStorage.setItem("email", data.email);
          localStorage.setItem("password", data.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }

        router.push(`/auth-callback`);
      } else {
        /* Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-[480px] pt-4 min-h-[501.39px] h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Welcome Back!</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            className="space-y-8"
          >
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  className="mr-2"
                  checked={rememberMe}
                  onCheckedChange={(checked: { valueOf: () => any }) =>
                    setRememberMe(checked.valueOf() ? true : false)
                  }
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Link href={"/sign-in/reset-password"}>
                <span className="text-[#3B82F6]">Forgot your password?</span>
              </Link>
            </div>
            <Button
              data-ripple-light="true"
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full text-white font-bold bg-primary rounded-xl flex items-center justify-center gap-x-4"
            >
              Sign In
              {isLoading && <LoadingSpinner />}
            </Button>
          </form>
        </Form>
        <div className="w-full my-4 h-[20px] flex justify-center">
          <span>
            Don&apos;t have an account?{" "}
            <Link href={"/sign-up"}>
              <span className="text-primary">Create one now</span>
            </Link>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
