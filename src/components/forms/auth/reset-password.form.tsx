"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { checkEmailSchema } from "@/lib/validators/auth";
import { LoadingSpinner } from "@/icons/loading-spinner";

type Inputs = z.infer<typeof checkEmailSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: Inputs) {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const firstFactor = await signIn.create({
          strategy: "reset_password_email_code",
          identifier: data?.email,
        });

        if (firstFactor?.status === "needs_first_factor") {
          router.push("/sign-in/reset-password/step2");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  return (
    <Card className="w-[480px] pt-4 min-h-[250px] h-fit ">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            <FormDescription>
              Make sure your email is correct, as a link to complete the
              password recovery process will be sent through it.
            </FormDescription>
            <Button
              disabled={isPending}
              data-ripple-light="true"
              type="submit"
              size="lg"
              className="w-full text-white font-bold bg-primary flex items-center justify-center gap-x-4 rounded-xl"
            >
              Send
              {isPending && <LoadingSpinner />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
