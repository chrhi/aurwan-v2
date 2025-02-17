import { VerifyEmail } from "@/components/forms/auth/confirme.form";
import { SignInForm } from "@/components/forms/auth/sign-in.form";

interface pageProps {}

export default function page() {
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <VerifyEmail />
    </div>
  );
}
