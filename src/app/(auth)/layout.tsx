import { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ClerkProvider>{children}</ClerkProvider>
    </>
  );
}
