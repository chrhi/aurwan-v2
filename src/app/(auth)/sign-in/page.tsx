import { SignInForm } from "@/components/forms/auth/sign-in.form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        {/* Logo/Brand Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 rounded-full bg-blue-600 p-2">
            {/* You can replace with your actual logo */}
            <svg
              className="h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Card containing the form */}

        <SignInForm />

        {/* Footer links */}
        <div className="mt-6 flex items-center justify-center">
          <div className="text-center text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>{" "}
            &bull;{" "}
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>{" "}
            &bull;{" "}
            <Link href="/help" className="hover:text-gray-700">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
