import { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Aurwan",
  description: "Sign in or sign up to access your account",
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <main className="flex-1">{children}</main>
      </div>
    </ClerkProvider>
  );
}
